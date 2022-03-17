const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).
    exec((err, cate) => {
      if (err) {
        return res.status(404).json({
          error: "Category not found in the Database",
        });
      }
      req.category = cate;
      next();
    });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(404).json({
        error: "NOT able to save category",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(404).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updateCategory) => {
    if (err) {
      return res.status(404).json({
        error: "Failed to update category",
      });
    }
    res.json(updateCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  
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
