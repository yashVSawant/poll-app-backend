const Vote = require("../models/vote");
const Poll = require("../models/poll");

const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.postVote = asyncErrorHandler(async(req,res)=>{
        const { pollId } = req.params; 
        const { optionIndex } = req.body; 
        const userId = req.user._id; 
        // Check if the user has already voted on this poll
        const existingVote = await Vote.findOne({ pollId, userId });
        if (existingVote)throw new ApiError("You have already voted on this poll" ,403)

        const poll = await Poll.findById(pollId);
        if (!poll)throw new ApiError("Poll not found!" ,404)
        if (optionIndex < 0 || optionIndex >= poll.options.length)throw new ApiError("Invalid option selected!" ,400)
        poll.votes[optionIndex] += 1;
        const pollSavePromise = poll.save();  
        const voteCreatePromise = Vote.create({ pollId: pollId, userId }); 

        // Await both promises in parallel
        await Promise.all([pollSavePromise, voteCreatePromise]);
        
        res.status(200).json({ success:true });
});

