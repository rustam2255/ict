"use client";

import { motion } from "framer-motion";
import React from "react";

// Dasturlash belgilar
const symbols = ["{ }", "</>", "const", "fn()", "=>", ";"];

// Gradient variantlari
const gradients = [
  "bg-gradient-to-r from-green-400 to-emerald-600",
  "bg-gradient-to-r from-cyan-400 to-blue-600",
  "bg-gradient-to-r from-green-400 to-emerald-600",
  "bg-gradient-to-r from-green-400 to-emerald-600",
];

// Nechta belgi chiqaramiz (20-30 ta bo‘lsa ekranni to‘ldiradi)
const totalSymbols = 25;

const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {Array.from({ length: totalSymbols }).map((_, i) => {
        const sym = symbols[i % symbols.length];
        const gradient = gradients[i % gradients.length];

        // Random joylashuv va o‘lcham
        const randomTop = Math.random() * 100;
        const randomLeft = Math.random() * 100;
        const sizes = ["text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl", "text-7xl"];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

        return (
          <motion.span
            key={i}
            className={`absolute font-extrabold select-none text-transparent bg-clip-text opacity-60 ${gradient} ${randomSize}`}
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
            }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 6, // har xil tezlik
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {sym}
          </motion.span>
        );
      })}
    </div>
  );
};

export default BackgroundShapes;
