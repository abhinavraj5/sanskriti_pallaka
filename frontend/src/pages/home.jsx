import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { motion } from "framer-motion";

const sample = [
  { title: "Classical Music", subtitle: "Live & recorded", color: "#EFE2BA" },
  { title: "Village Tours", subtitle: "Local guides & stories", color: "#D79922" },
  { title: "Street Food", subtitle: "Taste the traditions", color: "#F13C20" },
  { title: "Handicrafts", subtitle: "Buy handmade", color: "#4056A1" }
];

export default function Home() {
  const isAuthenticated = localStorage.getItem("user") !== null;
  const getTarget = (title) => `/${title.split(" ")[0].toLowerCase()}`;

  const handleClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-[#faf4e6] relative overflow-hidden">

      {/* FLOATING BACKGROUND ORBS */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 rounded-full bg-softPurple/30 blur-2xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-redAccent/30 blur-2xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 py-20">

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
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-block rounded-lg px-4 py-1 bg-softPurple/60 text-sm font-semibold"
          >
            Explore India's Cultural Soul
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="text-4xl md:text-6xl font-merri font-extrabold mt-4 text-gray-900"
          >
            Artsy. Living. Timeless.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg"
          >
            Discover India's music, crafts, food and travel experiences enriched by centuries of tradition.
          </motion.p>
        </motion.section>

        {/* START YOUR JOURNEY */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-merri font-semibold text-gray-900 mb-10 text-center"
        >
          Start Your Journey
        </motion.h2>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {sample.map((s, i) => {
            const path = getTarget(s.title);
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.15, duration: 0.6 },
                  },
                }}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Link to={path} onClick={(e) => handleClick(e, path)}>
                  <Card title={s.title} subtitle={s.subtitle} color={s.color} />
                </Link>
              </motion.div>
            );
          })}
        </motion.section>

        {/* LIVING CIVILIZATION */}
        <section className="mt-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-merri font-semibold text-gray-900 mb-6"
          >
            India — A Living Civilization
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            India is a 5,000-year-old living museum of arts, rituals, festivals, and storytelling.
            Every region adds a new color to this timeless canvas.
          </motion.p>

          <div className="mt-10 flex justify-center">
            <img
              src="/placeholder.jpg"
              alt="Indian Culture"
              className="rounded-xl shadow-lg w-full max-w-3xl object-cover"
            />
          </div>
        </section>

        {/* NATURE */}
        <section className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/placeholder.jpg"
              alt="Nature of India"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nature Like Nowhere Else</h3>
            <p className="text-gray-700 leading-relaxed">
              India is one of the most biodiverse nations — from icy Himalayas and tropical forests
              to deserts and backwaters.
            </p>
          </motion.div>
        </section>

        {/* FOOD */}
        <section className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">A Universe of Flavors</h3>
            <p className="text-gray-700 leading-relaxed">
              Indian cuisine is thousands of cuisines. Every state holds its own spices,
              traditions, and culinary secrets passed down for centuries.
            </p>
          </motion.div>

          <div>
            <img
              src="/placeholder.jpg"
              alt="Indian Food"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </section>

        {/* ART */}
        <section className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/placeholder.jpg"
              alt="Indian Art"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Art That Breathes History</h3>
            <p className="text-gray-700 leading-relaxed">
              From UNESCO heritage sites to classical dances, India’s rich artistic traditions are
              alive in every sculpture and fabric.
            </p>
          </motion.div>
        </section>

        {/* SPIRITUALITY */}
        <section className="mt-24 grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Land of Spirituality</h3>
            <p className="text-gray-700 leading-relaxed">
              India is the birthplace of Hinduism, Buddhism, Jainism, and Sikhism — a land where
              spirituality merges with everyday life.
            </p>
          </motion.div>

          <div>
            <img
              src="/placeholder.jpg"
              alt="Spiritual India"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </section>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-500 mt-12"
        >
          Handcrafted with ❤️ to honor India's living heritage.
        </motion.p>
      </div>
    </div>
  );
}
