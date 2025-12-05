import React from "react";
import aboutMusic from "../assets/Pages/Aboutmusic.jpg";
import aboutCraft from "../assets/Pages/Aboutcraft.jpg";
import aboutFood from "../assets/Pages/Aboutfood.jpg";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf3e0] to-[#f7e8c9] py-16">
      <div className="container mx-auto px-6">

        {/* PAGE HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold font-merri text-gray-900 text-center"
        >
          About <span className="text-deepIndigo">Sanskriti Pallaka</span>
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-gray-700 max-w-3xl mx-auto mt-4 text-lg"
        >
          A cultural intelligence platform preserving India's rich heritage—through 
          <span className="font-semibold text-deepIndigo"> music, food, crafts,</span> 
          and <span className="font-semibold text-redAccent">historical journeys.</span>
        </motion.p>

        {/* IMAGE GRID */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={aboutMusic}
              alt="Indian Classical Music"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={aboutCraft}
              alt="Traditional Indian Craft"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={aboutFood}
              alt="Indian Street Food"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </motion.div>
        </div>

        {/* TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-white/60 backdrop-blur-lg p-10 rounded-2xl shadow-xl mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-deepIndigo mb-3">
            Preserving Heritage with Technology
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Sanskriti Pallaka bridges the gap between tradition and modernity by 
            providing immersive ways to explore India's cultural brilliance. Whether 
            you're discovering rare handicrafts, learning classical music, exploring 
            culinary secrets, or taking an AI-guided historical tour — this platform 
            brings cultural experiences to life.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            Our mission is to empower artisans, preserve dying art forms, uplift 
            rural communities, and make cultural learning fun, interactive, and 
            accessible for all ages.
          </p>
        </motion.div>

        {/* HIGHLIGHTS SECTION */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="card-glass p-6 shadow-xl rounded-xl text-center"
          >
            <h4 className="text-xl font-bold text-gray-900">🎵 Music Learning</h4>
            <p className="text-gray-600 mt-2">
              AI-powered raga feedback, rhythm games & classical learning tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-glass p-6 shadow-xl rounded-xl text-center"
          >
            <h4 className="text-xl font-bold text-gray-900">🛕 Heritage Tours</h4>
            <p className="text-gray-600 mt-2">
              Smart AI itineraries with Google Earth 3D monument exploration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-glass p-6 shadow-xl rounded-xl text-center"
          >
            <h4 className="text-xl font-bold text-gray-900">🍲 Culinary Stories</h4>
            <p className="text-gray-600 mt-2">
              Preserve family recipes and regional traditions for future generations.
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
