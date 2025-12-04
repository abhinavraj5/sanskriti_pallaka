const User = require("../models/User");

// Simple token generator (replace with JWT in production)
const generateToken = (userId) => {
  return `token_${userId}_${Date.now()}`;
};

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "Username and password are required" });

    // Check duplicate
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Save new user
    try {
      const newUser = await User.create({ username, password, name, email });
      const token = generateToken(newUser._id);
      // persist token on user for simple auth lookup
      newUser.token = token;
      await newUser.save();
      res.status(201).json({
        message: "Registration successful",
        token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          name: newUser.name,
          email: newUser.email
        }
      });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
        return res.status(400).json({ error: "Username already exists" });
      }
      return res.status(500).json({ error: "Server error: " + err.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "All fields are required" });

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Username not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
