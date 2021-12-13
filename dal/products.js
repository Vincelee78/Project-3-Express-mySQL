const {
    ProductTable,
    BedSize,
    BedOrientation,
    MattressType,
    FrameColour,
    WoodColour,
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


async function addWallBed(){
    const allBedSize = await getAllBedSize();

    const allBedOrientation = await getAllBedOrientation();

    const allMattressType = await getAllMattressType();

    const allFrameColour = await getAllFrameColours();

    const allWoodColours = await getAllWoodColours();

    const productForm = createProductForm(allBedSize, allMattressType, allBedOrientation, allFrameColour, allWoodColours);
    productForm.handle(req, {
        success: async (form) => {
            let {
                woodColour,
                ...productData
            } = form.data;

            const wallBed = new ProductTable(productData);


            wallBed.set('name', form.data.name);
            wallBed.set('weight', form.data.weight);
            wallBed.set('description', form.data.description);
            wallBed.set('stock', form.data.stock);
            wallBed.set('date', form.data.date);
            wallBed.set('bed_size_id', form.data.bed_size_id);
            wallBed.set('mattress_type_id', form.data.mattress_type_id);
            wallBed.set('bed_orientation_id', form.data.bed_orientation_id);
            wallBed.set('frame_colour_id', form.data.frame_colour_id);
            await wallBed.save();

            if (woodColour) {
                await wallBed.woodColour().attach(woodColour.split(","));
            }
            req.flash('success_messages', `New Wall Bed ${wallBed.get("name")} has been created`)
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

async function updateWallBed(productId){

    const allBedSize = await getAllBedSize();

    const allBedOrientation = await getAllBedOrientation();

    const allMattressType = await getAllMattressType();

    const allFrameColour = await getAllFrameColours();

    const allWoodColours = await getAllWoodColours();

    const wallBed = await getProductById(productId)

    const productForm = createProductForm(allBedSize, allMattressType, allBedOrientation, allFrameColour, allWoodColours);
    productForm.handle(req, {
        'success': async (form) => {
            let {
                woodColour,
                ...wallBedData
            } = (form.data);
            wallBed.set(wallBedData);
            wallBed.save();


            let woodColourId = woodColour.split(',');
            let exisitingWoodColourId = await wallBed.related('woodColour').pluck('id');

            // remove all the wood colours that aren't selected anymore
            let toRemove = exisitingWoodColourId.filter(id => woodColourId.includes(id) === false);
            await wallBed.woodColour().detach(toRemove);

            // add in all the wood colours selected in the form
            await wallBed.woodColour().attach(woodColourId);
            req.flash('success_messages', `${wallBed.get("name")} has been updated`)
            res.redirect('/allproducts');
        },

        error: async (form) => {
            res.render('products/update', {
                form: form.toHTML(bootstrapField),
                wallBed: wallBed.toJSON()
            })
        }
    })

}

async function deleteWallBed(productId){
    let product = await ProductTable.where({
        id: productId

    }).fetch({
        require: true
    });
    await product.destroy();
}

async function getAllBedName() {
    const allBedName = await ProductTable.fetchAll().map(b => [b.get('id'), b.get('name')]);
    return allBedName;
}

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


const getAllProductsApi = async () => {
    return await ProductTable.fetchAll();
}

module.exports = {
    getProductById,
    getAllBedName,
    getAllBedSize,
    getAllBedOrientation,
    getAllMattressType,
    getAllFrameColours,
    getAllWoodColours,
    getAllProducts,
    getAllProductsApi,
    addWallBed,
    updateWallBed,
    deleteWallBed,
    
}