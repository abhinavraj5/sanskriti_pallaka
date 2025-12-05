import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaMusic, FaMapMarkedAlt, FaStore, FaPlus } from 'react-icons/fa';
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
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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

  const [modalType, setModalType] = useState(null);
  const [modalForm, setModalForm] = useState({ title: '', description: '', extra: '' });
  const [modalErr, setModalErr] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const modalTitleRef = useRef(null);

  useEffect(() => {
    if (modalType && modalTitleRef.current) {
      setTimeout(() => modalTitleRef.current?.focus(), 50);
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

  const extractKeywords = (text, topN = 6) => {
    if (!text) return [];
    const stopwords = new Set([
      'the','and','a','an','of','in','on','for','with','to','from','by','at','is','it','this','that','these','those','as','be','are','was','were',
      'or','but','if','then','so','your','you','i','we','they','he','she','her','him'
    ]);

    const cleaned = text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const words = cleaned.split(' ');

    const freq = {};
    for (const w of words) {
      if (!stopwords.has(w)) freq[w] = (freq[w] || 0) + 1;
    }

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(e => e[0])
      .slice(0, topN);
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
      const text = `${modalForm.title} ${modalForm.description} ${modalForm.extra}`;
      const keywords = extractKeywords(text);

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
      alert('Added successfully!');
    } catch (err) {
      console.error(err);
      setModalErr('Failed to add item');
    } finally {
      setModalLoading(false);
    }
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

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-primary-700 to-secondary-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              Welcome{user?.username ? `, ${user.username}` : ''}! 👋
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              Your personalized cultural hub. Share and manage your recipes, music lessons, tours, and traditional crafts.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/food" className="bg-white text-primary-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
                Explore Collections
              </Link>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Add {modalType === 'recipe' ? 'Recipe' : modalType === 'music' ? 'Music Lesson' : modalType === 'tour' ? 'Tour' : 'Craft'}
            </h3>

            {modalErr && <div className="mb-3 text-sm text-red-600">{modalErr}</div>}

            <form onSubmit={handleModalSubmit}>
              <label className="block text-sm font-medium">Title</label>
              <input
                name="title"
                ref={modalTitleRef}
                value={modalForm.title}
                onChange={handleModalChange}
                className="w-full mt-2 p-2 border rounded bg-black text-white"
                placeholder="Enter title"
              />

              <label className="block text-sm font-medium mt-4">Description</label>
              <textarea
                name="description"
                value={modalForm.description}
                onChange={handleModalChange}
                className="w-full mt-2 p-2 border rounded bg-black text-white"
                rows={4}
                placeholder="Enter description"
              />

              {/* EXTRA FIELD BASED ON TYPE */}
              {modalType === 'recipe' && (
                <>
                  <label className="block mt-4">Ingredients</label>
                  <input
                    name="extra"
                    value={modalForm.extra}
                    onChange={handleModalChange}
                    className="w-full mt-2 p-2 border rounded bg-black text-white"
                    placeholder="rice, salt, oil"
                  />
                </>
              )}

              {modalType === 'music' && (
                <>
                  <label className="block mt-4">Level</label>
                  <input
                    name="extra"
                    value={modalForm.extra}
                    onChange={handleModalChange}
                    className="w-full mt-2 p-2 border rounded bg-black text-white"
                    placeholder="Beginner / Intermediate"
                  />
                </>
              )}

              {modalType === 'tour' && (
                <>
                  <label className="block mt-4">Location</label>
                  <input
                    name="extra"
                    value={modalForm.extra}
                    onChange={handleModalChange}
                    className="w-full mt-2 p-2 border rounded bg-black text-white"
                    placeholder="City / Village"
                  />
                </>
              )}

              {modalType === 'craft' && (
                <>
                  <label className="block mt-4">Price</label>
                  <input
                    name="extra"
                    value={modalForm.extra}
                    onChange={handleModalChange}
                    type="number"
                    className="w-full mt-2 p-2 border rounded bg-black text-white"
                    placeholder="0"
                  />
                </>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded border">
                  Cancel
                </button>
                <button type="submit" disabled={modalLoading} className="px-4 py-2 bg-primary-600 text-white rounded">
                  {modalLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STATS SECTION */}
      <div className="container mx-auto px-4 -mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 Your Collections</h2>
        <p className="text-gray-600 mb-6">Items you've added to your personal collections</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <div key={link.title} className="card bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${link.color}`}>{link.icon}</div>
                  <span className="text-2xl font-bold">{link.count}</span>
                </div>

                <h3 className="text-lg font-semibold">{link.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{link.description}</p>

                <Link to={link.path} className="inline-flex items-center text-primary-600 font-medium">
                  Explore <FaPlus className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">✨ Your Content</h2>
            <p className="text-gray-600 text-sm mb-6">Quick links to your personal collections</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  className={`card ${link.color} border-l-4 shadow hover:shadow-lg transition ${
                    link.title === 'Food Recipes'
                      ? 'border-green-500'
                      : link.title === 'Music Lessons'
                      ? 'border-blue-500'
                      : link.title === 'Cultural Tours'
                      ? 'border-purple-500'
                      : 'border-amber-500'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      {link.icon}
                      <div>
                        <h3 className="font-semibold">{link.title}</h3>
                        <p className="text-sm text-gray-600">{link.count} items</p>
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

          {/* RIGHT SIDE – ACTIONS */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🚀 Add New Content</h2>

            <div className="space-y-4">
              <button
                onClick={() => openModal('recipe')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaUtensils className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Add Recipe</h3>
                    <p className="text-sm text-gray-600">Share your recipe</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>

              <button
                onClick={() => openModal('music')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaMusic className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Add Lesson</h3>
                    <p className="text-sm text-gray-600">Share music lesson</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>

              <button
                onClick={() => openModal('tour')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaMapMarkedAlt className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Add Tour</h3>
                    <p className="text-sm text-gray-600">Share tour info</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>

              <button
                onClick={() => openModal('craft')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FaStore className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Add Craft</h3>
                    <p className="text-sm text-gray-600">Sell your craft</p>
                  </div>
                </div>
                <FaPlus className="text-gray-400" />
              </button>
            </div>

            {/* USER PROFILE CARD */}
            <div className="mt-8 card bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">👤 Your Profile</h3>

                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Total Items Shared</span>
                    <span className="font-bold">
                      {stats.recipes + stats.music + stats.tours + stats.crafts}
                    </span>
                  </div>

                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white"
                      style={{
                        width: `${Math.min(
                          ((stats.recipes + stats.music + stats.tours + stats.crafts) / 20) * 100,
                          100
                        )}%`
                      }}
                    ></div>
                  </div>
                </div>

                <button className="w-full py-2 bg-white text-primary-800 rounded-lg hover:bg-gray-100">
                  View Profile
                </button>
              </div>
            </div>

            {/* Chat Button */}
            <div className="mt-6">
              <Link to="/chatbot" className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow hover:shadow-lg">
                💬 Chat with Assistant
              </Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
