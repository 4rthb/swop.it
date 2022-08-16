const express = require('express');
const cors = require('cors');

//console.log(users);

const app = express();
app.use(cors())
app.use(express.json())

const productRoutes = require('./routes/products/products')
const userRoutes = require('./routes/users/users')
app.use(productRoutes);
app.use(userRoutes);

app.listen(5000, () => console.log(`Listening on port ${5000}`));
