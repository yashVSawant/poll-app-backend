const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true }, //Reference to the poll
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  //Reference to the user
    text: { type: String, required: true },  //comment text
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]  //replies 
}, {
    timestamps: true  //Automatically adding timestamps
});
  
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
  