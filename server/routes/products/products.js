const express = require('express')
const router = express.Router()
const { registerProduct, getProducts } = require('../../controllers/userController')


router.post('/marketplace/new', async (req, res) => {
  var date = req.body.date;
  var email = req.body.email;
  var product = [ req.body.product, req.body.description ];
  var productID = req.body.productID;

  if(registerProduct(date, email, product, productID))
  {
    res.send({status: 'success'});
  }
  else 
  {
    res.send({status: 'fail'});
  }
})

router.get('/marketplace', async (req, res) => {
  products_data = fs.readFileSync('././models/products.json');
  products = JSON.parse(products_data);

  res.JSON(getProducts());
})

module.exports = router
