"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  getByIngredients,
  getRandomRecipes,

  getRecipeById,
  getDessert,
  addUser,
  addComments,
  getComments,
  updateComments,
  deleteComments,
  addLike,
  deleteLike,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above or below this line
  // ---------------------------------

  .get("/api/get-by-ingredients", getByIngredients)
  .get("/api/get-random", getRandomRecipes)

  .get("/api/get-recipe-byId/:id", getRecipeById)
  .get("/api/get-dessert", getDessert)
  .post("/api/add-user", addUser)
  .post("/api/comments", addComments)
  .get("/api/comments", getComments)
  .patch("/api/comments/:_id", updateComments)
  .delete("/api/comments/:_id", deleteComments)
  .post("/api/like", addLike)
  .delete("/api/like/:_id", deleteLike)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // ---------------------------------
  // Nothing to modify above or below this line

  // this is our catch all endpoint.

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
