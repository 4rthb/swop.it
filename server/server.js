const userRouter = require('./routers/userRouter.js');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const uri = "mongodb+srv://onlyuser:onlyone@swopcluster.di2gwcm.mongodb.net/?retryWrites=true&w=majority";

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config();

mongoose.connect(uri)

const productRoutes = require('./routes/products/products')
app.use(productRoutes);
app.use('/api/users', userRouter);

app.listen(5000, () => console.log(`Listening on port ${5000}`));
