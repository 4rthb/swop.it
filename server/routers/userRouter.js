const express = require("express");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel.js');
const {generateToken} = require('../utils.js');

const userRouter = express.Router();

userRouter.post('/signin',expressAsyncHandler(async (req,res) => {
  const user = await User.findOne({email:req.body.email});

  if(user){
    if(bcrypt.compareSync(req.body.password, user.password)){
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
      return ;
    }else{
      res.status(401).send({message:"Senha inválida."});
    }
  }else{
    res.status(401).send({message:"Usuário não existente."});
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
      email: req.body.email,
      email: req.body.email,
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

module.exports = userRouter
