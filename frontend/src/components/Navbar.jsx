import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const isAuthenticated = localStorage.getItem("user") !== null;

  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const showSignIn =
    !isAuthenticated &&
    loc.pathname !== "/login" &&
    loc.pathname !== "/register";

  const links = [
    { to: "/", label: "Home" },
    { to: "/music", label: "Music" },
    { to: "/tours", label: "Tours" },
    { to: "/food", label: "Food" },
    { to: "/crafts", label: "Crafts" },
    { to: "/about", label: "About" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-5 bg-white/10 backdrop-blur-3xl shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-deepIndigo to-redAccent 
                       flex items-center justify-center text-white font-bold text-lg shadow-md"
          >
            SP
          </motion.div>

          <div>
            <div className="text-xl font-semibold text-black tracking-wide">
              Sanskriti Pallaka
            </div>
            <div className="text-xs text-black">Arts • Music • Food • Travel</div>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-medium transition 
                ${loc.pathname === l.to ? "text-black" : "text-black hover:text-gray-700"}
              `}
            >
              {l.label}
              {loc.pathname === l.to && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-accentGold rounded"
                />
              )}
            </Link>
          ))}

          {showSignIn && (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white 
                         bg-gradient-to-br from-deepIndigo to-redAccent shadow-md hover:opacity-90"
            >
              Sign In
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:opacity-90"
            >
              Sign Out
            </button>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-white/10 backdrop-blur-3xl shadow-inner px-6 py-4 space-y-3"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-black font-medium py-2"
            >
              {l.label}
            </Link>
          ))}

          {showSignIn && (
            <Link
              to="/login"
              className="block bg-deepIndigo text-white py-2 px-4 rounded-lg mt-3"
            >
              Sign In
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="block bg-red-600 text-white py-2 px-4 rounded-lg mt-3"
            >
              Sign Out
            </button>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
