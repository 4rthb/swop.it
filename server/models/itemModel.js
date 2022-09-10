const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  currentState: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
}, {
  timestamp: true
})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item;
