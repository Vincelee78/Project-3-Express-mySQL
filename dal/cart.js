const { CartItem } = require('../models');


async function getAllItemsFromCart(){
    return await CartItem.collection().fetch({
        require: false,
        withRelated:['wallBed', 'wallBed.woodColour','wallBed.bedSize','wallBed.bedOrientation','wallBed.frameColour','wallBed.mattressType','wallBedUser']
    })
}



async function getShoppingCartForUser(userId) {
    return await CartItem.collection()
        .where({
            'user_id': userId
        }).fetch({
            require: false,
            withRelated: ['wallBed', 'wallBed.woodColour','wallBed.bedSize','wallBed.bedOrientation','wallBed.frameColour','wallBed.mattressType']
        });
}


async function createCartItem(userId, productId, quantity) {
    // Model: represents the entire table
    // instance of a model: represents one row in the table
    let cartItem = new CartItem({
        'user_id': userId,
        'product_id': productId,
        'quantity': quantity
    });

    
    await cartItem.save();
    return cartItem;
    
}



const getCartItemByUserAndWallBed = async (userId, productId) => {
    
    return await CartItem.where({
        'user_id': userId,
        'product_id': productId,
        
    }).fetch({
        require: false
        
    });
    
}


async function removeFromCart(userId, productId) {
    let cartItem = await getCartItemByUserAndWallBed(userId, productId);
    if (cartItem) {
        await cartItem.destroy();
        return true;
    }
    return false;
}

async function updateQuantity(userId, productId, newQuantity) {
    let cartItem = await getCartItemByUserAndWallBed(userId, productId);
    
    if (cartItem) {
        cartItem.set('quantity', newQuantity).save();
        
        return cartItem;
    }
    return false;
}


module.exports = { getAllItemsFromCart, getShoppingCartForUser,getCartItemByUserAndWallBed,removeFromCart,updateQuantity, createCartItem }