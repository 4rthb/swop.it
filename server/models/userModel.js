const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
}, );

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  ratingList: [ratingSchema],
}, {
  timestamp: true
})

const User = mongoose.model("User", userSchema)
module.exports = User;
