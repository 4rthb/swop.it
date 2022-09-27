const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Item = require('../models/itemModel.js');
const Offer = require('../models/offerModel.js');
const User = require('../models/userModel.js');
const {
  isAuth
} = require('../utils.js');

const adminRouter = express.Router();

adminRouter.post(
  '/ban/:targetId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user.isAdmin) {
      const targetId = req.params.targetId;
      const target = await User.findById(targetId);
      console.log(target);

      target.password = bcrypt.hashSync("segredojamaisrevelado", 8);
      const savedUser = target.save();

      const targetOffers = await Offer.find({
        offeredOwner: target._id,
        offerState: "PENDING"
      });

      console.log(targetOffers);

      for (var offerIndex in targetOffers) {
        targetOffers[offerIndex].offerState = "CANCELED";
        const rejectedOffer = await targetOffered[offerIndex].save();
      }

      const targetOffered = await Offer.find({
        desiredOwner: target._id,
        offerState: "PENDING"
      });

      console.log(targetOffered);

      for (var offerIndex in targetOffered) {
        targetOffered[offerIndex].offerState = "CANCELED";

        for (var itemIndex in targetOffered[offerIndex].itemsOffered) {
          const newItem = await Item.findById(targetOffered[offerIndex].itemsOffered[itemIndex]);

          if (newItem) {
            if (newItem.currentState === "BLOCKED") {
              newItem.currentState = "AVAILABLE";
              const savedItem = await newItem.save();
            }
          }
        }

        const rejectedOffer = await targetOffered[offerIndex].save();
      }

      const items = await Item.find({
        owner: target._id
      });

      for (var item in items) {
        const deleteItem = await items[item].remove();
      }

      res.status(404).send({
        message: "Usuário Banido."
      });
    } else {
      res.status(404).send({
        message: "Usuário inválido."
      });
    }
  }));

module.exports = adminRouter
