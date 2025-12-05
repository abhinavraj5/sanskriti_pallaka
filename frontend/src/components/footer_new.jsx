import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const loc = useLocation();
  const isAuthPage = loc.pathname === "/login" || loc.pathname === "/register";

  const footerClass = isAuthPage
    ? "bg-transparent backdrop-blur-sm mt-16 py-10 shadow-inner border-t border-purple-500/20"
    : "bg-gradient-to-r from-[#faf3e0] to-[#f0e3c0] mt-16 py-10 shadow-inner";

  const textColor = isAuthPage ? "text-purple-200" : "text-gray-700";

  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={footerClass}>
      <div className="container mx-auto px-6 text-center">
        <p className={`text-sm ${textColor} font-medium tracking-wide`}>
          © {new Date().getFullYear()} Sanskriti Pallaka · Preserving Indian Heritage
        </p>
      </div>
    </motion.footer>
  );
}
