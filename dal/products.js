const {
    ProductTable,
    MediaProperty,
    Tag,
} = require('../models')

const {createProductForm}=require('../forms');

async function getAllProducts() {
    return await ProductTable.fetchAll({
        withRelated: ['mediaProperty', 'tags']
    });
}

async function getProductById(posterId) {
    let poster = await ProductTable.where({
        'id': posterId
    }).fetch({
        'require': true,
        withRelated:['tags']
    });
    return poster;
}

async function addPoster(){
    const allMedia=getAllMedia();
    const allTags=getAllTags();
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
}

async function getAllMedia() {
    const allMedia = await MediaProperty.fetchAll().map(m => [m.get('id'), m.get('name')]);
    return allMedia;
}

async function getAllTags() {
    const allTags = await Tag.fetchAll().map(t => [t.get('id'), t.get('name')]);
    return allTags;
}

module.exports = {
    getProductById,
    getAllMedia,
    getAllTags,
    getAllProducts,
    addPoster
}