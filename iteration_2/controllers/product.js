/**
 * Script with logic to the product routes
 */

//Importing the Product models from models folder
const Product = require("../models/product");
//Importing the formidable to deal with images 
const formidable = require("formidable");
const _ = require("lodash");
//importing fs to deal with file-system
const fs = require("fs");

/**
 * Middleware for getting the product by particular product id
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
         // returning bad request error with json response
        return res.status(400).json({
          Error: "Product doesn't exists",
        });
      }
      req.products = product;
      next();//jumping to the next method or middleware
    });
};

/**
 * Callback method for creating a new product in the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      // returning bad request error with json response
      return res.status(400).json({
        Error: "Problem with image",
      });
    }
    //Destructure the fields
    const {
      name,
      description,
      price,
      category,
      stock
    } = fields;
    //Conditional check for checking for the actual product
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        Error: "Please include all fields",
      });
    }
    //Creating and store the Product object in the product variable
    let product = new Product(fields);

    //Handling the photo file here
    if (file.photo) {
      if (file.photo.size > 3145728) {
        // returning bad request error with json response
        return res.status(400).json({
          Error: "File size too big",
        });
      }
      //reading the photo file using fs 
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    /**
   * Method to save the product in the Database
   * @param err: Error if any error occur while saving process
   * @param order: Order object with user information
   * @return err: Unsuccessful attempt to save user in the database
   * @return order: Successful attempt - JSON response with details related to the order
   */
    product.save((err, product) => {
      if (err) {
        // returning bad request error with json response
        return res.status(400).json({
          Error: "Saving product in DB failed",
        });
      }
      res.json(product);//json response with details related to the product
    });
  });
};

/**
 * Callback method for getting a product from the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

/**
 * Middleware for getting the photo of the product
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.photo = (req, res, next) => {
  if (req.product.photo) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();//jumping to the next method or middleware
};

/**
 * Callback method for deleting a product from the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.removeProduct = (req, res) => {
  //getting the product from the request
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      // returning bad request error with json response
      return res.status(400).json({
        error: `failed to delete the product ${deletedProduct.name}`,
      });
    }
    //json response with details related to the product
    res.json({
      message: `Deletion was successful`,
      deletedProduct,
    });
  });
};

/**
 * Callback method for updating a product in the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      // returning bad request error with json response
      return res.status(400).json({
        Error: "Problem with image",
      });
    }
    // update code
    let product = req.product;
    product = _.extend(product, fields);

    //Handle the file here
    if (file.photo) {
      //error if the size is greater than 3 mb
      if (file.photo.size > 3145728) {
        // returning bad request error with json response
        return res.status(400).json({
          Error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //Save to the DB
    product.save((err, product) => {
      if (err) {
        // returning bad request error with json response
        return res.status(400).json({
          Error: "Updation of the product failed",
        });
      }
      //json response with details related to the product
      res.json(product);
    });
  });
};

/**
 * Callback method for getting all the products from the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.getAllProducts = (req, res) => {
  // limiting the number of products to be shown default to 8 
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  // sorting the products default with regards to _id
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  //finding all the products in the data base
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([
      [sortBy, "asc"]
    ])
    .limit(limit)
    .exec((err, products) => {
      // returning bad request error with json response
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      //json response with details related to the products
      res.json(products);
    });
};

/**
 * Middleware for updating the stock of the product
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: {
          _id: prod._id,
        },
        update: {
          $inc: {
            stock: -prod.count,
            sold: +prod.count,
          },
        },
      },
    };
  });
  //bulk writing of the products
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      // returning bad request error with json response
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();//jumping to the next method or the middleware
  });
};

/**
 * Callback method for getting all the unique categories
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.getAllUniqueCategories = (req, res) => {
  //getting unique categories or returning the error
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      // returning bad request error with json response
      return res.status(400).json({
        error: "NO category found",
      });
    }
    //json response with details related to the category
    res.json(category);
  });
};