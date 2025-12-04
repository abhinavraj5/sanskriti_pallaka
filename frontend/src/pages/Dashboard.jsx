import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaMusic, FaMapMarkedAlt, FaStore, FaPlus, FaChartLine } from 'react-icons/fa';
import { recipesAPI, musicAPI, toursAPI, craftsAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    recipes: 0,
    music: 0,
    tours: 0,
    crafts: 0
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);

        // Fetch all data to get counts
        const [recipesRes, musicRes, toursRes, craftsRes] = await Promise.all([
          recipesAPI.getAll(),
          musicAPI.getAll(),
          toursAPI.getAll(),
          craftsAPI.getAll()
        ]);

        setStats({
          recipes: recipesRes.data?.length || 0,
          music: musicRes.data?.length || 0,
          tours: toursRes.data?.length || 0,
          crafts: craftsRes.data?.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Helpers to add sample items quickly (calls backend and refreshes stats)
  const refreshStats = async () => {
    try {
      const [recipesRes, musicRes, toursRes, craftsRes] = await Promise.all([
        recipesAPI.getAll(),
        musicAPI.getAll(),
        toursAPI.getAll(),
        craftsAPI.getAll()
      ]);

      setStats({
        recipes: recipesRes.data?.length || 0,
        music: musicRes.data?.length || 0,
        tours: toursRes.data?.length || 0,
        crafts: craftsRes.data?.length || 0
      });
    } catch (err) {
      console.error('Error refreshing stats:', err);
    }
  };

  const addSampleRecipe = async () => {
    try {
      setLoading(true);
      await recipesAPI.create({ title: 'Quick Recipe', description: 'Added from dashboard', ingredients: ['1 cup love'], steps: ['Mix', 'Serve'] });
      await refreshStats();
      alert('Recipe added');
    } catch (err) {
      console.error(err);
      alert('Failed to add recipe');
    } finally {
      setLoading(false);
    }
  };

  const addSampleMusic = async () => {
    try {
      setLoading(true);
      await musicAPI.create({ title: 'Quick Lesson', description: 'Added from dashboard', level: 'Beginner' });
      await refreshStats();
      alert('Music lesson added');
    } catch (err) {
      console.error(err);
      alert('Failed to add music lesson');
    } finally {
      setLoading(false);
    }
  };

  const addSampleTour = async () => {
    try {
      setLoading(true);
      await toursAPI.create({ title: 'Quick Tour', description: 'Added from dashboard', location: 'Local Village' });
      await refreshStats();
      alert('Tour added');
    } catch (err) {
      console.error(err);
      alert('Failed to add tour');
    } finally {
      setLoading(false);
    }
  };

  const addSampleCraft = async () => {
    try {
      setLoading(true);
      await craftsAPI.create({ title: 'Quick Craft', description: 'Added from dashboard', price: 10 });
      await refreshStats();
      alert('Craft added');
    } catch (err) {
      console.error(err);
      alert('Failed to add craft');
    } finally {
      setLoading(false);
    }
  };

  // Modal state for adding custom items
  const [modalType, setModalType] = useState(null); // 'recipe'|'music'|'tour'|'craft' | null
  const [modalForm, setModalForm] = useState({ title: '', description: '', extra: '' });
  const [modalErr, setModalErr] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const modalTitleRef = useRef(null);

  useEffect(() => {
    if (modalType && modalTitleRef.current) {
      // small timeout to ensure element is mounted
      setTimeout(() => modalTitleRef.current && modalTitleRef.current.focus(), 50);
    }
  }, [modalType]);

  const openModal = (type) => {
    setModalType(type);
    setModalForm({ title: '', description: '', extra: '' });
    setModalErr('');
  };

  const closeModal = () => {
    setModalType(null);
    setModalForm({ title: '', description: '', extra: '' });
    setModalErr('');
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalForm(f => ({ ...f, [name]: value }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalErr('');
    if (!modalForm.title || !modalForm.description) {
      setModalErr('Title and description are required');
      return;
    }
    try {
      setModalLoading(true);
      // Auto-extract keywords from title + description + extra field
      const textForExtraction = [modalForm.title, modalForm.description, modalForm.extra].filter(Boolean).join(' ');
      const keywords = extractKeywords(textForExtraction, 6);

      if (modalType === 'recipe') {
        await recipesAPI.create({ keywords });
      } else if (modalType === 'music') {
        await musicAPI.create({ keywords });
      } else if (modalType === 'tour') {
        await toursAPI.create({ keywords });
      } else if (modalType === 'craft') {
        await craftsAPI.create({ keywords });
      }
      await refreshStats();
      closeModal();
      alert('Added successfully');
    } catch (err) {
      console.error('Add error', err);
      setModalErr('Failed to add item');
    } finally {
      setModalLoading(false);
    }
  };

  // Keyword extraction: simple frequency-based extractor removing stopwords
  const extractKeywords = (text, topN = 5) => {
    if (!text) return [];
    const stopwords = new Set([
      'the','and','a','an','of','in','on','for','with','to','from','by','at','is','it','this','that','these','those','as','be','are','was','were','or','but','if','then','so','its','your','you','i','we','they','he','she','him','her'
    ]);
    // normalize
    const cleaned = text
      .toLowerCase()
      .replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()\[\]"]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = cleaned.split(' ').map(w => w.trim()).filter(Boolean);
    const freq = {};
    for (const w of words) {
      if (stopwords.has(w)) continue;
      if (/^\d+$/.test(w)) continue; // skip pure numbers
      freq[w] = (freq[w] || 0) + 1;
    }
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).map(e => e[0]);
    return Array.from(new Set(sorted)).slice(0, topN);
  };

  const quickLinks = [
    {
      title: 'Food Recipes',
      description: 'Explore traditional recipes',
      icon: <FaUtensils className="text-3xl text-green-600" />,
      path: '/food',
      count: stats.recipes,
      color: 'bg-green-50'
    },
    {
      title: 'Music Lessons',
      description: 'Learn classical music',
      icon: <FaMusic className="text-3xl text-blue-600" />,
      path: '/music',
      count: stats.music,
      color: 'bg-blue-50'
    },
    {
      title: 'Cultural Tours',
      description: 'Discover heritage sites',
      icon: <FaMapMarkedAlt className="text-3xl text-purple-600" />,
      path: '/tours',
      count: stats.tours,
      color: 'bg-purple-50'
    },
    {
      title: 'Marketplace',
      description: 'Shop traditional crafts',
      icon: <FaStore className="text-3xl text-amber-600" />,
      path: '/marketplace',
      count: stats.crafts,
      color: 'bg-amber-50'
    }
  ];

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
      <div className="bg-gradient-to-r from-primary-700 to-secondary-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              Welcome{user?.username ? `, ${user.username}` : ''}!
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              Explore the rich cultural heritage of Sanskriti Pallaka. Discover recipes, music, tours, and traditional crafts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/food"
                className="bg-white text-primary-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Start Exploring
              </Link>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Watch Tour
              </button>
            </div>
            {/* Add/Edit Modal */}
            {modalType && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Add {modalType === 'recipe' ? 'Recipe' : modalType === 'music' ? 'Music Lesson' : modalType === 'tour' ? 'Tour' : 'Craft'}</h3>
                  {modalErr && <div className="mb-3 text-sm text-red-600">{modalErr}</div>}
                  <form onSubmit={handleModalSubmit}>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input name="title" placeholder="Enter title" ref={modalTitleRef} value={modalForm.title} onChange={handleModalChange} className="w-full mt-2 p-2 border rounded bg-black text-white placeholder-gray-400 border-gray-700" />

                    <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                    <textarea name="description" placeholder="Enter a short description" value={modalForm.description} onChange={handleModalChange} className="w-full mt-2 p-2 border rounded bg-black text-white placeholder-gray-400 border-gray-700" rows={4} />

                    {modalType === 'recipe' && (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Ingredients (comma-separated)</label>
                        <input name="extra" placeholder="eg. rice, salt, oil" value={modalForm.extra} onChange={handleModalChange} className="w-full mt-2 p-2 border rounded bg-black text-white placeholder-gray-400 border-gray-700" />
                      </>
                    )}

                    {modalType === 'music' && (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Level</label>
                        <input name="extra" placeholder="Beginner/Intermediate/Advanced" value={modalForm.extra} onChange={handleModalChange} className="w-full mt-2 p-2 border rounded bg-black text-white placeholder-gray-400 border-gray-700" />
                      </>
                    )}

                    {modalType === 'tour' && (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Location</label>
                        <input name="extra" placeholder="City / Village / Area" value={modalForm.extra} onChange={handleModalChange} className="w-full mt-2 p-2 border rounded bg-black text-white placeholder-gray-400 border-gray-700" />
                      </>
                    )}

                    {modalType === 'craft' && (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Price</label>
                        <input name="extra" placeholder="0" value={modalForm.extra} onChange={handleModalChange} className="w-full mt-2 p-2 border rounded bg-black text-white placeholder-gray-400 border-gray-700" type="number" />
                      </>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                      <button type="button" onClick={closeModal} className="px-4 py-2 rounded border">Cancel</button>
                      <button type="submit" disabled={modalLoading} className="px-4 py-2 rounded bg-primary-600 text-white">
                        {modalLoading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <div key={link.title} className="card bg-white">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${link.color}`}>
                    {link.icon}
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{link.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{link.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{link.description}</p>
                <Link
                  to={link.path}
                  className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                >
                  Explore <FaPlus className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Additions</h2>
              <div className="flex items-center space-x-2 text-primary-600">
                <FaChartLine />
                <span className="font-medium">Updated daily</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  className={`card hover:shadow-xl ${link.color} border-l-4 ${
                    link.title === 'Food Recipes' ? 'border-l-green-500' :
                    link.title === 'Music Lessons' ? 'border-l-blue-500' :
                    link.title === 'Cultural Tours' ? 'border-l-purple-500' :
                    'border-l-amber-500'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      {link.icon}
                      <div>
                        <h3 className="font-semibold text-gray-800">{link.title}</h3>
                        <p className="text-sm text-gray-600">{link.count} items available</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700">{link.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">Click to explore</span>
                      <span className="text-primary-600">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => openModal('recipe')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaUtensils className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Add Recipe</h3>
                    <p className="text-sm text-gray-600">Share your recipe</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>

              <button
                onClick={() => openModal('music')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaMusic className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Add Lesson</h3>
                    <p className="text-sm text-gray-600">Share music lesson</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>

              <button
                onClick={() => openModal('tour')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaMapMarkedAlt className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Add Tour</h3>
                    <p className="text-sm text-gray-600">Share tour info</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>

              <button
                onClick={() => openModal('craft')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FaStore className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Add Craft</h3>
                    <p className="text-sm text-gray-600">Sell your craft</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>
            </div>

            {/* User Info */}
            <div className="mt-8 card bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
                <p className="text-primary-100 mb-4">
                  Complete your profile to get personalized recommendations
                </p>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Profile Completion</span>
                    <span className="font-bold">60%</span>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-3/5"></div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-white text-primary-800 hover:bg-gray-100 py-2 rounded-lg font-medium transition-colors duration-200">
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;