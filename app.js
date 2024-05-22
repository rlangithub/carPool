require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const driverRouter = require('./routes/driver');
const driveRouter = require('./routes/drive');

const app = express();

app.use(bodyParser.json());
app.use('/driver', driverRouter);
app.use('/drive', driveRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));
