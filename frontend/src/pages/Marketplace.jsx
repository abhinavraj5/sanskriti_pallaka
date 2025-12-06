import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { craftsAPI } from '../services/api';
import stateCrafts from '../data/stateCrafts';
import { FaStore, FaPlus, FaFilter, FaSearch, FaShoppingCart } from 'react-icons/fa';

const Marketplace = () => {
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCrafts();
  }, []);

  const fetchCrafts = async () => {
    try {
      setLoading(true);
      const response = await craftsAPI.getAll();
      setCrafts(response.data || []);
    } catch (err) {
      setError('Failed to load crafts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (craft) => {
    setCart([...cart, craft]);
    alert(`${craft.title || 'Item'} added to cart!`);
  };

  const filteredCrafts = crafts.filter(craft => {
    const matchesSearch = craft.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         craft.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         craft.artist?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || craft.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...new Set(crafts.map(c => c.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaStore className="text-4xl" />
              <h1 className="text-5xl font-bold">Marketplace</h1>
            </div>
            <p className="text-xl text-amber-100 mb-6">
              Shop authentic traditional crafts handmade by skilled artisans. Support local craftsmanship.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-white text-amber-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200">
                <FaShoppingCart />
                <span>Cart ({cart.length})</span>
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                View Artisan Stories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search crafts by name, artist, or material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200">
                <FaPlus />
                <span>Sell Craft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {filteredCrafts.length === 0 ? (
          <div className="text-center py-12">
            <FaStore className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No crafts found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try a different search term' : 'Be the first to add a craft!'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Traditional Crafts <span className="text-amber-600">({filteredCrafts.length})</span>
              </h2>
              <span className="text-gray-500">
                Sorted by popularity
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCrafts.map((craft, index) => (
                <div key={index} className="card hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {craft.title || 'Untitled Craft'}
                        </h3>
                        {craft.artist && (
                          <p className="text-gray-600 text-sm mt-1">by {craft.artist}</p>
                        )}
                      </div>
                      {craft.price && (
                        <span className="bg-amber-100 text-amber-800 text-lg font-bold px-3 py-1 rounded-lg">
                          ${craft.price}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {craft.description || 'No description available'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {craft.category && (
                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                          {craft.category}
                        </span>
                      )}
                      {craft.material && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                          {craft.material}
                        </span>
                      )}
                      {craft.origin && (
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                          {craft.origin}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        {craft.createdAt && new Date(craft.createdAt).toLocaleDateString()}
                      </div>
                      <button 
                        onClick={() => addToCart(craft)}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                      >
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* State-wise Crafts */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">State-wise Crafts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateCrafts.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{s.state}</h3>
                    <p className="text-sm text-gray-500">Demo Artist: {s.demoArtist}</p>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {s.crafts.slice(0, 6).map((c, idx) => (
                    <div key={idx} className="text-sm">
                      <strong className="text-gray-800">{c.name}</strong>
                      <div className="text-gray-600">{c.description}</div>
                    </div>
                  ))}
                  {s.crafts.length > 6 && (
                    <div className="text-xs text-amber-600 mt-2">+{s.crafts.length - 6} more</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3">Pottery</h3>
              <p className="text-amber-100 mb-4">Handmade clay pottery</p>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">24 Items</span>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3">Textiles</h3>
              <p className="text-red-100 mb-4">Traditional fabrics</p>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">18 Items</span>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3">Jewelry</h3>
              <p className="text-blue-100 mb-4">Handcrafted jewelry</p>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">32 Items</span>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3">Woodwork</h3>
              <p className="text-green-100 mb-4">Carved wood items</p>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">15 Items</span>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mt-12 fixed bottom-4 right-4 bg-white rounded-xl shadow-xl p-6 max-w-md z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaShoppingCart className="mr-2 text-amber-600" />
              Your Cart ({cart.length})
            </h3>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">{item.title || `Item ${index + 1}`}</span>
                  <span className="font-semibold">${item.price || '0.00'}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-amber-600">
                ${cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0).toFixed(2)}
              </span>
            </div>
            <button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;