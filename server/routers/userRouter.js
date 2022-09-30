const express = require("express");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel.js');
const {
  generateToken,
  isAuth
} = require('../utils.js');

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
      return;
    } else {
      res.status(401).send({
        message: "Senha inválida."
      });
    }
  } else {
    res.status(401).send({
      message: "Usuário não existente."
    });
  }
}));

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      adress: req.body.adress,
      phoneNumber: req.body.phoneNumber,
      isAdmin: false,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser),
    });
  })
)

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.adress = req.body.adress || user.adress;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.send({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        adress: user.adress,
        isAdmin: user.isAdmin,
        ratingList: user.ratingList,
      });
    } else {
      res.status(404).send({
        message: "Acesso Inválido."
      });
    }
  })
);

module.exports = userRouter
