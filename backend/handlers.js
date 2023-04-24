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
const getMeal = async (req, res) => {
  try {
    var options = {
      uri: `https://api.spoonacular.com/recipes/complexSearch?cuisine=${req.query.cuisine}&number=100&apiKey=${API_KEY}`,
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
    const db = client.db("ourtable");

    const existingUser = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (!existingUser) {
      await db.collection("users").insertOne({ _id: uuidv4(), ...req.body });
      res.status(201).json({ status: 201, message: "user added to db" });
    }
    {
      res
        .status(400)
        .json({ status: 400, message: "user already added to db" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: "adding user to db failed!",
    });
    client.close();
  }
};

module.exports = {
  getByIngredients,
  getRandomRecipes,
  getMeal,
  getRecipeById,
  getDessert,
  addUser,
};
