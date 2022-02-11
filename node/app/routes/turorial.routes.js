const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", [authJwt.verifyToken], tutorials.create);

  // Retrieve all Tutorials
  router.get("/", [authJwt.verifyToken], tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", [authJwt.verifyToken], tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", [authJwt.verifyToken], tutorials.delete);

  // Delete all Tutorials
  router.delete("/", [authJwt.verifyToken, authJwt.isModerator], tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
