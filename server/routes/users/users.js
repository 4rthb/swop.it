const express = require('express')
const router = express.Router()
const path = require('path')
var fs = require('fs');
const { registerUser, validateUser } = require('../../controllers/userController')

router.post('/register', async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if(registerUser(name, email, password))
  {
    reply = {
      name: name,
      email: email,
      status: 'success'
    };
  }
  else
  {
    reply = {
      name: name,
      email: email,
      status: 'fail'
    };
  }
  res.send(reply);
})

router.post('/', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  switch (validateUser(email, password)){
    case 0:
      res.send({status: 'success', description: 'Authenticated'});
      break;
    case 1:
      res.send({status: 'fail', description: 'Wrong password'});
      break;
    case 2:
      res.send({status: 'fail', description: 'Unknown user'});
      break;
    default:
      res.send({status: 'fail', description: 'Unknown behavior'});
  }
})

module.exports = router
