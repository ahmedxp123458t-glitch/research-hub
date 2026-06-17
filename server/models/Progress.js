const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchGroup', required: true },
  milestone: { type: String, required: true },
  percentage: { type: Number, default: 0, min: 0, max: 100 },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progress', progressSchema);
