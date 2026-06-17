const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.groupId) filter.groupId = req.query.groupId;
    const docs = await Document.find(filter).sort({ uploadedAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const doc = new Document(req.body);
    const saved = await doc.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
