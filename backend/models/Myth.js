const mongoose = require('mongoose');

const mythSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  summary: String,
  charactersInvolved: [String],
  locations: [String],
  moral: String,
  source: String
});

module.exports = mongoose.model('Myth', mythSchema);
