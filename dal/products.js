const {
    ProductTable,
    BedSize,
    BedOrientation,
    MattressType,
    FrameColour,
    WoodColour,
    Order
} = require('../models')


async function getAllProducts() {
    let products = await ProductTable.fetchAll({
        withRelated: ['bedSize', 'bedOrientation', 'mattressType', 'frameColour', 'woodColour']
    });
    return products;
}

async function getProductById(productId) {
    let beds = await ProductTable.where({
        'id': productId
    }).fetch({
        'require': true,
        withRelated: ['bedSize', 'bedOrientation', 'mattressType', 'frameColour', 'woodColour']
    });
    return beds;
}

// async function changeCentsToDollars(wallBedId) {
//     let wallBed = await ProductTable.where({
//         'id': wallBedId,
//         'cost': ParseInt(cost/100)
//     }).fetch({
//         'require': true,
//         withRelated:['bedSize', 'bedOrientation','mattressType','frameColour', 'woodColour']
//     });
//     return wallBed;

// }

// async function addPoster(){
//     const allMedia=getAllMedia();
//     const allTags=getAllTags();
//     const productForm = createProductForm(allMedia, allTags);
//     productForm.handle(req, {
//         success: async (form) => {
//             let { tags, ...productData } = form.data;

//             const poster = new ProductTable(productData);


//             poster.set('title', form.data.title);
//             poster.set('cost', form.data.cost);
//             poster.set('description', form.data.description);
//             poster.set('date', form.data.date);
//             poster.set('stock', form.data.stock);
//             poster.set('height', form.data.height);
//             poster.set('width', form.data.width);
//             poster.set('mediaProperty_id', form.data.mediaProperty_id)
//             await poster.save();

//             if (tags) {
//                 await poster.tags().attach(tags.split(","));
//             }
//             req.flash('success_messages', `New Poster ${poster.get("title")} has been created`)
//             res.redirect('/allproducts');

//         },
//         'error': async (form) => {
//             res.render('products/create', {
//                 form: form.toHTML(bootstrapField),
//                 cloudinaryName: process.env.CLOUDINARY_NAME,
//                 cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
//                 cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
//             })
//         }
// })
// }

async function getAllBedSize() {
    const allBedSize = await BedSize.fetchAll().map(b => [b.get('id'), b.get('name')]);
    return allBedSize;
}
async function getAllBedOrientation() {
    const allBedOrientation = await BedOrientation.fetchAll().map(b => [b.get('id'), b.get('name')]);
    return allBedOrientation;
}
async function getAllMattressType() {
    const allMattressType = await MattressType.fetchAll().map(b => [b.get('id'), b.get('name')]);
    return allMattressType;
}
async function getAllFrameColours() {
    const allFrameColours = await FrameColour.fetchAll().map(b => [b.get('id'), b.get('name')]);
    return allFrameColours;
}
async function getAllWoodColours() {
    const allWoodColours = await WoodColour.fetchAll().map(w => [w.get('id'), w.get('name')]);
    return allWoodColours;
}
async function getAallOrders() {
    const allOrders = await Order.fetchAll()
    return allWoodColours;
}
const getAllProductsApi = async () => {
    return await ProductTable.fetchAll();
}

module.exports = {
    getProductById,
    getAllBedSize,
    getAllBedOrientation,
    getAllMattressType,
    getAllFrameColours,
    getAllWoodColours,
    getAllProducts,
    getAllProductsApi,

}