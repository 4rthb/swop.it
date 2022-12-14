const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Item = require('../models/itemModel.js');
const {
  isAuth
} = require('../utils.js');

const itemRouter = express.Router();

itemRouter.post(
  '/register',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      expected: req.body.expected,
      image: req.body.imageUrl,
      category: req.body.category,
      currentState: "AVAILABLE",
      owner: req.body.user_id,
    });
    const createdItem = await item.save();
    res.send({
      _id: createdItem._id,
      name: createdItem.name,
    });
  })
);

itemRouter.get(
  '/search',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const searchQuery = req.body.query;
    const items = await Item.find({
      $or: [{
        name: new RegExp(searchQuery, 'i')
      }, {
        category: new RegExp(searchQuery, 'i')
      }, {
        description: new RegExp(searchQuery, 'i')
      }],
      currentState: "AVAILABLE"
    });

    res.send(items);
  }));

itemRouter.get(
  '/marketplace',
  expressAsyncHandler(async (req, res) => {
    const items = await Item.find({
      currentState: "AVAILABLE"
    });
    res.send(items);
  }));

itemRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (item) {
      item.name = req.body.name;
      item.description = req.body.description;
      item.expected = req.body.expected;
      item.currentState = req.body.currentState;
      item.category = req.body.category;
      item.owner = req.body.owner;
      const updatedItem = await item.save();
      res.send({
        message: "Item atualizado.",
        item: updatedItem
      });
    } else {
      res.status(404).send({
        message: "Item inexistente."
      });
    }
  })
);

itemRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
      const deleteItem = await item.remove();
      res.send({
        message: "Item removido.",
        Item: deleteItem
      });
    } else {
      res.status(404).send({
        message: "Item n??o encontrado."
      });
    }
  })
);

itemRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({
        message: "Item n??o encontrado."
      });
    }
  })
);

module.exports = itemRouter
