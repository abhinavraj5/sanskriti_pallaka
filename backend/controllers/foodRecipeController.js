const StateRecipe = require('../models/StateRecipe');
const Recipe = require('../models/Recipe');

// Get all state recipes
exports.getAllStateRecipes = async (req, res) => {
  try {
    // Return state recipes ordered by likes (descending) so recommended items appear first
    const stateRecipes = await StateRecipe.find().sort({ likes: -1, createdAt: -1 });
    res.json(stateRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get personalized recipes for a user
exports.getPersonalizedRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    // Order user's personalized recipes by likes so top liked recipes surface first
    const recipes = await Recipe.find({ owner: userId }).sort({ likes: -1, createdAt: -1 });
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

    // Normalize description for duplicate detection: remove punctuation, extra spaces and lowercase
    const normalize = (text) =>
      String(text || '')
        .replace(/[\u2018\u2019\u201C\u201D]/g, "'") // normalize smart quotes
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    const newDesc = normalize(description);

    // Check if the same user already has a recipe with identical (normalized) description
    const existing = await Recipe.find({ owner: req.user.id });
    if (existing && existing.length) {
      const dup = existing.find(r => normalize(r.description) === newDesc);
      if (dup) {
        return res.status(409).json({ error: 'A recipe with the same description already exists' });
      }
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

// Toggle like for a state recipe (requires auth)
exports.likeStateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const recipe = await StateRecipe.findById(id);
    if (!recipe) return res.status(404).json({ error: 'State recipe not found' });

    const already = recipe.likedBy?.some(u => u.toString() === userId.toString());
    if (already) {
      // unlike
      recipe.likedBy = recipe.likedBy.filter(u => u.toString() !== userId.toString());
      recipe.likes = Math.max(0, (recipe.likes || 1) - 1);
    } else {
      recipe.likedBy = recipe.likedBy || [];
      recipe.likedBy.push(userId);
      recipe.likes = (recipe.likes || 0) + 1;
    }

    await recipe.save();
    res.json({ likes: recipe.likes, liked: !already });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle like for a personalized recipe (requires auth)
exports.likePersonalizedRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    const already = recipe.likedBy?.some(u => u.toString() === userId.toString());
    if (already) {
      recipe.likedBy = recipe.likedBy.filter(u => u.toString() !== userId.toString());
      recipe.likes = Math.max(0, (recipe.likes || 1) - 1);
    } else {
      recipe.likedBy = recipe.likedBy || [];
      recipe.likedBy.push(userId);
      recipe.likes = (recipe.likes || 0) + 1;
    }

    await recipe.save();
    res.json({ likes: recipe.likes, liked: !already });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
