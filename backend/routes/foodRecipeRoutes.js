const express = require('express');
const { getAllStateRecipes, getPersonalizedRecipes, createPersonalizedRecipe, deletePersonalizedRecipe } = require('../controllers/foodRecipeController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// State recipes (public)
router.get('/state-recipes', getAllStateRecipes);

// Personalized recipes (protected)
router.get('/my-recipes', requireAuth, getPersonalizedRecipes);
router.post('/my-recipes', requireAuth, createPersonalizedRecipe);
router.delete('/my-recipes/:id', requireAuth, deletePersonalizedRecipe);

module.exports = router;
