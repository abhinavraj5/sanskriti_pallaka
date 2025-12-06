// FILE: src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { motion } from "framer-motion";

// Background images
import homeImg2 from "../assets/Pages/home2.png";
import homeImg3 from "../assets/Pages/home3.png";

// ⭐ NEW — Import card images
import classicMusicImg from "../assets/Pages/classicmusic.jpg";
import streetFoodImg from "../assets/Pages/street.png";
import villageImg from "../assets/Pages/village.jpg";
import handcraftImg from "../assets/Pages/handicraft.jpg";

import "./HomeUniverse.css";

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

  // ⭐ Assign images based on title
  const getImageForCard = (title) => {
    if (title === "Classic Music") return classicMusicImg;
    if (title === "Village Tours") return villageImg;
    if (title === "Street Food") return streetFoodImg;
    if (title === "Handicrafts") return handcraftImg;
    return null;
  };

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

      {/* Floating particles */}
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

      {/* CONTENT */}
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
            Discover India's music, crafts, food, and travel experiences enriched by centuries of tradition.
          </motion.p>
        </motion.section>

        {/* START YOUR JOURNEY */}
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
                <Card
                  title={s.title}
                  subtitle={s.subtitle}
                  color={s.color}
                  image={getImageForCard(s.title)}  // ⭐ AUTO IMAGE
                />
              </Link>
            </motion.div>
          ))}
        </motion.section>

        {/* SECTIONS BELOW */}
        <Divider />

        <motion.div variants={reveal} initial="hidden" whileInView="visible" className={glassBlock}>
          <h2 className="text-4xl font-semibold text-gray-900 text-center mb-4">India — A Living Civilization</h2>
          <p className="text-lg text-gray-800 text-center">
            India is a 5,000-year-old civilization where festivals, music, crafts, languages, and rituals still shape everyday life.
          </p>
        </motion.div>

        <Divider />
        <motion.div variants={reveal} initial="hidden" whileInView="visible" className={glassBlock}>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Nature Like Nowhere Else</h3>
          <p className="text-gray-800">
            From Himalayan glaciers to tropical forests — India's landscapes carry myths and wildlife.
          </p>
        </motion.div>

        <Divider />
        <motion.div variants={reveal} initial="hidden" whileInView="visible" className={glassBlock}>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">A Universe of Flavors</h3>
          <p className="text-gray-800">
            Indian cuisine is thousands of cuisines — each region carrying spices and traditions.
          </p>
        </motion.div>

        <Divider />
        <motion.div variants={reveal} initial="hidden" whileInView="visible" className={glassBlock}>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Art That Breathes History</h3>
          <p className="text-gray-800">
            Classical dances, paintings, crafts, and monuments carry devotion and deep heritage.
          </p>
        </motion.div>

        <Divider />
        <motion.div variants={reveal} initial="hidden" whileInView="visible" className={`${glassBlock} mb-20`}>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Land of Spirituality</h3>
          <p className="text-gray-800">
            India is the birthplace of philosophies rooted in meditation, balance, and self-realization.
          </p>
        </motion.div>

        {/* FOOTER */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-white/80 mt-12">
          Handcrafted with ❤️ to honor India's living heritage.
        </motion.p>
      </div>
    </div>
  );
}
