const mongoose = require('mongoose');

const stateRecipeSchema = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  foodName: { type: String, required: true },
  description: { type: String, required: true },
  videoLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StateRecipe', stateRecipeSchema);
