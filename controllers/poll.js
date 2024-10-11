const Poll = require("../models/poll");
const Vote = require("../models/vote")

const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.postPoll = asyncErrorHandler(async(req,res)=>{
    const { question, options } = req.body;
    
    if (!question || !options || options.length < 2) throw new ApiError("invalid input!" , 400);
       
    await Poll.create({ question, options, votes: Array(options.length).fill(0) ,userId:req.user._id});   
    res.status(201).json({success:true});
})

exports.getPolls = asyncErrorHandler(async(req,res)=>{
       
    const polls = await Poll.find().select(["question"]).sort({createdAt:-1}).limit(10);  
    res.status(200).json({success:true ,polls:polls});
})

exports.getPoll = asyncErrorHandler(async(req,res)=>{
    const {pollId} = req.params;
    const poll = await Poll.findById(pollId)  
    res.status(200).json({success:true ,poll:poll});
})

exports.getUserPolls = asyncErrorHandler(async(req,res)=>{ 
    const created = await Poll.find({userId:req.user._id}).select(["question"]).sort({createdAt:-1}).limit(10); 
    const votes = await Vote.find({ userId :req.user._id }).populate('pollId' ,'question');// Extract the populated polls
    const voted = votes.map(vote => vote.pollId); 
    res.status(200).json({success:true ,created , voted});
});
