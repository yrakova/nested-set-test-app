module.exports = app => {
  const categories = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Create a new Category
  router.post("/", categories.create);

  // Retrieve all Categories
  router.get("/", categories.findAll);

  // Retrieve a single Category with id
  router.get("/:id", categories.findOne);

  // Update a Category with id
  router.put("/:id", categories.update);

  // Delete a Category with id
  router.delete("/:id", categories.delete);

  // Delete all
  router.delete("/", categories.deleteAll);

   // Reset: Delete All + Create an Example
  router.post("/reset", categories.createExample);

  app.use('/api/categories', router);
};