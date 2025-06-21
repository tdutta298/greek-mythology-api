const mongoose = require('mongoose');

const godSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  domain: [String],
  symbols: [String],
  parents: [String],
  romanEquivalent: String,
  associatedMyths: [String]
});

module.exports = mongoose.model('God', godSchema);
