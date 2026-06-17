const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.groupId) filter.groupId = req.query.groupId;
    const discussions = await Discussion.find(filter).sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const disc = new Discussion(req.body);
    const saved = await disc.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/:id/reply', async (req, res) => {
  try {
    const disc = await Discussion.findById(req.params.id);
    if (!disc) return res.status(404).json({ message: 'Discussion not found' });
    disc.replies.push(req.body);
    await disc.save();
    res.json(disc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Discussion deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
