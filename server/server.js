const userRouter = require('./routers/userRouter.js');
const itemRouter = require('./routers/itemRouter.js');
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

app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);

app.listen(5000, () => console.log(`Listening on port ${5000}`));
