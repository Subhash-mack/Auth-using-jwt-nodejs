const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const auth=require('../middleware/auth');

router.route("/")
 .post(auth,cartController.addItemToCart)
 .get(auth,cartController.getCart)
 .delete(auth,cartController.removeItemFromCart)

router.delete("/empty-cart", cartController.emptyCart);
module.exports = router;