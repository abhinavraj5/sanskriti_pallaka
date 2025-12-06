const mongoose = require('mongoose');
require('dotenv').config();

const StateRecipe = require('./models/StateRecipe');
const stateRecipesData = require('./data/stateRecipesData');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await StateRecipe.deleteMany({});
    console.log('Cleared existing state recipes');

    // Insert new data
    await StateRecipe.insertMany(stateRecipesData);
    console.log('State recipes seeded successfully!');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
