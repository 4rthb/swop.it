import { products } from './controllers/productController';
import { validateUser } from './controllers/userController';

const express = require('express');

const app = express();

app.post('/', (req, res) => {
  // validating user
  const { username, password } = req.body;
  if(validateUser(username, password)) res.redirect('/marketplace');
  else res.send('Invalid user info!');
});

app.post('marketplace/new', (req, res) => {
  const { username, productname } = req.body
  // ...
});

app.get('/marketplace', (req, res) => {
  // get data from products.json and send it to marketplace
  res.json(products);
});

app.listen(5000, () => console.log(`Listening on port ${5000}`));