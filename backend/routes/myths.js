const express = require('express');
const router = express.Router();
const Myth = require('../models/Myth');

/**
 * @swagger
 * /api/myths:
 *   get:
 *     summary: Get all myths
 *     tags:
 *       - Myths
 *     responses:
 *       200:
 *         description: A list of myths
 */
router.get('/', async (req, res) => {
  try {
    const myths = await Myth.find();
    res.json(myths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/myths:
 *   post:
 *     summary: Create a new myth
 *     tags:
 *       - Myths
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               charactersInvolved:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Myth created
 */
router.post('/', async (req, res) => {
  const myth = new Myth(req.body);
  try {
    const newMyth = await myth.save();
    res.status(201).json(newMyth);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/myths/{id}:
 *   put:
 *     summary: Update a myth by ID
 *     tags:
 *       - Myths
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The myth ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Myth updated
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedMyth = await Myth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMyth);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/myths/{id}:
 *   delete:
 *     summary: Delete a myth by ID
 *     tags:
 *       - Myths
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The myth ID
 *     responses:
 *       200:
 *         description: Myth deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedMyth = await Myth.findByIdAndDelete(req.params.id);
    res.json({ message: 'Myth deleted', data: deletedMyth });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
