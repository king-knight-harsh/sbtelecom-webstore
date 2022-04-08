const router = require("express").Router();
const Product = require("../models/Product");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const {
	createProduct,
	updateProduct,
	deleteProduct,
	getProduct,
    getAllProducts
} = require("../controllers/product");
//Importing common code snippet from common.js
const customError = require("../utils/common");

//CREATE
router.post("/", verifyTokenAndAdmin, createProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.get("/find/:id", getProduct);

//GET ALL PRODUCTS
router.get("/", getAllProducts);

module.exports = router;
