const express = require('express');
const router = express.Router();
const Creature = require('../models/Creature');

/**
 * @swagger
 * /api/creatures:
 *   get:
 *     summary: Get all creatures
 *     tags:
 *       - Creatures
 *     responses:
 *       200:
 *         description: A list of creatures
 */
router.get('/', async (req, res) => {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/creatures:
 *   post:
 *     summary: Create a new creature
 *     tags:
 *       - Creatures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               powers:
 *                 type: array
 *                 items:
 *                   type: string
 *               associatedMyths:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Creature created successfully
 */
router.post('/', async (req, res) => {
  const creature = new Creature(req.body);
  try {
    const newCreature = await creature.save();
    res.status(201).json(newCreature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/creatures/{id}:
 *   put:
 *     summary: Update a creature by ID
 *     tags:
 *       - Creatures
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The creature ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Creature updated
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedCreature = await Creature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCreature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/creatures/{id}:
 *   delete:
 *     summary: Delete a creature by ID
 *     tags:
 *       - Creatures
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The creature ID
 *     responses:
 *       200:
 *         description: Creature deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedCreature = await Creature.findByIdAndDelete(req.params.id);
    res.json({ message: 'Creature deleted', data: deletedCreature });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
