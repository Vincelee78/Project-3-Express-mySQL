const express = require('express');
const router = express.Router();
const productDataLayer = require('../../dal/products');



router.get('/', async (req, res) => {
    try {

        res.status(200);
        res.json(await productDataLayer.getAllProductsApi())

    } catch (e) {
        res.status(500);
        res.send({
            'error': "We have encountered an internal server error"
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        res.status(200);
        res.json(await productDataLayer.getProductById(req.params.id))

    } catch (e) {
        res.status(500);
        res.send({
            'error': "We have encountered an internal server error"
        })
    }
})


module.exports = router;