const express = require('express');
const router = express.Router();
const {checkIfAuthenticated } = require('../middleware');
const cartServices = require('../services/cart')
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {OrderItem } = require("../models");
const dataLayer = require('../dal/products')
const {bootstrapField, createSearchOrderForm} = require('../forms');


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

router.get('/createOrder',checkIfAuthenticated, async (req, res) => {

    const allBedName = await dataLayer.getAllBedName();
    allBedName.unshift([0, 'All Bed Names']);
    // 1. get all the bed sizes
    const allBedSize = await dataLayer.getAllBedSize();
    allBedSize.unshift([0, 'All Bed Sizes']);

    const allBedOrientation = await dataLayer.getAllBedOrientation();
    allBedOrientation.unshift([0, 'All Bed Orientations']);

    const allMattressType = await dataLayer.getAllMattressType();
    allMattressType.unshift([0, 'All Mattress Types']);

    const allFrameColour = await dataLayer.getAllFrameColours();
    allFrameColour.unshift([0, 'All Frame Colours']);

    
    // 2. Get all the wood colours
    const allWoodColour = await dataLayer.getAllWoodColours();
    allWoodColour.unshift([0, 'All Wood Colours']);


    // 3. Create search form 
    let searchForm = createSearchOrderForm(allBedName, allBedSize, allBedOrientation, allMattressType, allFrameColour, allWoodColour);

    searchForm.handle(req, {
        'empty': async (form) => {
            // the model represents the entire table
            let orderItems = await OrderItem.collection().fetch({
                'withRelated': ['wallBed', 'order', 'woodColour', 'bedSize','bedOrientation','frameColour', 'mattressType']
            });

            let orders = orderItems.toJSON().map((wallBed) => {
                return {
                    ...wallBed,
                    cost: wallBed.cost / 100
                };
            });

            res.render('orders/create', {
                'orders': orders,
                'searchForm': form.toHTML(bootstrapField),
                'allBedName': allBedName,
                'allBedSize': allBedSize,
                'allBedOrientation': allBedOrientation,
                'allMattressType': allMattressType,
                'allFrameColour': allFrameColour,
                'allWoodColours': allWoodColour
            })
        },
        'error': async (form) => {},
        'success': async (form) => {
            let name = parseInt(form.data.wall_bed_id);
            let bedSize = parseInt(form.data.bed_size_id);
            let bedOrientation = parseInt(form.data.bed_orientation_id);
            let mattressType = parseInt(form.data.mattress_type_id);
            let frameColour = parseInt(form.data.frame_colour_id);
            let woodColour = parseInt(form.data.wood_colour_id);

            // create a query that is the eqv. of "SELECT * FROM products WHERE 1"
            // this query is deferred because we never call fetch on it.
            // we have to execute it by calling fetch onthe query
            let q = OrderItem.collection();

            // if name is not undefined, not null and not empty string
            if (name) {
                // add a where clause to its back
                q.where('wall_bed_id', '=', name);
            }

            // check if cateogry is not 0, not undefined, not null, not empty string
            if (bedSize) {
                q.where('bed_size_id', '=', bedSize);
            }
            if (bedOrientation) {
                q.where('bed_orientation_id', '=', bedOrientation);
            }
            if (mattressType) {
                q.where('mattress_type_id', '=', mattressType);
            }
            if (frameColour) {
                q.where('frame_colour_id', '=', frameColour);
            }

            // if tags is not empty
            if (woodColour) {
                q.where('wood_colour_id', '=', woodColour);
            }

            // execute the query
            let orders = await q.fetch({
                'withRelated': ['wallBed', 'order', 'woodColour', 'bedSize','bedOrientation','frameColour', 'mattressType']
            });

            res.render('orders/create', {
                'orders': orders.toJSON(), // convert the results to JSON
                'searchForm': form.toHTML(bootstrapField),
                'allBedName': allBedName,
                'allWoodColours': allWoodColour,
                'allBedSize': allBedSize,
                'allBedOrientation': allBedOrientation,
                'allMattressType': allMattressType,
                'allFrameColour': allFrameColour,

            })

        }
    })
})




// router.get('/createOrder', checkIfAuthenticated, async (req, res) => {
//             let orders = await OrderItem.collection().fetch({
//                 'withRelated': ['wallBed', 'order', 'woodColour', 'bedSize','bedOrientation','frameColour', 'mattressType']
//             });
            
//             res.render('orders/create', {
//                 orders: orders.toJSON()
//             })
//         })
    


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
            // console.log(stripeSession, 'stripesession data');
            let metadata = JSON.parse(stripeSession.metadata.orders);
            // console.log(metadata, 'from checkout routes');


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