const express = require("express");
const router = express.Router();
const {
  Order,
  OrderItem
} = require('../../models');




router.get("/", async (req, res, next) => {
  try {

    let orderTable = await Order.where({
      user_id: req.user.id
    }).fetchAll({
      withRelated: ['status', 'orderItem',
        "orderItem.wallBed", 
      ]
    })


    res.status(200);
    res.json(orderTable.toJSON());
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

// //add to cart
// router.post("/addToCart", async (req, res) => {
//   try {


//     const cartItems=await cartServices.addItemToCart(req.user.id, req.body.productId);
//     res.status(200);
//     res.json(cartItems);
//   } catch (error) {
//     res.status(500);
//     // console.log(error)
//     res.send({
//       error: "We have encountered an internal server error",
//     });
//   }
// });

module.exports = router;