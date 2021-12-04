const express = require('express');
const router = express.Router();
const {
    checkIfAuthenticated
} = require('../middleware');
const cartServices = require('../services/cart')
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderDataBaseLayer = require("../dal/api/orders");
const {
    Order,
    OrderItem
} = require("../models");

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
            'name': item.related('wallBed').get('name'),
            'quantity': item.get('quantity'),
            // 'Size':item.related('wallBed').related('bedSize').get('name'),
            // 'Orientn':item.related('wallBed').related('bedOrientation').get('name'),
            // 'frameC':item.related('wallBed').related('frameColour').get('name'),
            // 'mattress': item.related('wallBed').related('mattressType').get('name'),
            // 'woodC': item.related('wallBed').related('woodColour').pluck('name'),
            'amount': item.related('wallBed').get('cost') / 100,
            'userName': req.session.user.username,
            'email': req.session.user.email,
            // 'billingAddress':req.session.user.billing_address,
            // 'shippingAddress':req.session.user.shipping_address,
            'phone': req.session.user.phone
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

//create order and update cart after payment
router.get('/createOrder', checkIfAuthenticated, async (req, res) => {
            let orders = await OrderItem.collection().fetch({
                'withRelated': ['wallBed', 'order', 'woodColour', 'bedSize','bedOrientation','frameColour', 'mattressType']
            });
            
            res.render('orders/create', {
                orders: orders.toJSON()
            })
        })
    


router.get('/success', function (req, res) {
    res.render("checkout/success");
    // res.redirect('/allproducts')
})

router.get('/cancel', function (req, res) {
    res.send("Your order has failed or has been cancelled");
    res.redirect('/allproducts')
})

// NOTE! This is called by Stripe not internally by us.
router.post('/process_payment', express.raw({
    type: 'application/json'
}), function (req, res) {
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
            console.log(stripeSession, 'stripesession data');
            let metadata = JSON.parse(stripeSession.metadata.orders);
            console.log(metadata, 'from checkout routes');


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