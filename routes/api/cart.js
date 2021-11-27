const express = require("express");
const router = express.Router();

const cartServices = require("../../services/cart");

router.get("/", async (req, res) => {
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
    const cartItems = await cartServices.addItemToCart(req.user.id, req.body);
    res.status(200);
    res.json(cartItems.toJSON());
  } catch (error) {
    res.status(500);
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

router.post("/:product_id/quantity/update", async function (req, res) {
  try {
    let userId = req.user.id;
    let productId = req.params.product_id;
    let newQuantity = req.body.newQuantity;

    let cartItems = await cartServices.updateQuantityInCart(
      userId,
      productId,
      newQuantity
    );
    res.status(200);
    res.json(cartItems.toJSON());
  } catch (error) {
    res.status(500);
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

router.post("/:product_id/delete", async function (req, res) {
  try{
  let cartItems = await cartServices.removeFromCart(
    req.user.id,
    req.params.product_id
  );
  res.status(200);
    res.json(cartItems.toJSON());
  } catch (error) {
    res.status(500);
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

module.exports = router;
