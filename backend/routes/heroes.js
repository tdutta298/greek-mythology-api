const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// GET all heroes
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new hero
router.post('/', async (req, res) => {
  const hero = new Hero({
    name: req.body.name,
    parentage: req.body.parentage,
    heroicDeeds: req.body.heroicDeeds,
    associatedMyths: req.body.associatedMyths,
    fate: req.body.fate
  });

  try {
    const newHero = await hero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update hero
router.put('/:id', async (req, res) => {
  try {
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE hero
router.delete('/:id', async (req, res) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: "Hero deleted", data: deletedHero });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
