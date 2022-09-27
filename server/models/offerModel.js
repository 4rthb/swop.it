const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  itemDesired: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  itemsOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required : true,
  }],
  offerState: {
    type: String,
    required: true,
  },
  desiredOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  offeredOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  offeredOwnerHasReviewed: {
    type: Boolean,
  },
  desiredOwnerHasReviewed: {
    type: Boolean,  
  }
}, {
  timestamps: true
})

const Offer = mongoose.model("Offer", offerSchema)
module.exports = Offer;
