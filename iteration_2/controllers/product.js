const Product = require("../models/product");
const { IncomingForm } = require('formidable')
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          Error: "Product doesn't exists",
        });
      }
      req.products = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        Error: "Problem with image",
      });
    }
    //Destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        Error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    //Handle the file here
    if (file.photo) {
      if (file.photo.size > 3145728) {
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
        return res.status(400).json({
          Error: "Saving tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};
