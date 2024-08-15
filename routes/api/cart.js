const express = require("express");
const router = express.Router();
const cartServices = require("../../services/cart");
const { checkIfAuthenticated } = require("../../middleware");

router.get("/", async (req, res, next) => {
  try {

    let cartItems = await cartServices.getShoppingCart(req.user.id);
    console.log("Cart Items:", cartItems);
    res.status(200);
    res.json(cartItems.toJSON());
  } catch (error) {
    console.error("Error:", error); // Log the full error
    res.status(500);
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

//add to cart
router.post("/addToCart", async (req, res) => {
  try {
    const cartItems = await cartServices.addItemToCart(req.user.id, req.body.productId);
    res.status(200);
    res.json(cartItems);
  } catch (error) {
    console.error("Error adding to cart:", error); // Log the full error
    res.status(500).send({
      error: "We have encountered an internal server error",
    });
  }
});

router.post("/quantity/update", async function (req, res) {

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
    console.error("Error adding to cart:", error); // Log the full error
    res.send({
      error: "We have encountered an internal server error",
    });
  }
});

router.post("/delete", async function (req, res) {

  try {
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