const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.groupId) filter.groupId = req.query.groupId;
    const progress = await Progress.find(filter).sort({ updatedAt: -1 });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const prog = new Progress(req.body);
    const saved = await prog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const prog = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(prog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);
    res.json({ message: 'Progress deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
