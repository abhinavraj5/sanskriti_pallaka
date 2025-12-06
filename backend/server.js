const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const craftRoutes = require('./routes/craftRoutes');
const tourRoutes = require('./routes/tourRoutes');
const musicRoutes = require('./routes/musicRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const foodRecipeRoutes = require('./routes/foodRecipeRoutes');
const { optionalAuth } = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Optional auth: attaches req.user when Authorization header with valid token is present
app.use(optionalAuth);

app.get('/', (req, res) => {
  res.json({ message: 'Sanskriti Paalaka API running' });
});

app.use('/api/users', userRoutes);
app.use('/api/crafts', craftRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/food-recipes', foodRecipeRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Auto-seed state recipes if none exist
    try {
      const StateRecipe = require('./models/StateRecipe');
      const stateRecipesData = require('./data/stateRecipesData');

      const count = await StateRecipe.countDocuments();
      if (count === 0) {
        await StateRecipe.insertMany(stateRecipesData);
        console.log('Auto-seeded state recipes');
      } else {
        console.log(`State recipes already present: ${count}`);
      }
    } catch (seedErr) {
      console.error('Auto-seed error:', seedErr.message || seedErr);
    }

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('MongoDB error:', err));
