const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Item = require('../models/itemModel.js');
const Offer = require('../models/offerModel.js');
const {
  isAuth
} = require('../utils.js');

const offerRouter = express.Router();

offerRouter.post(
  '/:itemId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    let offeredItems = [];

    if (item) {
      if (item.owner.toString() !== req.user._id) {
        for (var itemIndex in req.body.itemsOffered) {
          const newItem = await Item.findById(req.body.itemsOffered[itemIndex]);

          if (newItem) {
            if (newItem.currentState !== "BLOCKED") {
              newItem.currentState = "BLOCKED";
              const savedItem = await newItem.save();
              offeredItems.push(savedItem.id);
            }
          }
        }

        const offer = new Offer({
          itemDesired: item.id,
          itemsOffered: offeredItems,
          offerState: "PENDING",
          desiredOwner: item.owner,
          offeredOwner: req.body.user_id,
        });

        const createdOffer = await offer.save();
        res.send({
          _id: createdOffer._id,
          itemDesired: createdOffer.itemDesired,
        });

        setInterval(async function() {
          const updatedCreatedOffer = await Offer.findById(createdOffer._id);
          if (updatedCreatedOffer.offerState === "PENDING") {
            updatedCreatedOffer.offerState = "CANCELED";
            const rejectedOffer = await updatedCreatedOffer.save();

            for (var itemIndex in req.body.itemsOffered) {
              const newItem = await Item.findById(req.body.itemsOffered[itemIndex]);

              if (newItem) {
                if (newItem.currentState === "BLOCKED") {
                  newItem.currentState = "AVAILABLE";
                  const savedItem = await newItem.save();
                }
              }
            }
          }
        }, 2 * 24 * 60 * 60 * 1000);
      } else {
        res.status(404).send({
          message: "Você já é dono deste item."
        });
      }
    } else {
      res.status(404).send({
        message: "Item inexistente."
      });
    }
  })
);

offerRouter.post(
  '/answer/:offerId/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await Offer.findById(offerId);

    if (offer.desiredOwner.toString() === req.user._id) {
      const answer = req.body.answer;

      let receivedItems = [];
      if (answer === "ACCEPTED") {
        if (offer.offerState === "PENDING") {
          for (var itemIndex in offer.itemsOffered) {
            const offeredItem = await Item.findById(offer.itemsOffered[itemIndex].toString());

            if (offeredItem) {
              offeredItem.currentState = "AVAILABLE";
              offeredItem.owner = offer.desiredOwner.toString();
              const received = await offeredItem.save();
              receivedItems.push(received);
            }
          }

          const desiredItem = await Item.findById(offer.itemDesired);
          desiredItem.owner = offer.offeredOwner;
          const given = await desiredItem.save();

          offer.offerState = "FINISHED";
          const finishedOffer = await offer.save();
          res.send({
            _id: offer._id,
            receivedItems: receivedItems,
          });
        } else {
          res.status(404).send({
            message: "Proposta já rejeitada."
          });
        }
      } else {
        offer.offerState = "REJECTED";
        const rejectedOffer = await offer.save();

        for (var itemIndex in offer.itemsOffered) {
          const offeredItem = await Item.findById(offer.itemsOffered[itemIndex].toString());

          if (offeredItem) {
            offeredItem.currentState = "AVAILABLE";
            const received = await offeredItem.save();
          }
        }

        res.send({
          offer: rejectedOffer,
        });
      }
    } else {
      res.status(404).send({
        message: "Proposta não encontrada."
      });
    }
  })
);

module.exports = offerRouter
