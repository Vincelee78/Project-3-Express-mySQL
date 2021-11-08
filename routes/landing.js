const express = require("express");
const router = express.Router();
const { ProductTable, MediaProperty } = require('../models')
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
    // const allMedia = await MediaProperty.fetchAll().map((media_properties)=>{
    //     return [media_properties.get('id'), media_properties.get('name')];
    // })
    // #2 - fetch all the products (ie, SELECT * from products)
    let productsvar = await ProductTable.collection().fetch({
        withRelated:['mediaProperty']
    });
    console.log(productsvar.toJSON())
    res.render('products/index', {
        products4: productsvar.toJSON(), // #3 - convert collection to JSON
        // media: allMedia,
    })
})

router.get('/create', async (req, res) => {
    
    const allMedia = await MediaProperty.fetchAll().map((media_properties)=>{
        return [media_properties.get('id'), media_properties.get('name')];
    })
    const productForm = createProductForm(allMedia);
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

    const allMedia = await MediaProperty.fetchAll().map((media_properties)=>{
        return [media_properties.get('id'), media_properties.get('name')];
    })
    const productForm = createProductForm(allMedia);
    productForm.handle(req, {
        success: async (form) => {
            const product = new ProductTable();
            product.set('title', form.data.title);
            product.set('cost', form.data.cost);
            product.set('description', form.data.description);
            product.set('date', form.data.date);
            product.set('stock', form.data.stock);
            product.set('height', form.data.height);
            product.set('width', form.data.width);
            product.set('mediaProperty_id', form.data.mediaProperty_id)
            await product.save();
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
    const product = await ProductTable.where({
        id: productId
    }).fetch({
        require: true
    });


     // fetch all the categories
     const allMedia = await MediaProperty.fetchAll().map((media_properties)=>{
        return [media_properties.get('id'), media_properties.get('name')];
    })

    const productForm = createProductForm(allMedia);

    productForm.fields.title.value = product.get('title');
    productForm.fields.cost.value = product.get('cost');
    productForm.fields.description.value = product.get('description');
    productForm.fields.date.value = product.get('date');
    productForm.fields.stock.value = product.get('stock');
    productForm.fields.height.value = product.get('height');
    productForm.fields.width.value = product.get('width');
    productForm.fields.mediaProperty_id.value = product.get('mediaProperty_id');

    res.render('products/update', {
        form: productForm.toHTML(bootstrapField),
        product: product.toJSON()
    })
})

router.post('/update/:id', async (req, res) => {
    const allMedia = await MediaProperty.fetchAll().map((media_properties)=>{
        return [media_properties.get('id'), media_properties.get('name')];
    })
    let productId = req.params.id;
    const product = await ProductTable.where({
        id: productId
    }).fetch({
        require: true
    });

    const productForm = createProductForm(allMedia);
    productForm.handle(req, {
        'success': async (form) => {
            product.set(form.data);
            product.save();
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

router.get('/delete/:id', async (req, res)=>{
    let product= await ProductTable.where({
        id:req.params.id

    }).fetch({
        require:true
    });
    res.render('products/delete',{
        product: product.toJSON()
    })
})

router.post('/delete/:id', async (req, res)=>{

    let product= await ProductTable.where({
        id:req.params.id

    }).fetch({
        require:true
    });
    const allMedia = await MediaProperty.fetchAll().map((media_properties)=>{
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