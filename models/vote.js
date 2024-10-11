const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    pollId: { type: Schema.Types.ObjectId, ref: 'poll', required: true },//reference to the poll
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },//refer to user
});

module.exports = mongoose.model('vote', voteSchema);