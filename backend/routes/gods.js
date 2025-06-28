const express = require('express');
const router = express.Router();
const God = require('../models/God');

/**
 * @swagger
 * /api/gods:
 *   get:
 *     summary: Get all Greek gods
 *     tags:
 *       - Gods
 *     responses:
 *       200:
 *         description: A list of gods
 */
router.get('/', async (req, res) => {
  try {
    const gods = await God.find();
    res.json(gods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/gods:
 *   post:
 *     summary: Create a new god
 *     tags:
 *       - Gods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Zeus
 *               domain:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Sky", "Thunder"]
 *               symbols:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Thunderbolt", "Eagle"]
 *               parents:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Cronus", "Rhea"]
 *               romanEquivalent:
 *                 type: string
 *                 example: Jupiter
 *               associatedMyths:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Titanomachy", "Olympus"]
 *     responses:
 *       201:
 *         description: God created successfully
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /api/gods/{id}:
 *   put:
 *     summary: Update a god by ID
 *     tags:
 *       - Gods
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The god's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               domain:
 *                 type: array
 *                 items:
 *                   type: string
 *               symbols:
 *                 type: array
 *                 items:
 *                   type: string
 *               romanEquivalent:
 *                 type: string
 *               associatedMyths:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: God updated successfully
 *       400:
 *         description: Invalid request
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedGod = await God.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/gods/{id}:
 *   delete:
 *     summary: Delete a god by ID
 *     tags:
 *       - Gods
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The god's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: God deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedGod = await God.findByIdAndDelete(req.params.id);
    res.json({ message: "God deleted", data: deletedGod });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
