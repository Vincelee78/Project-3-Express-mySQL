const express = require('express');
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const cartServices = require("../../services/cart");
const orderDataBaseLayer = require("../../dal/api/orders");
const { checkIfAuthenticatedJWT } = require('../../middleware');

router.get('/', async (req, res) => {
  try {
    // Get cart
    let cartItems = await cartServices.getShoppingCart(req.user.id);
    await cart.updateCartPrice();
    //TODO: check if product is available before allowing checkout

    // let cartItems = await cart.getCart();
    // console.log(cartItems.toJSON());

    // create line items
    let allLineItems = [];
    let metadata = [];

    for (let item of cartItems) {
        const lineItem = {
            'name': item.related('wallBed').get('name'),
            // amount is in cents
            'amount': item.related('wallBed').get('cost'),
            'quantity': item.get('quantity'),
            'currency': 'SGD'
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
            'amount':item.related('wallBed').get('cost')/100,
            'userEmail': req.user.email
        })

    }

    // create stripe payment object
    let metadataJSON = JSON.stringify(metadata);

    let payment = {
        'payment_method_types': ['card'],
        'line_items': allLineItems,
        'success_url': process.env.STRIPE_SUCCESS_URL,
        'cancel_url': process.env.STRIPE_CANCEL_URL,
        'metadata': {
            'orders': metadataJSON
        }
    }

    res.status(200).json({
      paymentInvoice: payment,
    });
  } catch (err) {
    res.send({
        error: "We have encountered an internal server error",
      });
    }
});

//create order and update cart after payment
router.post('/createOrder', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    
    // const { addressId } = req.body;
    // console.log(req.user)
    const order = await orderDataBaseLayer.checkOut(req.user.id);
    res.status(200).json(order);
  } catch (err) {
    console.log(err)
    res.send({
        error: "We have encountered an internal server error",
      });
    }
});

/********************** Stripe Webhooks  **********************/
//process payment
router.post('/process_payment',express.raw({ type: 'application/json' }), function (req, res) {
  const payload = req.body;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  let signHeader = req.headers["stripe-signature"];
  let event;
  try {
    event = Stripe.webhooks.constructEvent(payload, signHeader, endpointSecret);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionId = session.id;
    console.log(sessionId), console.log(session);
    //TODO: update order status to paid
  }
  res.status(200).send({ received: true });
});

module.exports = router;