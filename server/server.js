import { products } from './controllers/productController';
import { validateUser } from './controllers/userController';

const express = require('express');
const cors = require('cors');
var fs = require('fs');
var users_data = fs.readFileSync('./models/users.json');
var users = JSON.parse(users_data);

//console.log(users);

const app = express();
app.use(cors())
app.use(express.json())

app.post('marketplace/new', (req, res) => {
  const { username, productname } = req.body
  // ...
});

app.get('/marketplace', (req, res) => {
  // get data from products.json and send it to marketplace
  res.json(products);
});

const userRoutes = require('./routes/users/users')
app.use(userRoutes);

app.listen(5000, () => console.log(`Listening on port ${5000}`));
