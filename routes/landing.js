const express = require("express");
const router = express.Router();
const { ProductTable, BedSize, BedOrientation, MattressType, FrameColour, WoodColour, } = require('../models');
const { bootstrapField, createProductForm, createSearchForm } = require('../forms');
// import in the CheckIfAuthenticated middleware
const { checkIfAuthenticated } = require('../middleware');
const dataLayer = require('../dal/products')



router.get('/', async (req, res) => {

    // 1. get all the bed sizes
    const allBedSize = await dataLayer.getAllBedSize();
    allBedSize.unshift([0, 'All Bed Sizes']);

    const allBedOrientation = await dataLayer.getAllBedOrientation();
    allBedOrientation.unshift([0, 'All Bed Orientations']);

    const allMattressType = await dataLayer.getAllMattressType();
    allMattressType.unshift([0, 'All Mattress Types']);

    const allFrameColour = await dataLayer.getAllFrameColours();
    allFrameColour.unshift([0, 'All Frame Colours']);

    // 2. Get all the wood colours
    const allWoodColours = await dataLayer.getAllWoodColours();


    // 3. Create search form 
    let searchForm = createSearchForm(allBedSize, allBedOrientation, allMattressType, allFrameColour, allWoodColours);

    searchForm.handle(req, {
        'empty': async (form) => {
            // the model represents the entire table
            let products = await ProductTable.collection().fetch({
                'withRelated': ['bedSize', 'bedOrientation', 'mattressType', 'frameColour', 'woodColour']
            });
                
            res.render('products/search', {
                'products': products.toJSON(), // convert the results to JSON
                'searchForm': form.toHTML(bootstrapField),
                'allBedSize': allBedSize,
                'allBedOrientation': allBedOrientation,
                'allMattressType': allMattressType,
                'allFrameColour': allFrameColour,
                'allWoodColours': allWoodColours
            })
        },
        'error': async (form) => {
        },
        'success': async (form) => {
            let name = form.data.name;
            let cost_min = form.data.cost_min;
            let cost_max = form.data.cost_max;
            let bedSize = parseInt(form.data.bed_size_id);
            let bedOrientation = parseInt(form.data.bed_orientation_id);
            let mattressType = parseInt(form.data.mattress_type_id);
            let frameColour = parseInt(form.data.frame_colour_id);
            let woodColour = form.data.woodColour;

            // create a query that is the eqv. of "SELECT * FROM products WHERE 1"
            // this query is deferred because we never call fetch on it.
            // we have to execute it by calling fetch onthe query
            let q = ProductTable.collection();

            // if name is not undefined, not null and not empty string
            if (name) {
                // add a where clause to its back
                q.where('name', 'like', `%${name}%`);
            }

            if (cost_min) {
                q.where('cost', '>=', cost_min);
            }

            if (cost_max) {
                q.where('cost', '<=', cost_max);
            }


            // check if cateogry is not 0, not undefined, not null, not empty string
            if (bedSize) {
                q.where('bed_size_id', '=', bedSize);
            }
            if (bedOrientation) {
                q.where('bed_orientation_id', '=', bedOrientation);
            }
            if (mattressType) {
                q.where('mattress_type_id', '=', mattressType);
            }
            if (frameColour) {
                q.where('frame_colour_id', '=', frameColour);
            }

            // if tags is not empty
            if (woodColour) {
                let selectedTags = woodColour.split(',');
                q.query('join', 'wall_beds_wood_colours', 'wall_beds.id', 'wall_bed_id')
                    .where('wood_colour_id', 'in', selectedTags);

            }
                
            // execute the query
            let products = await q.fetch({
                'withRelated': ['bedSize', 'bedOrientation', 'mattressType', 'frameColour', 'woodColour']
            });
            
            res.render('products/search', {
                'products': products.toJSON(), // convert the results to JSON
                'searchForm': form.toHTML(bootstrapField),
                'allWoodColours': allWoodColours,
                'allBedSize': allBedSize,
                'allBedOrientation': allBedOrientation,
                'allMattressType': allMattressType,
                'allFrameColour': allFrameColour,

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

    const allBedSize = await dataLayer.getAllBedSize();
    const allBedOrientation = await dataLayer.getAllBedOrientation();
    const allMattressType = await dataLayer.getAllMattressType();
    const allFrameColours = await dataLayer.getAllFrameColours();
    const allWoodColours = await dataLayer.getAllWoodColours();


    const productForm = createProductForm(allBedSize, allBedOrientation, allMattressType, allFrameColours, allWoodColours);
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

    // await dataLayer.addPoster();
    const allBedSize = await dataLayer.getAllBedSize();

    const allBedOrientation = await dataLayer.getAllBedOrientation();

    const allMattressType = await dataLayer.getAllMattressType();

    const allFrameColour = await dataLayer.getAllFrameColours();

    const allWoodColours = await dataLayer.getAllWoodColours();

    const productForm = createProductForm(allBedSize, allMattressType, allBedOrientation, allFrameColour, allWoodColours);
    productForm.handle(req, {
        success: async (form) => {
            let { woodColour, ...productData } = form.data;

            const poster = new ProductTable(productData);


            poster.set('name', form.data.name);
            poster.set('weight', form.data.weight);
            poster.set('description', form.data.description);
            poster.set('stock', form.data.stock);
            poster.set('date', form.data.date);
            poster.set('bed_size_id', form.data.bed_size_id);
            poster.set('mattress_type_id', form.data.mattress_type_id);
            poster.set('bed_orientation_id', form.data.bed_orientation_id);
            poster.set('frame_colour_id', form.data.frame_colour_id);
            await poster.save();

            if (woodColour) {
                await poster.woodColour().attach(woodColour.split(","));
            }
            req.flash('success_messages', `New Wall Bed ${poster.get("name")} has been created`)
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
    const wallBed = await dataLayer.getProductById(productId);


    // fetch all the categories
    const allBedSize = await dataLayer.getAllBedSize();

    const allBedOrientation = await dataLayer.getAllBedOrientation();

    const allMattressType = await dataLayer.getAllMattressType();

    const allFrameColour = await dataLayer.getAllFrameColours();

    const allWoodColours = await dataLayer.getAllWoodColours();

    const productForm = createProductForm(allBedSize, allMattressType, allBedOrientation, allFrameColour, allWoodColours);

    productForm.fields.name.value = wallBed.get('name');
    productForm.fields.weight.value = wallBed.get('weight');
    productForm.fields.description.value = wallBed.get('description');
    productForm.fields.stock.value = wallBed.get('stock');
    productForm.fields.bed_size_id.value = wallBed.get('bed_size_id');
    productForm.fields.mattress_type_id.value = wallBed.get('mattress_type_id');
    productForm.fields.bed_orientation_id.value = wallBed.get('bed_orientation_id');
    productForm.fields.frame_colour_id.value = wallBed.get('frame_colour_id');
    // productForm.fields.cost.value = wallBed.get('cost');
    // 1 - set the image url in the product form
    productForm.fields.image_url.value = wallBed.get('image_url');

    let selectedTags = await wallBed.related('woodColour').pluck('id');
    productForm.fields.woodColour.value = selectedTags

    res.render('products/update', {
        form: productForm.toHTML(bootstrapField),
        product: wallBed.toJSON(),
        // 2 - send to the HBS file the cloudinary information
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

router.post('/update/:id', async (req, res) => {
    const allBedSize = await dataLayer.getAllBedSize();

    const allBedOrientation = await dataLayer.getAllBedOrientation();

    const allMattressType = await dataLayer.getAllMattressType();

    const allFrameColour = await dataLayer.getAllFrameColours();

    const allWoodColours = await dataLayer.getAllWoodColours();

    let productId = req.params.id;
    const poster = await dataLayer.getProductById(productId);

    const productForm = createProductForm(allBedSize, allMattressType, allBedOrientation, allFrameColour, allWoodColours);
    productForm.handle(req, {
        'success': async (form) => {
            let { woodColour, ...Posterdata } = (form.data);
            poster.set(Posterdata);
            poster.save();
            // update the tags

            let tagIds = woodColour.split(',');
            let existingTagIds = await poster.related('woodColour').pluck('id');

            // remove all the tags that aren't selected anymore
            let toRemove = existingTagIds.filter(id => tagIds.includes(id) === false);
            await poster.woodColour().detach(toRemove);

            // add in all the tags selected in the form
            await poster.woodColour().attach(tagIds);
            req.flash('success_messages', `Poster ${poster.get("name")} has been updated`)
            res.redirect('/allproducts');
        },

        error: async (form) => {
            res.render('products/update', {
                form: form.toHTML(bootstrapField),
                poster: poster.toJSON()
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