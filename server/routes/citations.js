const express = require('express');
const router = express.Router();
const Citation = require('../models/Citation');

router.get('/', async (req, res) => {
  try {
    const citations = await Citation.find().sort({ year: -1 });
    res.json(citations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const citation = await Citation.findById(req.params.id);
    if (!citation) return res.status(404).json({ message: 'Citation not found' });
    res.json(citation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const citation = new Citation(req.body);
    const saved = await citation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const citation = await Citation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(citation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Citation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Citation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
