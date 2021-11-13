const cartDataLayer = require('../dal/cart')

async function getShoppingCart(userId)  {
    return await cartDataLayer.getShoppingCartForUser(userId);
}


module.exports = {getShoppingCart};