const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: String,
  abilities: [String],
  origin: String,
  associatedMyths: [String]
});

module.exports = mongoose.model('Creature', creatureSchema);
