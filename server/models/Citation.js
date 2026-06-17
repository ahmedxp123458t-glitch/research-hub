const mongoose = require('mongoose');

const citationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: '' },
  year: { type: Number },
  journal: { type: String, default: '' },
  doi: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Citation', citationSchema);
