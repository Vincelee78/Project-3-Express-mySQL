const express = require("express");
const router = express.Router();
const { ProductTable, MediaProperty, Tag } = require('../models');
const { bootstrapField, createProductForm } = require('../forms');
// import in the CheckIfAuthenticated middleware
const { checkIfAuthenticated } = require('../middleware');



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
        withRelated: ['mediaProperty', 'tags']
    });
    console.log(productsvar.toJSON())
    res.render('products/index', {
        products4: productsvar.toJSON(), // #3 - convert collection to JSON

    })
})

router.get('/create', checkIfAuthenticated, async (req, res) => {

    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })

    const allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);

    const productForm = createProductForm(allMedia, allTags);
    res.render('products/create', {
        form: productForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

// getDate=()=>{
//     let date = new Date();
//     date = String(date);
//     date = date.slice(4, 15);
//     return date;
// }

router.post('/create', checkIfAuthenticated, async (req, res) => {

    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })

    const allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);

    const productForm = createProductForm(allMedia, allTags);
    productForm.handle(req, {
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

            if (tags) {
                await poster.tags().attach(tags.split(","));
            }
            req.flash('success_messages', `New Poster ${poster.get("title")} has been created`)
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

router.get('/update/:product_id', async (req, res) => {
    let productId = req.params.product_id;
    const poster = await ProductTable.where({
        id: productId
    }).fetch({
        require: true,
        withRelated: ['tags']
    });


    // fetch all the categories
    const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
        return [media_properties.get('id'), media_properties.get('name')];
    })

    const allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);

    const productForm = createProductForm(allMedia, allTags);

    productForm.fields.title.value = poster.get('title');
    productForm.fields.cost.value = poster.get('cost');
    productForm.fields.description.value = poster.get('description');
    productForm.fields.date.value = poster.get('date');
    productForm.fields.stock.value = poster.get('stock');
    productForm.fields.height.value = poster.get('height');
    productForm.fields.width.value = poster.get('width');
    productForm.fields.mediaProperty_id.value = poster.get('mediaProperty_id');
    // 1 - set the image url in the product form
    productForm.fields.image_url.value = poster.get('image_url');

    let selectedTags = await poster.related('tags').pluck('id');
    productForm.fields.tags.value = selectedTags

    res.render('products/update', {
        form: productForm.toHTML(bootstrapField),
        product: poster.toJSON(),
        // 2 - send to the HBS file the cloudinary information
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
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
        withRelated: ['tags'],
    });

    const productForm = createProductForm(allMedia);
    productForm.handle(req, {
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
            req.flash('success_messages', `Poster ${poster.get("title")} has been updated`)
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
    req.flash('success_messages', `Poster ${product.get("title")} has been deleted`)
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