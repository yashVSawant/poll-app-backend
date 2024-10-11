const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  votes: [{ type: Number, required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] //refer to comments
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;

