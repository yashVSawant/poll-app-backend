const express =  require('express');

const mongoose = require('mongoose');
require('dotenv').config();

const app =  express();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("running!")
    })
})