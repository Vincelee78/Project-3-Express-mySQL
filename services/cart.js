const cartDataLayer = require('../dal/cart')

async function getShoppingCart(userId)  {
    return await cartDataLayer.getShoppingCartForUser(userId);
}

async function addItemToCart(userId,productId) {
    try {
        
        
        // check if the user has already added the product to the cart
        let cartItem = await cartDataLayer.getCartItemByUserAndPoster(userId, productId);
        console.log(cartItem)
        if (cartItem) {
            
            // increase quantity by 1
            await cartDataLayer.updateQuantity(userId, productId, cartItem.get('quantity')+1);
            return true;
            
        } else if (!cartItem){
            
            await cartDataLayer.createCartItem(userId, productId, 1);       
            return true;   
        } 
    } catch (e) {
        console.log(e)
        return false
        
    }
    
}


async function removeFromCart(userId, productId) {
    // todo: checks
    await cartDataLayer.removeFromCart(userId, productId);
    return true;
}

async function updateQuantityInCart(userId, productId, newQuantity) {
    // todo: check for any business rules
    if (newQuantity > 0) {
        await cartDataLayer.updateQuantity(userId, productId, newQuantity);
        return true;
    } else {
        console.log('b')
        return false;
    }
}

module.exports = {getShoppingCart, addItemToCart, removeFromCart, updateQuantityInCart };