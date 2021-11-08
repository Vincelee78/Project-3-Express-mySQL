const express = require("express");
const router = express.Router();
const { ProductTable, MediaProperty, Tag } = require('../models')
const { bootstrapField, createProductForm } = require('../forms');



router.get('/', (req, res) => {
    res.render('landing/index')
})

// router.get('/album/posters', (req, res) => {
//     res.render('landing/album')
// })

// router.get('/game/posters', (req, res) => {
//     res.render('landing/game')
// })

// router.get('/movie/posters', (req, res) => {
//     res.render('landing/movie')
// })

router.get('/allproducts', async (req, res) => {
        
    

    let productsvar = await ProductTable.collection().fetch({
        withRelated: ['mediaProperty','tags']
    });
    console.log(productsvar.toJSON())
    res.render('products/index', {
        products4: productsvar.toJSON(), // #3 - convert collection to JSON
        
    })
})

router.get('/create', async (req, res) => {

    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })

    const allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);

    const productForm = createProductForm(allMedia, allTags);
    res.render('products/create', {
        form: productForm.toHTML(bootstrapField)
    })
})

// getDate=()=>{
//     let date = new Date();
//     date = String(date);
//     date = date.slice(4, 15);
//     return date;
// }

router.post('/create', async (req, res) => {

    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })

    const allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);

    const productForm = createProductForm(allMedia, allTags);
    productForm.handle(req, {
        success: async (form) => {
            let { tags, ...productData } = form.data;
            const product = new ProductTable(productData);
            product.set('title', form.data.title);
            product.set('cost', form.data.cost);
            product.set('description', form.data.description);
            product.set('date', form.data.date);
            product.set('stock', form.data.stock);
            product.set('height', form.data.height);
            product.set('width', form.data.width);
            product.set('mediaProperty_id', form.data.mediaProperty_id)
            await product.save();
            
            if (tags) {
                await product.tags().attach(tags.split(","));
            }
            res.redirect('/allproducts');

        },
        'error': async (form) => {
            res.render('products/create', {
                form: form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/update/:product_id', async (req, res) => {
    let productId = req.params.product_id;
    const poster = await ProductTable.where({
        id: productId
    }).fetch({
        require: true,
        withRelated:['tags']
    });


    // fetch all the categories
    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })

    const allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);

    const productForm = createProductForm(allMedia,allTags);

    productForm.fields.title.value = poster.get('title');
    productForm.fields.cost.value = poster.get('cost');
    productForm.fields.description.value = poster.get('description');
    productForm.fields.date.value = poster.get('date');
    productForm.fields.stock.value = poster.get('stock');
    productForm.fields.height.value = poster.get('height');
    productForm.fields.width.value = poster.get('width');
    productForm.fields.mediaProperty_id.value = poster.get('mediaProperty_id');

    let selectedTags=await poster.related('tags').pluck('id');
    productForm.fields.tags.value=selectedTags
    
    res.render('products/update', {
        form: productForm.toHTML(bootstrapField),
        product: poster.toJSON()
    })
})

router.post('/update/:id', async (req, res) => {
    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })
    let productId = req.params.id;
    const poster = await ProductTable.where({
        id: productId
    }).fetch({
        require: true,
        withRelated:['tags'],
    });

    const productForm = createProductForm(allMedia);
    productForm.handle(req, {
        'success': async (form) => {
            let {tags, ...Posterdata}=(form.data);
            poster.set(Posterdata);
            poster.save();
             // update the tags
            
             let tagIds = tags.split(',');
             let existingTagIds = await poster.related('tags').pluck('id');
 
             // remove all the tags that aren't selected anymore
             let toRemove = existingTagIds.filter( id => tagIds.includes(id) === false);
             await poster.tags().detach(toRemove);
 
             // add in all the tags selected in the form
             await poster.tags().attach(tagIds);
 
            res.redirect('/allproducts');
        },

        error: async (form) => {
            res.render('products/update', {
                form: form.toHTML(bootstrapField),
                product: product.toJSON()
            })
        }
    })

})

router.get('/delete/:id', async (req, res) => {
    let product = await ProductTable.where({
        id: req.params.id

    }).fetch({
        require: true
    });
    res.render('products/delete', {
        product: product.toJSON()
    })
})

router.post('/delete/:id', async (req, res) => {

    let product = await ProductTable.where({
        id: req.params.id

    }).fetch({
        require: true
    });
    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })

    await product.destroy(allMedia);
    res.redirect('/allproducts');
})

// router.post('/create', async (req, res) => {
//     const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
//        return [media_properties.get('id'), media_properties.get('name')];
//    })

//    const productForm = createProductForm(allMedia);
//    productForm.handle(req, {
//     'success': async (form) => {
//        // 2. Save data from form into the new product instance
//         const product = new ProductTable(form.data);
//         await product.save();
//         res.redirect('/allproducts');
//     },
//     'error': async (form) => {
//         res.render('products/create', {
//             form: form.toHTML(bootstrapField)
//         })
//     }
// })
// })

// … snipped …



module.exports = router;