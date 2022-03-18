/**
 * Script with logic related to category routes
 * Middleware are as follow:
 * getCategoryById - getting particular category using category id
 */

//Importing the express library
const Category = require("../models/category");

/**
 * Middleware to get a particular category using category._id
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side 
 * @param {*} next - jumping to the next middleware or method
 * @returns error - Error json response about the unsuccessful attempt
 */
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(404).json({
        error: "Category not found in the Database",
      });
    }
    req.category = cate;
    next();
  });
};
/**
 * Call back method create a new category
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side
 * @returns custom JSON response with user details
 */
exports.createCategory = (req, res) => {
  //New category model/object
  const category = new Category(req.body);
  /**
   * Method to save the category in the Database
   * @param err: Error if any error occur while saving process
   * @param category: Category object with category information
   * @return err: Unsuccessful attempt to save user in the database
   * @return user: Successful attempt - JSON response with details related to category
   */
  category.save((err, category) => {
    if (err) {
      //returning if not found error code with json response
      return res.status(404).json({
        error: "NOT able to save category",
      });
    }
    //json response 
    res.json({
      category
    });
  });
};

/**
* Call back method get a category from the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side 
 * @returns json response with details related to category
 */
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

/**
* Call back method get all categories from the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side 
 * @returns json response with details related to category
 */
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      //returning if not found error code with json response
      return res.status(404).json({
        error: "No categories found",
      });
    }
    // json response with details related to category
    res.json(categories);
  });
};

/**
* Call back method to update a category from the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side 
 * @returns json response with details related to category
 */
exports.updateCategory = (req, res) => {
  // creating and storing the category object in the variable
  const category = req.category;
  category.name = req.body.name;
  /**
   * Method to save the updated category in the Database
   * @param err: Error if any error occur while saving process
   * @param updateCategory: Category object with category information
   * @return err: Unsuccessful attempt to save user in the database
   * @return user: Successful attempt - JSON response with details related to category
   */
  category.save((err, updateCategory) => {
    if (err) {
      //returning if not found error code with json response
      return res.status(404).json({
        error: "Failed to update category",
      });
    }
    // json response with updated details related to category
    res.json(updateCategory);
  });
};

/**
* Call back method to remove a category from the database
 * @param {*} req - request from client side 
 * @param {*} res - response from the server side 
 * @returns json response with details related to category
 */
exports.removeCategory = (req, res) => {
  const category = req.category;
  /**
   * Method to remove the category from the Database
   * @param err: Error if any error occur while saving process
   * @param category: Category object with category information
   * @return err: Unsuccessful attempt to save user in the database
   * @return user: Successful attempt - JSON response with details related to category
   */
  category.remove((err, category) => {
    if (err) {
      return res.status(404).json({
        error: `Failed to delete category: ${category.name}`,
      });
    }
    res.json({
      message: `Successfully deleted category: ${category.name}`,
    });
  });
};