const User = require("../models/user");

const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getUser = asyncErrorHandler(async(req,res)=>{
    const user = await User.findById(req.user._id).select(["name email imageUrl"]);
    res.status(201).json({success:true,user:user})
});

exports.uploadPhoto = asyncErrorHandler(async(req,res)=>{
    const {id} = req.user;
    const getfile = req.file;
    if(isNullValue(id))throw new ApiError('invalid input!' ,400)
    const filename = `profilePhotos/${id}.jpg`;
    const imageUrl = await s3Services.uploadToS3(getfile,filename);
    await userData.update({imageUrl:imageUrl},{where:{userId:id}});
    res.status(201).json({success:true,imageUrl:imageUrl});

})
