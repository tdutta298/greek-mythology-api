const express = require('express');
const router = express.Router();
const God = require('../models/God');

// GET all gods
router.get('/', async (req, res) => {
  try {
    const gods = await God.find();
    res.json(gods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new god
router.post('/', async (req, res) => {
  const god = new God({
    name: req.body.name,
    domain: req.body.domain,
    symbols: req.body.symbols,
    parents: req.body.parents,
    romanEquivalent: req.body.romanEquivalent,
    associatedMyths: req.body.associatedMyths,
  });

  try {
    const newGod = await god.save();
    res.status(201).json(newGod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update god
router.put('/:id', async (req, res) => {
  try {
    const updatedGod = await God.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE god
router.delete('/:id', async (req, res) => {
  try {
    const deletedGod = await God.findByIdAndDelete(req.params.id);
    res.json({ message: "God deleted", data: deletedGod });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
