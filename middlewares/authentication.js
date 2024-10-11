const jwt = require('jsonwebtoken');
require('dotenv').config();

const ApiError = require("../utils/ApiError");
const asycnErrorHandler = require("../utils/asyncErrorHandler")

const authenticate = asycnErrorHandler(async(req,res,next)=>{
        const fullToken = req.header('Authorization');
        if(!fullToken)throw new ApiError("invalid token!" , 400);
        const token = fullToken.split("Bearer ")[1];
        const user = jwt.verify(token,process.env.TOKEN_KEY);
        if(!user)throw new ApiError("invalid token!" ,400)
        req.user = user;
        next();
})

module.exports = {authenticate};