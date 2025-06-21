const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  parentage: [String],
  heroicDeeds: [String],
  associatedMyths: [String],
  fate: String
});

module.exports = mongoose.model('Hero', heroSchema);
