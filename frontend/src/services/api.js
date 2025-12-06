import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
};

// Crafts API
export const craftsAPI = {
  getAll: (params = {}) => api.get('/crafts', { params }),
  create: (craftData) => api.post('/crafts', craftData),
  uploadScanner: (formData) => api.post('/crafts/upload-scanner', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/crafts/${id}`),
};

// Music API
export const musicAPI = {
  getAll: () => api.get('/music'),
  create: (lessonData) => api.post('/music', lessonData),
};

// Recipes API
export const recipesAPI = {
  getAll: () => api.get('/recipes'),
  create: (recipeData) => api.post('/recipes', recipeData),
};

// Food Recipes API
export const foodRecipesAPI = {
  getStateRecipes: () => api.get('/food-recipes/state-recipes'),
  getPersonalizedRecipes: () => api.get('/food-recipes/my-recipes'),
  createPersonalizedRecipe: (recipeData) => api.post('/food-recipes/my-recipes', recipeData),
  deletePersonalizedRecipe: (id) => api.delete(`/food-recipes/my-recipes/${id}`),
  likeStateRecipe: (id) => api.post(`/food-recipes/state-recipes/${id}/like`),
  likePersonalizedRecipe: (id) => api.post(`/food-recipes/my-recipes/${id}/like`),
};

// Tours API
export const toursAPI = {
  getAll: () => api.get('/tours'),
  create: (tourData) => api.post('/tours', tourData),
};

export default api;