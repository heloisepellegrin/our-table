"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
const httpRequest = require("request-promise");

require("dotenv").config();
const { MONGO_URI, API_KEY } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns an array of all flight numbers
const getByIngredients = async (req, res) => {
  try {
    var options = {
      uri: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${req.query.ingredients}&number=100&apiKey=${API_KEY}`,
      json: true,
    };
    const result = await httpRequest(options);

    res.status(200).json({ status: 200, data: result });
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: 404, error: e });
  }
};
const getRandomRecipes = async (req, res) => {
  try {
    var options = {
      uri: `https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}`,
      json: true,
    };
    const result = await httpRequest(options);

    res.status(200).json({ status: 200, data: result });
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: 404, error: e });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    var options = {
      uri: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
      json: true,
    };
    const result = await httpRequest(options);

    res.status(200).json({ status: 200, data: result });
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: 404, error: e });
  }
};
const getDessert = async (req, res) => {
  try {
    var options = {
      uri: `https://api.spoonacular.com/recipes/random?tags=dessert&apiKey=${API_KEY}`,
      json: true,
    };
    const result = await httpRequest(options);

    res.status(200).json({ status: 200, data: result });
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: 404, error: e });
  }
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("our-table");

    const existingUser = await db
      .collection("users")
      .findOne({ email: req.body.email });

    console.log("existingUser", existingUser);
    if (!existingUser) {
      await db.collection("users").insertOne({ _id: uuidv4(), ...req.body });
      return res.status(201).json({ status: 201, message: "user added to db" });
    }
    {
      return res
        .status(400)
        .json({ status: 400, message: "user already added to db" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "adding user to db failed!",
    });
  }
};

const addComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("our-table");

    const { email, comment, recipeId } = req.body;

    const newCommentObject = {
      _id: uuidv4(),
      email,
      comment,
      recipeId,
    };
    await db.collection("comments").insertOne(newCommentObject);
    return res.status(200).json({ status: 200, message: "comment added" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "adding comment failed!",
    });
  }
};
const getComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { recipeId } = req.query;
    await client.connect();
    const db = client.db("our-table");

    const allRecipes = await db.collection("comments").find().toArray();
    return res.status(200).json({
      status: 200,
      data: allRecipes.filter((item) => item.recipeId === recipeId),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "getting comments failed!",
    });
  }
};
const updateComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { _id } = req.params;
    await client.connect();
    const db = client.db("our-table");

    const newComment = { $set: { comment: req.body.comment } };
    await db.collection("comments").updateOne({ _id: _id }, newComment);
    return res.status(200).json({
      status: 200,
      message: "comment updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "updating comment failed!",
    });
  }
};
const deleteComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { _id } = req.params;
    await client.connect();
    const db = client.db("our-table");

    await db.collection("comments").deleteOne({ _id: _id });
    return res.status(200).json({
      status: 200,
      message: "comment deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "deleting comment failed!",
    });
  }
};

const addLike = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("our-table");

    const { email, recipeId } = req.body;

    const newCommentObject = {
      _id: uuidv4(),
      email,
      recipeId,
    };
    await db.collection("liked").insertOne(newCommentObject);
    return res.status(200).json({ status: 200, message: "recipe liked" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "failed to like recipe",
    });
  }
};
const deleteLike = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("our-table");

    const { _id } = req.params;

    await db.collection("liked").deleteOne({ _id: _id });
    return res.status(200).json({ status: 200, message: "recipe unliked" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "failed to delete liked recipe",
    });
  }
};

module.exports = {
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
};
