const express = require("express");
const router = express.Router();
const { ProductTable, MediaProperty, Tag } = require('../models');
const { bootstrapField, createProductForm, createSearchForm } = require('../forms');
// import in the CheckIfAuthenticated middleware
const { checkIfAuthenticated } = require('../middleware');
const dataLayer=require('../dal/products')



router.get('/', async (req, res) => {

      // 1. get all the media
      const allMedia = await dataLayer.getAllMedia();
    allMedia.unshift([0, 'All Media']);


    // 2. Get all the tags
    const allTags = await dataLayer.getAllTags();

 
   // 3. Create search form 
    let searchForm = createSearchForm(allMedia, allTags);

    searchForm.handle(req, {
            'empty': async (form) => {
                // the model represents the entire table
                // let products = await ProductTable.collection().fetch({
                //     'withRelated': ['mediaProperty', 'tags']
                // });
    
                res.render('products/search', {
                    // 'products': products.toJSON(), // convert the results to JSON
                    'searchForm': form.toHTML(bootstrapField),
                    'allMedia': allMedia,
                    'allTags': allTags
                })
            },
        'error': async (form) => {
                    },
        'success': async (form) => {
            let title = form.data.title;
            let costBetween = form.data.costa;
            let costLess = form.data.costb;
            let min_width=form.data.min_width;
            let max_width=form.data.max_width;
            let min_height=form.data.min_height;
            let max_height=form.data.max_height;
            let mediaProperty = parseInt(form.data.mediaProperty_id);
            let tags = form.data.tags;
       
            // create a query that is the eqv. of "SELECT * FROM products WHERE 1"
            // this query is deferred because we never call fetch on it.
            // we have to execute it by calling fetch onthe query
            let q = ProductTable.collection();
            
            // if name is not undefined, not null and not empty string
            if (title) {
                // add a where clause to its back
                q.where('title', 'like', `%${title}%`);
            }

            if (min_width) {
                q.where('width', '>=', min_width);
            }

            if (max_width) {
                q.where('width', '<=', max_width);
            }

            if (min_height) {
                q.where('height', '>=', min_height);
            }

            if (max_height) {
                q.where('height', '<=', max_height);
            }

            // check if cateogry is not 0, not undefined, not null, not empty string
            if (mediaProperty) {
                q.where('mediaProperty_id', '=', mediaProperty);
            }

            // if tags is not empty
            if (tags) {
                let selectedTags = tags.split(',');
                q.query('join', 'posters_tags', 'posters.id', 'poster_id')
                 .where('tag_id', 'in', form.data.tags.split(','));
                
            }

            // execute the query
            let products = await q.fetch({
                'withRelated':['mediaProperty', 'tags']
            });
            res.render('products/search', {
                'products': products.toJSON(), // convert the results to JSON
                'searchForm': form.toHTML(bootstrapField),
                'allMedia': allMedia,
                'allTags': allTags
            })
           
        }
    })
})



router.get('/allproducts', async (req, res) => {



    let productsvar = await dataLayer.getAllProducts();
   

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

    await dataLayer.addPoster();
    // const allMedia = await MediaProperty.fetchAll().map((media_properties) => {
    //     return [media_properties.get('id'), media_properties.get('name')];
    // })

    // const allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);

    // const productForm = createProductForm(allMedia, allTags);

    // productForm.handle(req, {
    //     success: async (form) => {
    //         let { tags, ...productData } = form.data;

    //         const poster = new ProductTable(productData);


    //         poster.set('title', form.data.title);
    //         poster.set('cost', form.data.cost);
    //         poster.set('description', form.data.description);
    //         poster.set('date', form.data.date);
    //         poster.set('stock', form.data.stock);
    //         poster.set('height', form.data.height);
    //         poster.set('width', form.data.width);
    //         poster.set('mediaProperty_id', form.data.mediaProperty_id)
    //         await poster.save();

    //         if (tags) {
    //             await poster.tags().attach(tags.split(","));
    //         }
    //         req.flash('success_messages', `New Poster ${poster.get("title")} has been created`)
    //         res.redirect('/allproducts');

        // },
    //     'error': async (form) => {
    //         res.render('products/create', {
    //             form: form.toHTML(bootstrapField),
    //             cloudinaryName: process.env.CLOUDINARY_NAME,
    //             cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    //             cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    //         })
    //     }
    // })
})

router.get('/update/:product_id', async (req, res) => {
    let productId = req.params.product_id;
    const poster = await dataLayer.getProductById(productId);


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



module.exports = router;