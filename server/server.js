const express = require('express');
const cors = require('cors');
var fs = require('fs');
var users_data = fs.readFileSync('./models/users.json');
var users = JSON.parse(users_data);

//console.log(users);

const app = express();
app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({
    "users": ["one", "two", "three", "five"]
  });
});

const userRoutes = require('./routes/users/users')
app.use(userRoutes);

app.listen(5000, () => console.log(`Listening on port ${5000}`));
