const User = require('../models/User');

// Optional auth: if Authorization header present and valid, attach req.user
const optionalAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return next();
    const parts = auth.split(' ');
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : auth;
    if (!token) return next();
    const user = await User.findOne({ token });
    if (user) req.user = user;
    return next();
  } catch (err) {
    return next();
  }
};

// Require auth: return 401 if not authenticated
const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Unauthorized' });
    const parts = auth.split(' ');
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : auth;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const user = await User.findOne({ token });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { optionalAuth, requireAuth };
