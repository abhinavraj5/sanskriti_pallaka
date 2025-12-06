const express = require('express');
const { getAllStateRecipes, getPersonalizedRecipes, createPersonalizedRecipe, deletePersonalizedRecipe, likeStateRecipe, likePersonalizedRecipe } = require('../controllers/foodRecipeController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// State recipes (public)
router.get('/state-recipes', getAllStateRecipes);

// Personalized recipes (protected)
router.get('/my-recipes', requireAuth, getPersonalizedRecipes);
router.post('/my-recipes', requireAuth, createPersonalizedRecipe);
router.delete('/my-recipes/:id', requireAuth, deletePersonalizedRecipe);
// Likes
router.post('/state-recipes/:id/like', requireAuth, likeStateRecipe);
router.post('/my-recipes/:id/like', requireAuth, likePersonalizedRecipe);

module.exports = router;
