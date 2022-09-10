const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Item = require('../models/itemModel.js');

const itemRouter = express.Router();

itemRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      currentState: "AVAILABLE",
      owner: req.body.user_id,
    });
    const createdItem = await item.save();
    res.send({
      _id: createdItem._id,
      name: createdItem.name,
    });
  })
)

module.exports = itemRouter
