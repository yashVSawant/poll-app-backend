const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    pollId: { type: Schema.Types.ObjectId, ref: 'poll' }, //Reference to the poll
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },  //Reference to the user
    text: { type: String, required: true },  //comment text
    replies: [{ type: Schema.Types.ObjectId, ref: 'comment' }]  //replies 
}, {
    timestamps: true  //Automatically adding timestamps
});
  
module.exports = mongoose.model('comment', commentSchema);
  