const express = require('express');
const router = express.Router();


const cartServices = require('../services/cart')
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = router;

router.get('/', async (req, res) => {
    // 1. create line items from the user's shopping cart
    let cartItems = await cartServices.getShoppingCart(req.session.user.id);
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
            'quantity': item.get('quantity')
        })

    }

    // 2. create a stripe payment session (session id that will be sent to the user)

    // .. convert the metadata array to a JSON string (requirement of Stripe)
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

    // step 3: register the session
    let stripeSession = await Stripe.checkout.sessions.create(payment)
    res.render('checkout/checkout', {
        'sessionId': stripeSession.id, // 4. Get the ID of the session
        'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
    })

    


})

router.get('/success', function(req,res){
    res.render("checkout/success");
    // res.redirect('/allproducts')
})

 router.get('/cancel', function(req,res){
    res.send("Your order has failed or has been cancelled");
    res.redirect('/allproducts')
})

// NOTE! This is called by Stripe not internally by us.
router.post('/process_payment', express.raw({ type: 'application/json' }), function (req, res) {
    // payload is what Stripe is sending us
    let payload = req.body;

    let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    // extract signature header
    let sigHeader = req.headers['stripe-signature'];

    // verify that the signature is actually from stripe
    let event;
    try {
        event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret);
        if (event.type == "checkout.session.completed") {
            let stripeSession = event.data.object;
            console.log(stripeSession);
            let metadata = JSON.parse(stripeSession.metadata.orders);
            console.log(metadata);
            

            res.send({
                'received': 'Payment has been received through stripe'
            })
        }
    } catch (e) {
        // handle errors
        res.send({
            'error': e.message
        })
    }

})