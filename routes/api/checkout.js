// const express = require('express');
// const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const router = express.Router();
// const cartServices = require("../../services/cart");
// const orderDataBaseLayer = require("../../dal/api/orders");
// const OrderServices = require("../../services/orders");

// // POST request to initiate a checkout session
// router.post('/create-session', async (req, res) => {
//     try {
//         let cartItems = await cartServices.getShoppingCart(req.user.id);
//         let allLineItems = [];
//         let metadata = [];

//         for (let item of cartItems) {
//             const lineItem = {
//                 name: item.related('wallBed').get('name'),
//                 amount: item.related('wallBed').get('cost'), // Amount should be in the smallest currency unit
//                 quantity: item.get('quantity'),
//                 currency: 'SGD',
//                 images: [item.related('wallBed').get('image_url')],
//             };
//             allLineItems.push(lineItem);
//             metadata.push({
//                 product_id: item.related('wallBed').get('id'),
//                 name: item.related('wallBed').get('name'),
//                 quantity: item.get('quantity'),
//                 amount: item.related('wallBed').get('cost') / 100,
//                 userEmail: req.user.email,
//                 userId: req.user.id
//             });
//         }

//         let metadataJSON = JSON.stringify(metadata);
//         const order = await orderDataBaseLayer.checkOut(req.user.id);

//         let session = await Stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: allLineItems,
//             success_url: process.env.STRIPE_SUCCESS_URL,
//             cancel_url: process.env.STRIPE_CANCEL_URL,
//             metadata: {
//                 orders: metadataJSON,
//                 orderId: order.id
//             }
//         });

//         res.status(200).json({
//             sessionId: session.id,
//             publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
//         });

//     } catch (err) {
//         console.error("Stripe Checkout Error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });



// /********************** Stripe Webhooks  **********************/
// //process payment
// router.post('/process_payment', express.raw({
//   type: 'application/json'
// }), async function (req, res) {
//   const payload = req.body;
//   const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
//   let signHeader = req.headers["stripe-signature"];

//   let event;
//   try {
//     event = Stripe.webhooks.constructEvent(payload, signHeader, endpointSecret);
//     if (event.type === "checkout.session.completed") {
//       const data = event.data.object.metadata;
//       let stripeSession = event.data.object;

//       let metadata = stripeSession.metadata.orders;

//       //  update order status to paid 
//       await OrderServices.createStatus(data.orderId);


//     }

//     res.status(200).send({
//       received: true
//     });

//   } catch (err) {

//     return res.sendStatus(300);
//   }
// });

// module.exports = router;

const express = require('express');
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const cartServices = require("../../services/cart");
const orderDataBaseLayer = require("../../dal/api/orders");
const OrderServices = require("../../services/orders");

router.post('/create-session', async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        let cartItems = await cartServices.getShoppingCart(req.user.id);

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        let allLineItems = [];
        let metadata = [];

        for (let item of cartItems) {
            const lineItem = {
                name: item.related('wallBed').get('name'),
                amount: item.related('wallBed').get('cost') * 100, // Amount should be in cents
                quantity: item.get('quantity'),
                currency: 'SGD',
                images: [item.related('wallBed').get('image_url')],
            };
            allLineItems.push(lineItem);
            metadata.push({
                product_id: item.related('wallBed').get('id'),
                name: item.related('wallBed').get('name'),
                quantity: item.get('quantity'),
                amount: item.related('wallBed').get('cost')/100,
                userEmail: req.user.email,
                userId: req.user.id
            });
        }

        let metadataJSON = JSON.stringify(metadata);
        const order = await orderDataBaseLayer.checkOut(req.user.id);

        let session = await Stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: allLineItems,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
            metadata: {
                orders: metadataJSON,
                orderId: order.id
            }
        });

        res.status(200).json({
            sessionId: session.id,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
        });

    } catch (err) {
        console.error("Stripe Checkout Error:", err.message);
        res.status(500).json({ error: "Failed to create checkout session. Please try again later." });
    }
});

router.post('/process_payment', express.raw({ type: 'application/json' }), async function (req, res) {
    const payload = req.body;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    let signHeader = req.headers["stripe-signature"];

    let event;
    try {
        event = Stripe.webhooks.constructEvent(payload, signHeader, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.sendStatus(400);
    }

    if (event.type === "checkout.session.completed") {
        try {
            const data = event.data.object.metadata;
            await OrderServices.createStatus(data.orderId);
            res.status(200).json({ received: true });
        } catch (error) {
            console.error("Error processing checkout session:", error.message);
            res.status(500).json({ error: "Failed to process payment." });
        }
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;
