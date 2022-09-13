const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Item = require('../models/itemModel.js');
const Offer = require('../models/offerModel.js');
const {isAuth} = require('../utils.js');

const offerRouter = express.Router();

offerRouter.post(
  '/:itemId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);

    if (item) {
      const offer = new Offer({
        itemDesired: item.id,
        itemsOffered: req.body.itemsOffered,
        offerState: "PENDING",
        desiredOwner: item.owner,
        offeredOwner: req.body.user_id,
      });
      const createdOffer = await offer.save();
      res.send({
        _id: createdOffer._id,
        itemDesired: createdOffer.itemDesired,
      });
    } else {
      res.status(404).send({ message:"Item inexistente."});
    }
  })
);

module.exports = offerRouter
