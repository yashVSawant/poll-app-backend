const Comment = require("../models/comments");
const Poll = require("../models/poll")

const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.postComment = asyncErrorHandler(async(req,res)=>{
        const { pollId } = req.params;
        const { text } = req.body;
    
        const comment = await Comment.create({pollId ,userId:req.user._id , text});
        res.status(201).json({ message: 'Comment added', comment });
});

exports.postReply = asyncErrorHandler(async(req,res)=>{
    const { commentId } = req.params;
    const { text } = req.body;

    //create reply
    const reply = await Comment.create({pollId: null, userId:req.user._id, text});

    // Update the parent comment with the reply
    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: reply._id }
    });

    res.status(201).json({ message: 'Reply added', reply });
})

exports.getComments = asyncErrorHandler(async(req,res)=>{
    const pollId = req.params.pollId;

    const pollComments = await Comment.find({ pollId }) // Find comments for the specific poll
    .populate('userId', 'name email') // Populate user info for each comment
    .populate({
      path: 'replies', // Populate replies
      populate: { // Further populate user info for replies
        path: 'userId', // Assuming replies have a userId field
        select: 'name email'
      }
    })
    .exec();

    res.status(201).json({success:true , comments:pollComments})
    

})
