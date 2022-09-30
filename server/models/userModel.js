const mongoose = require("mongoose");

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
  address: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  ratingList: [{
    type: Number,
  }],
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User;
