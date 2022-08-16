const path = require('path')
var fs = require('fs');

function registerProduct(date, email, product, productID)
{
  products_data = fs.readFileSync('./models/products.json');
  products = JSON.parse(products_data);
  
  products[productID] = { product, email, date }
  var data = JSON.stringify(products, null, 2);
  fs.writeFile('./models/products.json', data, finished);
  function finished(err) {
    if(err) 
    { 
      console.log("Error reading json files");
      return false;
    }
  }
  return true;
}

function getProducts()
{
  products_data = fs.readFileSync('./models/products.json');
  return JSON.parse(products_data);
}

module.exports = { registerProduct, getProducts }