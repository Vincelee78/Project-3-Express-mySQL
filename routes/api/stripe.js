const express = require('express');
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const cartServices = require("../../services/cart");
const orderDataBaseLayer = require("../../dal/api/orders");
const {
  checkIfAuthenticatedJWT
} = require('../../middleware');
const OrderServices = require("../../services/orders");



/********************** Stripe Webhooks  **********************/
//process payment
router.post('/process_payment', express.raw({
    type: 'application/json'
  }), async function (req, res) {
    const payload = req.body;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    let signHeader = req.headers["stripe-signature"];
    // console.log(signHeader)
    let event;
    try {
      event = Stripe.webhooks.constructEvent(payload, signHeader, endpointSecret);
      if (event.type === "checkout.session.completed") {
        const data = event.data.object.metadata;
        let stripeSession = event.data.object;
        console.log(data)
        // console.log(stripeSession, 'stripesession data');
        let metadata = stripeSession.metadata.orders;
        // console.log(metadata, 'from checkout routes');
  
        //TODO: update order status to paid
        console.log(data)
  
        await OrderServices.createStatus(data.orderId);
        
        console.log('it runs')
  
        // console.log(event)
      }
  
      res.status(200).send({
        received: true
      });
      
    } catch (err) {
      console.log(err);
      return res.sendStatus(300);
    }
  });
  
  module.exports = router;