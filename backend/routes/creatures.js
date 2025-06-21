const express = require('express');
const router = express.Router();
const Creature = require('../models/Creature');

// GET all creatures
router.get('/', async (req, res) => {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new creature
router.post('/', async (req, res) => {
  const creature = new Creature({
    name: req.body.name,
    type: req.body.type,
    abilities: req.body.abilities,
    origin: req.body.origin,
    associatedMyths: req.body.associatedMyths
  });

  try {
    const newCreature = await creature.save();
    res.status(201).json(newCreature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update creature
router.put('/:id', async (req, res) => {
  try {
    const updatedCreature = await Creature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCreature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE creature
router.delete('/:id', async (req, res) => {
  try {
    const deletedCreature = await Creature.findByIdAndDelete(req.params.id);
    res.json({ message: "Creature deleted", data: deletedCreature });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
