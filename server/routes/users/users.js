const express = require('express')
const router = express.Router()
const path = require('path')
var fs = require('fs');


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
      console.log(email);
      console.log(key);
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
  users_data = fs.readFileSync('././models/users.json');
  users = JSON.parse(users_data);

  var email = req.body.email;
  var password = req.body.password;
  var validated = false;

  Object.entries(users).forEach((entry) => {
    const [key, value] = entry;

    if(email === key){
      if(value['password'] === password){
        validated = true;
      }else{
        validated = false;
      }
    }
  });

  reply = {
    status: validated ? 'success':'fail'
  };
  res.send(reply);
})

module.exports = router
