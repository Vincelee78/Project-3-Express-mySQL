const express = require("express");
const router = express.Router();

const {Product}=require('../models')


router.get('/',(req,res)=>{
    res.render('landing/index')
})

router.get('/album/posters',(req,res)=>{
    res.render('landing/album')
})

router.get('/game/posters', (req,res)=>{
    res.render('landing/game')
})

router.get('/movie/posters', (req,res)=>{
    res.render('landing/movie')
})

router.get('/allproducts', async (req,res)=>{
    // #2 - fetch all the products (ie, SELECT * from products)
    let products = await Product.collection().fetch();
    res.render('products/index', {
        'products': products.toJSON() // #3 - convert collection to JSON
    })
})


module.exports=router;