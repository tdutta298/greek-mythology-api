const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

/**
 * @swagger
 * /api/heroes:
 *   get:
 *     summary: Get all heroes
 *     tags:
 *       - Heroes
 *     responses:
 *       200:
 *         description: A list of heroes
 */
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/heroes:
 *   post:
 *     summary: Create a new hero
 *     tags:
 *       - Heroes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parentage:
 *                 type: string
 *               heroicDeeds:
 *                 type: array
 *                 items:
 *                   type: string
 *               associatedMyths:
 *                 type: array
 *                 items:
 *                   type: string
 *               fateOrDeath:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hero created successfully
 */
router.post('/', async (req, res) => {
  const hero = new Hero(req.body);
  try {
    const newHero = await hero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/heroes/{id}:
 *   put:
 *     summary: Update a hero by ID
 *     tags:
 *       - Heroes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hero ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Hero updated successfully
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/heroes/{id}:
 *   delete:
 *     summary: Delete a hero by ID
 *     tags:
 *       - Heroes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hero ID
 *     responses:
 *       200:
 *         description: Hero deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hero deleted', data: deletedHero });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
