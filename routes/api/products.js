const express = require('express');
const router = express.Router();
const productDataLayer = require('../../dal/products');
const { createProductForm } = require('../../forms');
const { ProductTable } = require('../../models');


router.get('/', async (req, res) => {
    res.json(await productDataLayer.getAllProducts());

})

router.post('/create', async (req, res) => {

    // await dataLayer.addPoster();
    const allMedia = await productDataLayer.getAllMedia()

    const allTags = await productDataLayer.getAllTags()

    const productForm = createProductForm(allMedia, allTags);

    productForm.handle(req, {
        'empty': function (form) {
            res.json({
                'message': 'No data detected'
            })
        },
        success: async (form) => {
            let { tags, ...productData } = form.data;

            const poster = new ProductTable(productData);


            poster.set('title', form.data.title);
            poster.set('cost', form.data.cost);
            poster.set('description', form.data.description);
            poster.set('date', form.data.date);
            poster.set('stock', form.data.stock);
            poster.set('height', form.data.height);
            poster.set('width', form.data.width);
            poster.set('mediaProperty_id', form.data.mediaProperty_id)
            await poster.save();
            // save the many to many relationship
            if (tags) {
                await poster.tags().attach(tags.split(","));
            }

            res.send(poster);

        },
        'error': async (form) => {

            let errors = {};
            form.fields.map((key) => {
                if (form.fields[key].error) {
                    errors[key] = form.fields[key].error;
                }
            })
            res.send(JSON.stringify(errors));
        }
    })

})

router.put('/update/:id', async (req, res) => {
    const allMedia = await productDataLayer.getAllMedia();
    
    let productId = req.params.id;
    const poster = await ProductTable.where({
        id: productId
    }).fetch({
        require: true,
        withRelated: ['tags'],
    });

    const productForm = createProductForm(allMedia);
    productForm.handle(req, {
        'empty': function (form) {
            res.json({
                'message': 'No updated form data detected'
            })
        },
        'success': async (form) => {
            let { tags, ...Posterdata } = (form.data);
            poster.set(Posterdata);
            poster.save();
            // update the tags

            let tagIds = tags.split(',');
            let existingTagIds = await poster.related('tags').pluck('id');

            // remove all the tags that aren't selected anymore
            let toRemove = existingTagIds.filter(id => tagIds.includes(id) === false);
            await poster.tags().detach(toRemove);

            // add in all the tags selected in the form
            await poster.tags().attach(tagIds);
            
            res.send(poster);
        },

        error: async (form) => {
            let errors = {};
            form.fields.map((key) => {
                if (form.fields[key].error) {
                    errors[key] = form.fields[key].error;
                }
            })
            res.send(JSON.stringify(errors));
        }
    })

})

router.delete('/delete/:id', async (req, res) => {

    let poster = await ProductTable.where({
        id: req.params.id

    }).fetch({
        require: true
    });
    const allMedia = await productDataLayer.getAllMedia();

    await poster.destroy(allMedia);
    
    res.send(poster);
})


module.exports = router;