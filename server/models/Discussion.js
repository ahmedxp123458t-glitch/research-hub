const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchGroup', required: true },
  userId: { type: String, required: true },
  message: { type: String, required: true },
  replies: [{ userId: String, text: String, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Discussion', discussionSchema);
