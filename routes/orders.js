const express = require('express');
const router = express.Router();
const {
    checkIfAuthenticated
} = require('../middleware');
const {
    bootstrapField,
    createSearchShipDetailsForm
} = require('../forms');
const {
    Order
} = require("../models");
const datalayer = require('../dal/api/orders');
const searchdatalayer = require('../dal/orders');
var formatDate = require("date-fns/intlFormat");


router.get('/shipping', checkIfAuthenticated, async (req, res) => {

    const allStatus = await searchdatalayer.getAllOrderStatus();
    allStatus.unshift([0, 'All payment Status']);

    let searchForm = createSearchShipDetailsForm(allStatus);

    searchForm.handle(req, {
        'empty': async (form) => {
            // the model represents the entire table
            let ordersWithShipDetails = await Order.collection().fetch({
                'withRelated': ['wallBedUser', 'status']
            });

            let shippingdetails = ordersWithShipDetails.toJSON().map((details) => {
                return {
                    ...details,
                    date_ordered: formatDate(details.date_ordered, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                };
            });

            res.render('orders/shipping', {
                'orders': shippingdetails,
                'searchForm': form.toHTML(bootstrapField),
                'allStatus': allStatus,

            })
        },
        'error': async (form) => {},
        'success': async (form) => {
            let paymentReference = form.data.payment_reference;
            let status = parseInt(form.data.status_id);



            // create a query that is the eqv. of "SELECT * FROM products WHERE 1"
            // this query is deferred because we never call fetch on it.
            // we have to execute it by calling fetch onthe query
            let q = Order.collection();

            if (paymentReference) {
                // add a where clause to its back
                q.where('payment_reference', 'like', `%${paymentReference}%`);
            }


            if (status) {
                q.where('status_id', '=', status);
            }


            // execute the query
            let orders = await q.fetch({
                'withRelated': ['wallBedUser', 'status']
            });

            res.render('orders/shipping', {
                'orders': orders.toJSON(), // convert the results to JSON
                'searchForm': form.toHTML(bootstrapField),
                'allStatus': allStatus,


            })

        }
    })
})



router.post('/:id/statusComplete', async (req, res) => {

    let orderId = req.params.id;
    // let productId = req.params.product_id;

    let order = await datalayer.updateStatus(orderId);

    if (order) {
        req.flash("success_messages", "Complete order has been updated");

    } else {
        req.flash("error_messages", "Failed to update product quantity");

    }

    res.redirect("/orders/shipping");

})

module.exports = router;