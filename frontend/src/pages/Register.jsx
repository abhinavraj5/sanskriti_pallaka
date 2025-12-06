import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "./Login.css";

export default function Register(){
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [ornaments, setOrnaments] = useState([]);
  const navigate = useNavigate();

  // Generate floating particles
  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 5 + Math.random() * 3,
      size: 3 + Math.random() * 4,
    }));
    setParticles(generatedParticles);

    // Generate ornamental elements
    const generatedOrnaments = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 1.5,
      rotation: Math.random() * 360,
    }));
    setOrnaments(generatedOrnaments);
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleRegister = async () => {
    setMsg("");
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setMsg("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/users/register", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password })
      });
      const data = await res.json();
      if(!res.ok) {
        if (data.error === "Email already exists") {
          setMsg("This email is already registered. Please use another.");
        } else if (data.error === "Username already exists") {
          setMsg("This username is already taken. Please choose another.");
        } else {
          setMsg(data.error || "Registration failed");
        }
        setIsLoading(false);
        return;
      }
      try {
        const { token, user } = data;
        localStorage.setItem('user', JSON.stringify({ ...(user || {}), token }));
      } catch (e) {}
      navigate('/dashboard');
    } catch(e){
      setMsg("Server error. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-universe min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Image */}
      <div className="universe-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      {/* Ornamental Floating Elements */}
      <div className="ornaments-container">
        {ornaments.map((ornament) => (
          <div
            key={`ornament-${ornament.id}`}
            className="ornament"
            style={{
              left: `${ornament.left}%`,
              top: `${ornament.top}%`,
              animationDelay: `${ornament.delay}s`,
              "--rotation": `${ornament.rotation}deg`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Mandala Background Pattern */}
      <div className="mandala-bg"></div>

      {/* Main Content - MASSIVE */}
      <div className="relative z-10 w-full max-w-2xl mx-4 px-4 pt-8 pb-32">
        {/* Header with Animation */}
        <div className="text-center mb-12 header-section">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <div className="w-28 h-28 rounded-3xl mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-4xl relative shadow-2xl transform transition-transform hover:scale-105">
              <span className="logo-text">SP</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mt-8 bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-transparent animate-shimmer leading-tight">
            Join the Sacred Arts
          </h1>
          <p className="text-purple-200 mt-6 text-xl tracking-widest uppercase font-light">
            Create your Account at Sanskriti Palaka
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent rounded-full animate-pulse"></div>
            <div className="w-1 h-24 bg-gradient-to-b from-pink-500 to-transparent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-transparent rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>

        {/* Error Message with Animation */}
        {msg && (
          <div className="mb-8 p-6 border-2 border-red-500/50 bg-red-500/10 text-red-300 rounded-2xl backdrop-blur-sm error-popup animate-pulse">
            <div className="flex items-center gap-3 text-lg">
              <span className="text-2xl">⚠️</span>
              {msg}
            </div>
          </div>
        )}

        {/* Register Form - MASSIVE */}
        <div className="login-form-container backdrop-blur-md bg-black/30 border-2 border-yellow-600/60 rounded-4xl p-12 shadow-2xl">
          {/* Username Field */}
          <div className="form-group">
            <label className="block text-lg font-semibold text-purple-200 mb-3 uppercase tracking-wider">
              🔱 Seeker's Name
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <FiUser className="text-purple-400" size={24} />
              </div>
              <input
                name="username"
                className="input-field"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                disabled={isLoading}
              />
              <div className="input-glow"></div>
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group mt-8">
            <label className="block text-lg font-semibold text-purple-200 mb-3 uppercase tracking-wider">
              📧 Sacred Email
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <FiMail className="text-purple-400" size={24} />
              </div>
              <input
                name="email"
                type="email"
                className="input-field"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              <div className="input-glow"></div>
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group mt-8">
            <label className="block text-lg font-semibold text-purple-200 mb-3 uppercase tracking-wider">
              🔐 Secret Mantra
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <FiLock className="text-purple-400" size={24} />
              </div>
              <input
                name="password"
                type="password"
                className="input-field"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                disabled={isLoading}
              />
              <div className="input-glow"></div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group mt-8">
            <label className="block text-lg font-semibold text-purple-200 mb-3 uppercase tracking-wider">
              🔐 Confirm Mantra
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <FiLock className="text-purple-400" size={24} />
              </div>
              <input
                name="confirmPassword"
                type="password"
                className="input-field"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <div className="input-glow"></div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="submit-btn mt-10 w-full relative group overflow-hidden rounded-2xl"
          >
            <div className="button-glow"></div>
            <div className="relative flex items-center justify-center gap-2 py-4 text-lg">
              <span className="font-bold uppercase tracking-wider">
                {isLoading ? "Creating Account..." : "Join the Universe"}
              </span>
              <FiArrowRight className={`text-xl transition-transform ${isLoading ? "animate-spin" : "group-hover:translate-x-2"}`} />
            </div>
          </button>

          {/* Login Link */}
          <div className="mt-10 text-center">
            <p className="text-purple-200 text-base">
              Already part of our cultural universe?{" "}
              <a href="/login" className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold hover:from-purple-300 hover:to-pink-300 transition-all text-lg">
                Enter the Sacred Portal
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
