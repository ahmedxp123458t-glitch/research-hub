const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchGroup', required: true },
  title: { type: String, required: true },
  fileUrl: { type: String, default: '' },
  uploadedBy: { type: String, default: '' },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);
