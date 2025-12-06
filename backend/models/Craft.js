const mongoose = require('mongoose');

const craftSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  title: String,
  description: String,
  artisan: String,
  artist: String,
  price: Number,
  originCity: String,
  originState: String,
  origin: String,
  category: String,
  material: String,
  imageUrl: String,
  paymentScanner: String
});

// Add keywords and createdAt for keyword-only storage
craftSchema.add({
  keywords: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Craft', craftSchema);
