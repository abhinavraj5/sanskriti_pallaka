const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: String,
  description: String,
  places: [String],
  keywords: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tour', tourSchema);
