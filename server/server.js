const userRouter = require('./routers/userRouter.js');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const uri = "mongodb+srv://onlyuser:onlyone@swopcluster.di2gwcm.mongodb.net/?retryWrites=true&w=majority";

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(uri)

const productRoutes = require('./routes/products/products')
const userRoutes = require('./routes/users/users')
app.use(productRoutes);
app.use(userRoutes);
app.use('/api/users', userRouter);

app.listen(5000, () => console.log(`Listening on port ${5000}`));
