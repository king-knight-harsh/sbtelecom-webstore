const router = require("express").Router();
const {
	createCart,
	updateCart,
	removeCart,
	getUserCart,
	getAllCarts,
} = require("../controllers/cart");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

//CREATE

router.post("/", verifyToken, createCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, removeCart);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

//GET ALL

router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
