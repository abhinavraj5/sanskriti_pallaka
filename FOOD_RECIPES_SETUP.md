# Setup Instructions for Food Recipes Feature

## Quick Start

### 1. Backend Setup

#### a. Install Dependencies (if not already done)
```bash
cd backend
npm install
```

#### b. Seed the Database with State Recipes
```bash
node seed.js
```
This will populate the StateRecipe collection with all 36 Indian state traditional recipes.

#### c. Start Backend Server
```bash
npm start
# or
node server.js
```
Server should be running on `http://localhost:5000`

### 2. Frontend Setup

#### a. Install Dependencies (if not already done)
```bash
cd frontend
npm install
```

#### b. Start Frontend Development Server
```bash
npm run dev
```
Frontend should be running on `http://localhost:5173` (or similar)

### 3. Access the Feature

1. Open your browser and go to `http://localhost:5173`
2. Navigate to the Dashboard
3. Click on "Food Recipes" card under "Explore" section
4. Or directly go to `http://localhost:5173/food-recipes`

### 4. Test the Features

#### View Traditional Recipes (No Login Required)
- All 36 state recipes are displayed with state name, food name, and description
- Click "Watch Recipe" to view the YouTube video link

#### Add Personalized Recipes (Login Required)
1. Login with your account
2. Navigate to Food Recipes page
3. Click "Add Recipe" button
4. Fill in the form:
   - **Recipe Title**: Name of your recipe
   - **Region/State**: Origin region (e.g., "Bengal", "Rajasthan")
   - **Description**: Detailed recipe including ingredients and steps
5. Click "Save Recipe"
6. Your recipe will appear in "My Personalized Recipes" section

#### Delete Personalized Recipes
1. In "My Personalized Recipes" section
2. Click "Delete" button on the recipe card
3. Confirm the deletion

## Files Created/Modified

### Created Files:
- `backend/models/StateRecipe.js` - StateRecipe schema
- `backend/controllers/foodRecipeController.js` - Food recipe controllers
- `backend/routes/foodRecipeRoutes.js` - Food recipe routes
- `backend/seed.js` - Database seeding script
- `frontend/src/pages/FoodRecipes.jsx` - Main food recipes page

### Modified Files:
- `backend/server.js` - Added food recipe routes
- `frontend/src/services/api.js` - Added foodRecipesAPI
- `frontend/src/App.jsx` - Added /food-recipes route
- `frontend/src/pages/Dashboard.jsx` - Updated Food Recipes link

## Troubleshooting

### "Failed to load recipes" error
- Ensure backend is running on `http://localhost:5000`
- Check that MongoDB is connected
- Check browser console for detailed error

### State recipes not showing
- Run `node seed.js` to populate the database
- Check MongoDB connection in backend logs

### Cannot add personalized recipes
- Ensure you are logged in (check localStorage for user token)
- Check browser console for validation errors
- Ensure all required fields are filled

### "Not authorized" error
- Clear localStorage and login again
- Check that your token is valid

## API Endpoints

### Public Endpoints
- `GET /api/food-recipes/state-recipes` - Get all state recipes

### Protected Endpoints (Require Authentication)
- `GET /api/food-recipes/my-recipes` - Get user's personalized recipes
- `POST /api/food-recipes/my-recipes` - Create new personalized recipe
- `DELETE /api/food-recipes/my-recipes/:id` - Delete personalized recipe

## Testing with cURL or Postman

### Get All State Recipes
```bash
curl http://localhost:5000/api/food-recipes/state-recipes
```

### Create Personalized Recipe (requires token)
```bash
curl -X POST http://localhost:5000/api/food-recipes/my-recipes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Biryani",
    "region": "Hyderabadi",
    "description": "Traditional biryani with basmati rice and mutton",
    "keywords": ["biryani", "rice", "mutton"]
  }'
```

## Next Steps / Future Enhancements

1. **Search & Filter**: Add search functionality to filter recipes by state or title
2. **Recipe Details**: Expand to show full recipe with ingredients and instructions
3. **Images**: Add recipe photos
4. **Ratings**: Let users rate recipes
5. **Comments**: Add comments/reviews section
6. **Export**: Generate PDF of recipes
7. **Favorites**: Save favorite recipes

## Support

For issues or questions, check the logs:
- Backend logs: Terminal where `npm start` is running
- Frontend logs: Browser Developer Console (F12)
