const express = require('express');
var fs = require('fs');
var users_data = fs.readFileSync('./models/users.json');
var users = JSON.parse(users_data);
const cors = require('cors');

console.log(users);

const app = express();
app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({
    "users": ["one", "two", "three", "five"]
  });
});

app.post('/api/registerUser', async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  users[email] = {name,password}
  var data = JSON.stringify(users, null, 2);
  fs.writeFile('./models/users.json', data, finished);

  function finished(err) {
    reply = {
      name: name,
      email: email,
      status: 'success'
    };
    res.send(reply);
  }
})

app.post('/api/loginUser', async (req, res) => {
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
    }else{
      validated = false;
    }

    if(validated){
      reply = {
        status: 'success'
      };
      res.send(reply);
    }else{
      reply = {
        status: 'fail'
      };
      res.send(reply);
    }
  });
})

app.listen(5000, () => console.log(`Listening on port ${5000}`));
