const StateRecipe = require('../models/StateRecipe');
const Recipe = require('../models/Recipe');

// Get all state recipes
exports.getAllStateRecipes = async (req, res) => {
  try {
    const stateRecipes = await StateRecipe.find();
    res.json(stateRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get personalized recipes for a user
exports.getPersonalizedRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await Recipe.find({ owner: userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create personalized recipe
exports.createPersonalizedRecipe = async (req, res) => {
  try {
    const { title, region, description, keywords } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const recipe = new Recipe({
      owner: req.user.id,
      title,
      region: region || 'Unknown',
      description,
      keywords: keywords || []
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete personalized recipe
exports.deletePersonalizedRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.owner.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this recipe' });
    }

    await Recipe.findByIdAndDelete(id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
