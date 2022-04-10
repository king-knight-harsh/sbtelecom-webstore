/**
 * Script with all routes related to users:
 * /api/products/ - route for getting a all the product
 * /api/products/find/:id - route for getting a particular product
 * /api/products/:id - route for updating the product
 * /api/products/:id - route for deleting the product
 * /api/products/ - route for creating a product
 */

//Importing the express library
const router = require("express").Router();
const {
	verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const {
	createProduct,
	updateProduct,
	deleteProduct,
	getProduct,
    getAllProducts
} = require("../controllers/product");

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
