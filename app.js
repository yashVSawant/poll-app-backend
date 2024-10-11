const express =  require('express');

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv').config();

const authRoute = require("./routes/auth");
const pollRoute = require("./routes/poll");
const voteRoute = require("./routes/vote");
const commentRoute = require("./routes/comment");
const userRoute = require ("./routes/user");

const {authenticate} = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler")

const app =  express();

app.use(cors('*'))
app.use(bodyParser.json());

app.use('/api/auth',authRoute);
app.use('/api/user',authenticate,userRoute);
app.use('/api/poll',authenticate,pollRoute);
app.use('/api/vote',authenticate,voteRoute);
app.use('/api/comment',authenticate,commentRoute);

app.use(errorHandler);

app.use((req,res)=>{
    res.status(404).json({message:"route not found!"})
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("running!")
    })
})