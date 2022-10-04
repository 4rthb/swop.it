const express = require("express");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel.js');
const Item = require('../models/itemModel.js');
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
        isAdmin: user.isAdmin,
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
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      isAdmin: false,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: user.isAdmin,
      token: generateToken(createdUser),
    });
  })
)

userRouter.get(
  '/search',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const searchQuery = req.body.query;
    const users = await User.find({
      $or: [{
        name: new RegExp(searchQuery, 'i')
      }, {
        email: new RegExp(searchQuery, 'i')
      }, {
        address: new RegExp(searchQuery, 'i')
      }]
    });

    res.send(users);
  }));

userRouter.get(
  '/:userId/items',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const items = await Item.find({
      currentState: "AVAILABLE",
      owner: userId
    });
    res.send(items);
  }));

userRouter.get(
  '/inventory',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const items = await Item.find({
      owner: req.user._id
    });
    res.send(items);
  }));

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
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
        address: user.address,
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

userRouter.get(
  '/desiredOwner/:id',
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      res.send({
        name: user.name,
        address: user.address,
        ratingList: user.ratingList,
      });
    } else {
      res.status(404).send({
        message: "Usuário Inválido."
      });
    }
  })
);

module.exports = userRouter
