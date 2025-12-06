import React from "react";
import { motion } from "framer-motion";

export default function Card({ title, subtitle, img, color }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        y: -6,
        rotateX: 4,
        rotateY: -4,
        boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="
        bg-white/60 backdrop-blur-xl 
        border border-white/40 
        rounded-2xl p-6 
        shadow-lg cursor-pointer 
        transition-all duration-300
      "
    >
      <div
        className="
          h-40 w-full rounded-xl 
          bg-white/70 
          shadow-inner flex items-center justify-center
        "
        style={{ background: color }}
      ></div>

      <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </motion.div>
  );
}
