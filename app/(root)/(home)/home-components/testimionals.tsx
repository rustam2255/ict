"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const {t} = useTranslation()
  const stats = [
    { number: "1", label: t("testimonials.label") },
    { number: "8", label: t("testimonials.navigation") },
    { number: "1,3K", label: t("testimonials.student_count") },
    { number: "50+", label: t("testimonials.project_count") },
  ];

  return (
    <div className="w-full py-12 sm:py-16 lg:py-25 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Top vertical line - Desktop only */}
        <div className="absolute -top-6 sm:-top-8 lg:-top-12 left-1/2 transform -translate-x-1/2 w-[4px] sm:w-[5px] lg:w-[7px] h-[25px] sm:h-[35px] lg:h-[50px] bg-green-400 hidden md:block"></div>

        {/* Mobile & Tablet (2x2 grid, no lines) */}
        <div className="grid grid-cols-2 md:hidden gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative text-center group transition-colors duration-300 rounded-lg p-4 sm:p-6 bg-white/5 hover:bg-green-400/5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.3 }} // 🔑 qayta-qayta ishlaydi
            >
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm sm:text-base font-medium group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: 4 column grid with lines */}
        <div className="hidden md:grid md:grid-cols-4 relative">
          {/* Horizontal line */}
          <div className="absolute top-0 left-0 right-0 h-[4px] md:h-[5px] lg:h-[7px] bg-green-400"></div>

          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 text-center group hover:bg-green-400/5 transition-colors duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.3 }} // 🔑 qayta ishlaydi
            >
              {/* Vertical lines */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[4px] md:w-[5px] lg:w-[7px] h-[25px] md:h-[35px] lg:h-[50px] bg-green-400"></div>

              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 group-hover:text-green-400 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
