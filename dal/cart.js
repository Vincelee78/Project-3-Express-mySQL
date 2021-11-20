const { CartItem } = require('../models');

const getShoppingCartForUser = async (userId) => {
    return await CartItem.collection()
        .where({
            'user_id': userId
        }).fetch({
            require: false,
            withRelated: ['wallBed', 'wallBed.woodColour']
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



const getCartItemByUserAndPoster = async (userId, productId) => {
    return await CartItem.where({
        'user_id': userId,
        'product_id': productId
    }).fetch({
        require: false
    });
}


async function removeFromCart(userId, productId) {
    let cartItem = await getCartItemByUserAndPoster(userId, productId);
    if (cartItem) {
        await cartItem.destroy();
        return true;
    }
    return false;
}

async function updateQuantity(userId, productId, newQuantity) {
    let cartItem = await getCartItemByUserAndPoster(userId, productId);
    if (cartItem) {
        cartItem.set('quantity', newQuantity);
        cartItem.save();
        return true;
    }
    return false;
}


module.exports = { getShoppingCartForUser,getCartItemByUserAndPoster,removeFromCart,updateQuantity, createCartItem }