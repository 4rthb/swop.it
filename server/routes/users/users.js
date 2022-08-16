const express = require('express')
const router = express.Router()
const path = require('path')
var fs = require('fs');
const { registerUser, validateUser } = require('../../controllers/userController')

router.post('/register', async (req, res) => {
  users_data = fs.readFileSync('./models/users.json');
  users = JSON.parse(users_data);
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var alreadyTaken = false;

  Object.entries(users).forEach((entry) => {
    const [key, value] = entry;
    if(email === key){
      alreadyTaken = true
    }
  });

  if(alreadyTaken){
    reply = {
      name: name,
      email: email,
      status: 'fail'
    };
    res.send(reply);
  }else{
    users[email] = {name,password}
    var data = JSON.stringify(users, null, 2);
    fs.writeFile('././models/users.json', data, finished);

    function finished(err) {
      reply = {
        name: name,
        email: email,
        status: 'success'
      };
      res.send(reply);
    }
  }
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
