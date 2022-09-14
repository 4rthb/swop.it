const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Item = require('../models/itemModel.js');
const {isAuth} = require('../utils.js');

const itemRouter = express.Router();

itemRouter.post(
  '/register',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      image: req.body.imageUrl,
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

itemRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (item) {
      item.name = req.body.name;
      item.description = req.body.description;
      item.currentState = req.body.currentState;
      item.owner = req.body.owner;
      const updatedItem = await item.save();
      res.send({ message: "Item atualizado.", item: updatedItem });
    } else {
      res.status(404).send({ message:"Item inexistente."});
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
      res.send({ message: "Item removido.", Item: deleteItem });
    } else {
      res.status(404).send({ message: "Item não encontrado." });
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
      res.status(404).send({ message: "Item não encontrado."  });
    }
  })
);

module.exports = itemRouter
