// import models
const {
  Order,
  OrderItem
} = require("../models");
const {
  v1: uuidv1,
} = require('uuid');


/************************** Order ************************************/

async function createOrder(userId) {
  try {

    let order = new Order({

      user_id: userId,
      payment_reference: uuidv1(),
      date_ordered: new Date(),
      status_id: 3,
    });
    await order.save();

    return order;

  } catch (error) {

    console.error("Failed to create order:", error);
    throw new Error("We have encountered an internal server error when creating an order.");
  }
  }



async function createStatus(orderId) {
  try {

    let order = await Order.where('id', orderId).fetch({
      'withRelated': ['wallBedUser', 'status'],
      require: false
    });

    order.set("status_id", 1);
    await order.save();

    return order;
  } catch (error) {

    return ({

      error: "We have encountered an internal server error",
    });
  }
}

async function completeStatus(orderId) {
  try {

    let order = await Order.where('id', orderId).fetch({
      'withRelated': ['wallBedUser', 'status'],
      require: false
    });

    order.set("status_id", 4);
    await order.save();

    return order;
  } catch (error) {

    return ({

      error: "We have encountered an internal server error",
    });
  }
}


async function createOrderItem(orderItem) {
  try {

    const item = new OrderItem({
      order_id: orderItem.order_id,
      wall_bed_id: orderItem.wall_bed_id,
      quantity: orderItem.quantity,
      cost: orderItem.cost,
      wood_colour_id: orderItem.wood_colour_id,
      bed_size_id: orderItem.bed_size_id,
      mattress_type_id: orderItem.mattress_type_id,
      frame_colour_id: orderItem.frame_colour_id,
      bed_orientation_id: orderItem.bed_orientation_id,
    });

    await item.save();

    return item;
  } catch (error) {

    return ({
      error: "We have encountered an internal server error",
    });
  }
};

module.exports = {
  completeStatus,
  createOrder,
  createOrderItem,
  createStatus
}

// // import models
// const {
//   Order,
//   OrderItem
// } = require("../models");
// const {
//   v1: uuidv1,
// } = require('uuid');


// /************************** Order ************************************/

// async function createOrder(userId) {
//   try {

//     let order = new Order({
//       user_id: userId,
//       payment_reference: uuidv1(),
//       date_ordered: new Date(),
//       status_id: 3,
//     });
//     await order.save();

//     return order;

//   } catch (error) {
//     return {
//       error: "We have encountered an internal server error",
//     };
//   }
// }

// async function createStatus(orderId) {
//   try {
//     let order = await Order.where('id', orderId).fetch({
//       'withRelated': ['wallBedUser', 'status'],
//       require: false
//     });

//     order.set("status_id", 1);
//     await order.save();

//     return order;
//   } catch (error) {
//     return {
//       error: "We have encountered an internal server error",
//     };
//   }
// }

// async function completeStatus(orderId) {
//   try {
//     let order = await Order.where('id', orderId).fetch({
//       'withRelated': ['wallBedUser', 'status'],
//       require: false
//     });

//     order.set("status_id", 4);
//     await order.save();

//     return order;
//   } catch (error) {
//     return {
//       error: "We have encountered an internal server error",
//     };
//   }
// }


// async function createOrderItem(orderItem) {
//   try {
//     const item = new OrderItem({
//       order_id: orderItem.order_id,
//       wall_bed_id: orderItem.wall_bed_id,
//       quantity: orderItem.quantity,
//       cost: orderItem.cost,
//       wood_colour_id: orderItem.wood_colour_id,
//       bed_size_id: orderItem.bed_size_id,
//       mattress_type_id: orderItem.mattress_type_id,
//       frame_colour_id: orderItem.frame_colour_id,
//       bed_orientation_id: orderItem.bed_orientation_id,
//     });

//     await item.save();

//     return item;
//   } catch (error) {
//     return {
//       error: "We have encountered an internal server error",
//     };
//   }
// }

// module.exports = {
//   completeStatus,
//   createOrder,
//   createOrderItem,
//   createStatus
// }
