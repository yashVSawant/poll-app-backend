const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  votes: [{ type: Number, required: true }],
  userId: { type: Schema.Types.ObjectId, ref: 'user' } //refer to comments
},{
    timestamps: true  //Automatically adding timestamps
});

module.exports = mongoose.model('poll', pollSchema);

