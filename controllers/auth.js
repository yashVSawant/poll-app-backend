const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


exports.login = asyncErrorHandler(async(req,res)=>{
        const {email , password} = req.body;
        if(!email || !password)throw new ApiError("invalid input!" ,400);
        const user = await User.findOne({email:email}); // finding user
        if(!user)throw new ApiError("Invalid credentials!" ,404);
        const isMatch = await bcrypt.compare(password,user.password); // checking if password matches 
        if(!isMatch)throw new ApiError("Invalid credentials!" ,401);
        res.status(200).json({success:true ,message:'User login succesfull',token:generateAccessToken(user._id,user.name)})

})

exports.register = asyncErrorHandler(async(req,res)=>{
        const {email ,name , password} = req.body;
        if(!email || !name || !password)throw new ApiError("invalid input!" ,400);
        const isExist = await User.findOne({email : email}); // checking if user exist 
        if(isExist)throw new ApiError("email already exist!" ,400)
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound); //generating salt
        const hash = await bcrypt.hash(password ,salt); // creating hash
        await User.create({email:email,name:name ,password:hash}); // creating user
        res.status(201).json({success:true , message:"successfully signup!"});
})

function generateAccessToken(id,name){
    return jwt.sign({_id:id , name:name},process.env.TOKEN_KEY);
}