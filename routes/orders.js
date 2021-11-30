const express = require('express');
const router = express.Router();
const {
    checkIfAuthenticated
} = require('../middleware');

const {
    Order,
} = require("../models");



router.get('/shipping',checkIfAuthenticated, async (req, res) => {
    let orders = await Order.collection().fetch({
        'withRelated': ['wallBedUser']
    });
    
    res.render('orders/shipping', {
        orders: orders.toJSON()
    })
})

module.exports=router;