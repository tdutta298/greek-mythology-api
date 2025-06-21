const express = require('express');
const router = express.Router();
const Myth = require('../models/Myth');

// GET all myths
router.get('/', async (req, res) => {
  try {
    const myths = await Myth.find();
    res.json(myths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new myth
router.post('/', async (req, res) => {
  const myth = new Myth({
    title: req.body.title,
    summary: req.body.summary,
    charactersInvolved: req.body.charactersInvolved,
    locations: req.body.locations,
    moral: req.body.moral,
    source: req.body.source
  });

  try {
    const newMyth = await myth.save();
    res.status(201).json(newMyth);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update myth
router.put('/:id', async (req, res) => {
  try {
    const updatedMyth = await Myth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMyth);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE myth
router.delete('/:id', async (req, res) => {
  try {
    const deletedMyth = await Myth.findByIdAndDelete(req.params.id);
    res.json({ message: "Myth deleted", data: deletedMyth });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
