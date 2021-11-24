const express = require('express');
const router = express.Router();
const { checkIfAuthenticated } = require('../middleware');


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
            'name': item.related('wallBed').get('name'),
            'quantity': item.get('quantity'),
            'amount':item.related('wallBed').get('cost')/100,
            'userEmail': req.session.user.email
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


router.post('/orders', checkIfAuthenticated, async (req, res) => {

    
    const allBedSize = await dataLayer.getAllBedSize();

    const allBedOrientation = await dataLayer.getAllBedOrientation();

    const allMattressType = await dataLayer.getAllMattressType();

    const allFrameColour = await dataLayer.getAllFrameColours();

    const allWoodColours = await dataLayer.getAllWoodColours();

    const productForm = createProductForm(allBedSize, allMattressType, allBedOrientation, allFrameColour, allWoodColours);
    productForm.handle(req, {
        success: async (form) => {
            let { woodColour, ...productData } = form.data;

            const orders = new ProductTable(productData);


            wallBed.set('name', form.data.name);
            wallBed.set('weight', form.data.weight);
            wallBed.set('description', form.data.description);
            wallBed.set('stock', form.data.stock);
            wallBed.set('date', form.data.date);
            wallBed.set('bed_size_id', form.data.bed_size_id);
            wallBed.set('mattress_type_id', form.data.mattress_type_id);
            wallBed.set('bed_orientation_id', form.data.bed_orientation_id);
            wallBed.set('frame_colour_id', form.data.frame_colour_id);
            await wallBed.save();

            if (woodColour) {
                await wallBed.woodColour().attach(woodColour.split(","));
            }
            req.flash('success_messages', `New Wall Bed ${wallBed.get("name")} has been created`)
            res.redirect('/allproducts');

        },
        'error': async (form) => {
            res.render('products/create', {
                form: form.toHTML(bootstrapField),
                cloudinaryName: process.env.CLOUDINARY_NAME,
                cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
                cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })
})