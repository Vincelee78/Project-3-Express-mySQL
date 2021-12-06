const express = require('express');
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const cartServices = require("../../services/cart");
const orderDataBaseLayer = require("../../dal/api/orders");
const OrderServices = require("../../services/orders");


router.get('/', async (req, res) => {
  try {
    // Get cart
    let cartItems = await cartServices.getShoppingCart(req.user.id);

    // create line items
    let allLineItems = [];
    let metadata = [];

    for (let item of cartItems) {
      const lineItem = {
        'name': item.related('wallBed').get('name'),
        // amount is in cents
        'amount': item.related('wallBed').get('cost'),
        'quantity': item.get('quantity'),
        'currency': 'SGD',

      }
      if (item.related('wallBed').get('image')) {
        lineItem['images'] = [item.related('wallBed').get('image_url')]
      }
      allLineItems.push(lineItem);

      // add to the metadata an object that remembers for a given product id
      // how many was ordered
      metadata.push({
        'product_id': item.related('wallBed').get('id'),
        'name': item.related('wallBed').get('name'),
        'quantity': item.get('quantity'),
        'amount': item.related('wallBed').get('cost') / 100,
        'userEmail': req.user.email,
        'userId': req.user.id
      })

    }

    // create stripe payment object
    let metadataJSON = JSON.stringify(metadata);

    //create order and update and remove cart user items after payment
    const order = await orderDataBaseLayer.checkOut(req.user.id);

    let payment = {
      'payment_method_types': ['card'],
      'line_items': allLineItems,
      'success_url': process.env.STRIPE_SUCCESS_URL,
      'cancel_url': process.env.STRIPE_CANCEL_URL,
      'metadata': {
        'orders': metadataJSON,
        'orderId': order.get('id')
      }
    }



    // register the session
    let stripeSession = await Stripe.checkout.sessions.create(payment)


    res.status(200).json({
      paymentReference: payment,
      orders: order,
      sessionId: stripeSession.id, // 4. Get the ID of the session
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });




  } catch (err) {

    res.send({
      error: "We have encountered an internal server error",
    });
  }
});



/********************** Stripe Webhooks  **********************/
//process payment
router.post('/process_payment', express.raw({
  type: 'application/json'
}), async function (req, res) {
  const payload = req.body;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  let signHeader = req.headers["stripe-signature"];

  let event;
  try {
    event = Stripe.webhooks.constructEvent(payload, signHeader, endpointSecret);
    if (event.type === "checkout.session.completed") {
      const data = event.data.object.metadata;
      let stripeSession = event.data.object;

      let metadata = stripeSession.metadata.orders;

      //  update order status to paid 
      await OrderServices.createStatus(data.orderId);


    }

    res.status(200).send({
      received: true
    });

  } catch (err) {

    return res.sendStatus(300);
  }
});

module.exports = router;