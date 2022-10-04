const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expected: {
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
  timestamps: true
})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item;
