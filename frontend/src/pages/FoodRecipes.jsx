import React, { useState, useEffect } from 'react';
import { foodRecipesAPI } from '../services/api';
import { FaTrash, FaPlus, FaPlay, FaHeart } from 'react-icons/fa';

const FoodRecipes = () => {
  const [stateRecipes, setStateRecipes] = useState([]);
  const [personalizedRecipes, setPersonalizedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    region: '',
    description: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError('');

      const [stateRes, personalizedRes] = await Promise.all([
        foodRecipesAPI.getStateRecipes(),
        user?.token ? foodRecipesAPI.getPersonalizedRecipes() : Promise.resolve({ data: [] })
      ]);

      setStateRecipes(stateRes.data || []);
      setPersonalizedRecipes(personalizedRes.data || []);
    } catch (err) {
      setError('Failed to load recipes: ' + (err.response?.data?.error || err.message));
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      setError('Please login to add personalized recipes');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      await foodRecipesAPI.createPersonalizedRecipe({
        title: formData.title,
        region: formData.region || 'Custom',
        description: formData.description,
        keywords: formData.title.split(' ')
      });

      setFormData({ title: '', region: '', description: '' });
      setShowAddForm(false);
      await fetchRecipes();
    } catch (err) {
      // If server indicates duplicate description, show friendlier message
      if (err.response?.status === 409) {
        setError(err.response.data?.error || 'This recipe already exists');
      } else {
        setError('Failed to add recipe: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleLikeState = async (id) => {
    if (!user?.token) {
      setError('Please login to like recipes');
      return;
    }

    try {
      await foodRecipesAPI.likeStateRecipe(id);
      await fetchRecipes();
    } catch (err) {
      setError('Failed to like recipe: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleLikePersonal = async (id) => {
    if (!user?.token) {
      setError('Please login to like recipes');
      return;
    }

    try {
      await foodRecipesAPI.likePersonalizedRecipe(id);
      await fetchRecipes();
    } catch (err) {
      setError('Failed to like recipe: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await foodRecipesAPI.deletePersonalizedRecipe(id);
      await fetchRecipes();
    } catch (err) {
      setError('Failed to delete recipe: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-orange-700">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-orange-900 mb-4">Indian Food Recipes</h1>
          <p className="text-lg text-orange-700">Explore traditional recipes from across India and share your own culinary creations</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
            <button onClick={() => setError('')} className="ml-4 text-sm underline">Dismiss</button>
          </div>
        )}

        {/* Section 1: Traditional State Recipes - Table Format */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">Traditional Recipes by State</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">State/UT</th>
                    <th className="px-6 py-4 text-left font-semibold">Food Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Description</th>
                    <th className="px-6 py-4 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stateRecipes.length > 0 ? (
                    stateRecipes.map((recipe, index) => (
                      <tr 
                        key={recipe._id} 
                        className="hover:bg-orange-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-orange-900">{recipe.state}</td>
                        <td className="px-6 py-4 font-semibold text-gray-800">{recipe.foodName}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm max-w-md">{recipe.description}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleLikeState(recipe._id)} className="flex items-center gap-2 text-sm text-rose-600 hover:opacity-80">
                              <FaHeart />
                              <span>{recipe.likes || 0}</span>
                            </button>
                            <a
                              href={recipe.videoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                            >
                              <FaPlay size={14} />
                              Watch
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        No traditional recipes available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 2: Personalized Recipes */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-orange-800">My Personalized Recipes</h2>
            {user?.token && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus /> Add Recipe
              </button>
            )}
          </div>

          {/* Add Recipe Form */}
          {showAddForm && user?.token && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold text-orange-900 mb-4">Add Your Recipe</h3>
              <form onSubmit={handleAddRecipe} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Grandma's Biryani"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region/State</label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="e.g., Bengali, Punjabi, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your recipe in detail - ingredients, cooking method, tips, etc."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Save Recipe
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({ title: '', region: '', description: '' });
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Personalized Recipes List */}
            {user?.token ? (
              personalizedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalizedRecipes.map((recipe, idx) => (
                  <div key={recipe._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-16 flex items-center justify-between px-4">
                      <h3 className="text-lg font-bold text-white text-left">{recipe.title}</h3>
                      <div className="flex items-center gap-3">
                        {idx === 0 && recipe.likes > 0 && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Recommended</span>
                        )}
                        <button onClick={() => handleLikePersonal(recipe._id)} className="text-rose-600 flex items-center gap-1">
                          <FaHeart />
                          <span className="text-white text-sm bg-white/20 px-2 py-0.5 rounded">{recipe.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      {recipe.region && (
                        <p className="text-sm text-gray-500 mb-2">Region: <span className="font-semibold text-gray-700">{recipe.region}</span></p>
                      )}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{recipe.description}</p>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDeleteRecipe(recipe._id)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                        >
                          <FaTrash size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg mb-4">You haven't added any personalized recipes yet.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <FaPlus /> Add Your First Recipe
                </button>
              </div>
            )
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <p className="text-blue-800 mb-4">Login to add and manage your personalized recipes</p>
              <a href="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Go to Login
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <button
              onClick={() => setSelectedVideo(null)}
              className="float-right mr-4 mt-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractVideoId(selectedVideo)}`}
                title="Recipe Video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to extract YouTube video ID
const extractVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default FoodRecipes;
