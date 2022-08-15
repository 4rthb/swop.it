const express = require('express')
const router = express.Router()
const { registerUser, validateUser } = require('../../controllers/userController')

router.post('/register', async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if(registerUser(name, email, password))
  {
    // res.redirect('/');
    res.send({status: 'success'});
  }
  else 
  {
    res.send({status: 'fail'});
  }
})

router.post('/', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  
  switch (validateUser(email, password)){
    case 0:
      res.redirect('/marketplace');
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
