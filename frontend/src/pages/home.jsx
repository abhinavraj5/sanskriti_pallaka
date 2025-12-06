// FILE: src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { motion } from "framer-motion";
import homeImg2 from "../assets/Pages/home2.png";
import homeImg3 from "../assets/Pages/home3.png";

import "./HomeUniverse.css";  // ⭐ NEW BACKGROUND

const sample = [
  { title: "Classic Music", subtitle: "Live & recorded", color: "#EFE2BA" },
  { title: "Village Tours", subtitle: "Local guides & stories", color: "#D79922" },
  { title: "Street Food", subtitle: "Taste the traditions", color: "#F13C20" },
  { title: "Handicrafts", subtitle: "Buy handmade", color: "#4056A1" }
];

export default function Home() {
  const images = [homeImg2, homeImg3];
  const [current, setCurrent] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((s) => (s + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // floating particles (like login but lighter)
    const generated = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 3 + Math.random() * 4,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setParticles(generated);
  }, []);

  const isAuthenticated = localStorage.getItem("user") !== null;
  const getTarget = (title) => `/${title.split(" ")[0].toLowerCase()}`;

  const handleClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      window.location.href = "/login";
    }
  };

  /* Glass Block Styling */
  const glassBlock =
    "bg-white/50 backdrop-blur-2xl border border-white/40 shadow-xl rounded-3xl p-10 max-w-4xl mx-auto transition-all duration-300";

  const hoverEffect = {
    scale: 1.03,
    boxShadow: "0 15px 45px rgba(0,0,0,0.35)",
  };

  const reveal = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const Divider = () => (
    <div className="w-full h-[1px] my-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
  );

  return (
    <div className="home-universe relative overflow-hidden">

      {/* Universe Background Elements */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="mandala-home"></div>

      {/* floating particles */}
      <div className="home-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="home-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `floatUp ${p.duration}s infinite`,
              animationDelay: `${p.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* ========= 🌟 MAIN HOME PAGE CONTENT STARTS HERE 🌟 ========= */}
      <div className="relative z-10 container mx-auto px-6 py-20">

        {/* HERO */}
        <motion.section
          className="text-center mb-24"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block rounded-lg px-4 py-1 bg-white text-indigo-900 text-sm font-semibold"
          >
            Explore India's Cultural Soul
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-merri font-extrabold mt-4 text-white drop-shadow-xl leading-tight"
          >
            A Journey Through India’s Soul.
          </motion.h1>

          <motion.p className="mt-4 text-white max-w-2xl mx-auto text-lg">
            Discover India's music, crafts, food and travel experiences enriched by centuries of tradition.
          </motion.p>
        </motion.section>

        {/* ⭐ START YOUR JOURNEY (Scroll Animation) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-merri font-semibold text-white mb-10 text-center drop-shadow-lg"
        >
          Start Your Journey
        </motion.h2>

        <motion.section
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, staggerChildren: 0.18 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-28 px-4"
        >
          {sample.map((s, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to={getTarget(s.title)} onClick={(e) => handleClick(e, getTarget(s.title))}>
                <Card title={s.title} subtitle={s.subtitle} color={s.color} />
              </Link>
            </motion.div>
          ))}
        </motion.section>

        {/* ⭐ DESCRIPTION SECTIONS BELOW */}

        {/* LIVING CIVILIZATION */}
        <Divider />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={hoverEffect}
          className={glassBlock}
        >
          <h2 className="text-4xl font-merri font-semibold text-gray-900 mb-4 text-center">
            India — A Living Civilization
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            India is a 5,000-year-old civilization where festivals, music, crafts,
            languages and rituals still shape everyday life — a culture beautifully alive.
          </p>
        </motion.div>

        {/* NATURE */}
        <Divider />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={hoverEffect}
          className={glassBlock}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Nature Like Nowhere Else
          </h3>
          <p className="text-gray-800 leading-relaxed">
            From Himalayan glaciers and tropical forests to sandy deserts and sacred rivers —
            India's landscapes carry myths, wildlife and timeless stories.
          </p>
        </motion.div>

        {/* FOOD */}
        <Divider />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={hoverEffect}
          className={glassBlock}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">A Universe of Flavors</h3>
          <p className="text-gray-800 leading-relaxed">
            Indian cuisine is not one — but thousands of cuisines. Each region carries spices,
            traditions and recipes preserved through generations.
          </p>
        </motion.div>

        {/* ART */}
        <Divider />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={hoverEffect}
          className={glassBlock}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Art That Breathes History</h3>
          <p className="text-gray-800 leading-relaxed">
            Classical dances, paintings, crafts and monuments — every Indian art form
            carries devotion, stories and the essence of dynasties.
          </p>
        </motion.div>

        {/* SPIRITUALITY */}
        <Divider />
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={hoverEffect}
          className={`${glassBlock} mb-20`}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Land of Spirituality
          </h3>
          <p className="text-gray-800 leading-relaxed">
            India is the birthplace of profound philosophies — Hinduism, Buddhism, Jainism
            and Sikhism — all rooted in meditation, balance and self-realization.
          </p>
        </motion.div>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-white/80 mt-12"
        >
          Handcrafted with ❤️ to honor India's living heritage.
        </motion.p>

      </div>
      {/* ========= 🌟 MAIN CONTENT END 🌟 ========= */}
    </div>
  );
}
