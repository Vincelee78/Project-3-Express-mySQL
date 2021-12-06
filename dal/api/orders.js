const { Order} = require("../../models");
const cartServices = require("../../services/cart");
const {getProductById}=require("../../dal/products")
const {
  createOrder,
  createOrderItem,
} = require("../../services/orders");



  async function checkOut(userId) {
    const cartItems = await cartServices.getShoppingCart(userId) ;
    const order = await createOrder(userId)
    

      cartItems.map(async (cartItem)=> {
        const product=await getProductById( await cartItem.get("product_id"))
          
          
        await createOrderItem({
          
          order_id: order.get("id"),
          wall_bed_id: cartItem.get("product_id"),
          quantity: cartItem.get("quantity"),
          cost: product.get('cost'),
          bed_size_id: product.get('bed_size_id'),
          bed_orientation_id: product.get('bed_orientation_id'),
          frame_colour_id:product.get('frame_colour_id'),
          mattress_type_id: product.get('mattress_type_id'),
          wood_colour_id: await product.related('woodColour').pluck('id')[0],
          
            }
            
            ).then(() => {
              
          cartServices.removeFromCart(
            userId,
            cartItem.get("product_id")          
          );
        }).catch(e =>console.log(e));
      });
      
    return order;
  }

  const getOrder= async (orderId) => {
    
    return await Order.where({
        'id': orderId,
        
        
    }).fetch({
        require: false
        
    });
    
}

async function updateStatus(orderId) {
  let OrderItem = await getOrder(orderId);
  
      OrderItem.set('status_id', 4).save();
      return OrderItem;
}   

//export class
module.exports = {updateStatus ,getOrder, checkOut};