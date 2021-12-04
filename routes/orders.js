const express = require('express');
const router = express.Router();
const {
    checkIfAuthenticated
} = require('../middleware');

const {
    Order,
} = require("../models");

const datalayer=require('../dal/api/orders');


router.get('/shipping',checkIfAuthenticated, async (req, res) => {
    let orders = await Order.collection().fetch({
        'withRelated': ['wallBedUser', 'status']
    });
    
    res.render('orders/shipping', {
        orders: orders.toJSON()
    })
})

router.post('/:id/statusComplete' , async (req,res)=>{
    
    let orderId = req.params.id;
    // let productId = req.params.product_id;
    
    let order=await datalayer.updateStatus(orderId);
    
    if (order) {
        req.flash("success_messages", "Complete order has been updated");
        console.log('this runs')
    } else {
        req.flash("error_messages", "Failed to update product quantity");
        console.log('this does not runs')
    }
    
    res.redirect("/orders/shipping");
  
})

module.exports=router;