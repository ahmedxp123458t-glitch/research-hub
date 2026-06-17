const express = require('express');
const router = express.Router();
const ResearchGroup = require('../models/ResearchGroup');

router.get('/', async (req, res) => {
  try {
    const groups = await ResearchGroup.find().sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const group = await ResearchGroup.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const group = new ResearchGroup(req.body);
    const saved = await group.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const group = await ResearchGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ResearchGroup.findByIdAndDelete(req.params.id);
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
