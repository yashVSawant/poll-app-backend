const express =  require('express');

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require("./routes/auth");

const app =  express();

app.use(bodyParser.json());

app.use('/api/auth',authRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("running!")
    })
})