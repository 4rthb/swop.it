const express = require('express')
const router = express.Router()
const { registerProduct, getProducts } = require('../../controllers/productController')


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
  res.json(getProducts());
})

module.exports = router
