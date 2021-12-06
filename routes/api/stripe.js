const express = require('express');
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const OrderServices = require("../../services/orders");



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