const express = require("express");
const router = express.Router();

const cartServices = require("../../services/cart");

router.get("/", async (req, res, next) => {
  try {
    
    let cartItems = await cartServices.getShoppingCart(req.user.id);

    res.status(200);
    res.json(cartItems.toJSON());
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

//add to cart
router.post("/addToCart", async (req, res) => {
  try {
    console.log(req.user.id)
    console.log(req.body)
    
    const cartItems=await cartServices.addItemToCart(req.user.id, req.body.productId);
    res.status(200);
    res.json(cartItems);
  } catch (error) {
    res.status(500);
    console.log(error)
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

router.post("/quantity/update", async function (req, res) {
  console.log(req.user.id)
  console.log(req.body)
  try {
    let userId = req.user.id;
    let productId = req.body.productId;
    let newQuantity = req.body.newQuantity;

    let cartItems = await cartServices.updateQuantityInCart(
      userId,
      productId,
      newQuantity
    );
    res.status(200);
    res.json(cartItems);
  } catch (error) {
    res.status(500);
    console.log(error)
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

router.post("/delete", async function (req, res) {
  console.log(req.body)
  try{
  let cartItems = await cartServices.removeFromCart(
    req.user.id,
    req.body.productId
  );
  res.status(200);
    res.json(cartItems);
  } catch (error) {
    res.status(500);
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

module.exports = router;
