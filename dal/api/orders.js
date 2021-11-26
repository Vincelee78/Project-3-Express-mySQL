const { CartItem } = require("../../models");
const cartServices = require("../../services/cart");
const {getProductById}=require("../../dal/products")
const {
  createOrder,
  createOrderItem,
} = require("../../services/orders");


  async function checkOut(userId) {
    const cartItems = await cartServices.getShoppingCart(userId) ;
    const order = await createOrder(userId);
    

      cartItems.map(async (cartItem)=> {
        const product=await getProductById(
          await cartItem.get("product_id"))
          console.log(product.toJSON())
          
        createOrderItem({
          order_id: order.get("id"),
          wall_bed_id: cartItem.get("product_id"),
          quantity: cartItem.get("quantity"),
          cost: product.get('cost'),
          wood_colour_id: await product.related('woodColour').pluck('id')[0]
            }).then(() => {
          console.log('this ran too')
          cartServices.removeFromCart(
            userId,
            cartItem.get("product_id")          
          );
        }).catch(e =>consol.log(e));
      });
    return order;
  }


//export class
module.exports = {checkOut};