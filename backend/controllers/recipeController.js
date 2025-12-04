const Recipe = require('../models/Recipe');

exports.getAll = async (req, res) => {
  // If user is authenticated, return only their recipes (personalized dashboard)
  const filter = req.user ? { owner: req.user._id } : {};
  const recipes = await Recipe.find(filter);
  res.json(recipes);
};

exports.create = async (req, res) => {
  // If client provided keywords, store only keywords (keyword-only mode)
  const owner = req.user ? req.user._id : undefined;
  if (req.body && Array.isArray(req.body.keywords)) {
    const payload = { keywords: req.body.keywords };
    if (owner) payload.owner = owner;
    const recipe = await Recipe.create(payload);
    return res.status(201).json(recipe);
  }
  const payload = { ...req.body };
  if (owner) payload.owner = owner;
  const recipe = await Recipe.create(payload);
  res.status(201).json(recipe);
};
