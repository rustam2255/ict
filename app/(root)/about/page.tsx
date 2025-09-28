'use client'

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, easeInOut } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Metadata } from "next";
import Head from "next/head";





export default function AboutUs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const [particles, setParticles] = useState<{ x: number, y: number }[]>([]);
  const { t } = useTranslation()
  const backgroundY = useTransform(scrollY, [0, 500], [0, -100]);
  const floatingY = useTransform(scrollY, [0, 1000], [0, -50]);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  useEffect(() => {
    const arr = [...Array(10)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }));
    setParticles(arr);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 0.6,  type: "spring" as const, stiffness: 100 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <>
      <Head>
        <title>ICT Akademiyasi</title>
        <meta name="description" content="ICT Akademiyasi – zamonaviy IT texnologiyalari bo‘yicha 7 yillik tajribaga ega o‘quv markazi. Yoshlarni global IT bozorida muvaffaqiyatli mutaxassisga aylantiramiz." />
        <meta name="keywords" content="dasturlash kurslari, reactjs, vuejs, backend, IT loyihalar o'zbek tilida, Ict akademiyasi, ict academy, toshkentdagi dasturlash kurslari" />
        <link rel="icon" href="/logo.png" />
        <meta property="og:title" content="ICT Akademiyasi" />
        <meta property="og:description" content="ICT Akademiyasi – zamonaviy IT texnologiyalari bo‘yicha 7 yillik tajribaga ega o‘quv markazi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ictacademy.uz" />
        <meta property="og:image" content="https://ictacademy.uz/logo.png" />
      </Head>
      <div className="text-white w-full mx-auto min-h-screen font-inter  overflow-hidden">
        {/* 1. Animated Background Particles */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ y: backgroundY }}
        >
          {isClient && [...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* 2. Mouse Follower */}

        {/* Hero Section */}
        <motion.section
          className="relative flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 py-16 lg:py-24 gap-10 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 3-6. Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 border-2 border-emerald-400 opacity-20"
            variants={rotateVariants}
            animate="animate"
          />
          <motion.div
            className="absolute top-40 right-20 w-12 h-12 bg-emerald-400 rounded-full opacity-20"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-8 h-8 bg-emerald-300 opacity-30"
            variants={pulseVariants}
            animate="animate"
          />

          <motion.div
            className="lg:w-1/2 space-y-8"
            variants={itemVariants}
          >
            {/* 7. Animated title with letter reveal */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {t("about.name").split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* 8. Typing effect description */}
            <motion.p
              className="text-lg sm:text-xl leading-relaxed text-gray-200"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 , ease: easeInOut }}
            >
              {t("about.descr")}
            </motion.p>

            {/* 9. Animated button with glow effect */}
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <Link
                href="/courses"
                className="bg-[#10B981] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-[#059669] transition duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                {t("about.btn")}
              </Link>
            </motion.div>
          </motion.div>

          {/* 10. Enhanced 3D Hero Tech Animation */}
          <motion.div
            className="lg:w-1/2 relative"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 bg-emerald-400 rounded-full opacity-10 blur-3xl"
              variants={pulseVariants}
              animate="animate"
            />
            {/* 3D Hero Tech Animation */}
            <div className="relative w-full h-[500px] flex items-center justify-center">
              {/* Central Tech Node */}
              <motion.div
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-2xl"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: easeInOut }
                }}
                style={{
                  boxShadow: "0 0 40px rgba(16, 185, 129, 0.8)",
                }}
              >
                💻
              </motion.div>

              {/* Orbiting Tech Elements */}
              {isClient && ['🔧', '⚡', '📊', '🌐'].map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 border-2 border-white/30 shadow-lg flex items-center justify-center text-white font-bold"
                  animate={{
                    rotate: -360,
                    y: [0, -20, 0],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    y: { duration: 3 + i * 0.5, repeat: Infinity, ease: easeInOut, delay: i * 0.3 }
                  }}
                  style={{
                    left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 4)}%`,
                    top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 4)}%`,
                  }}
                >
                  {icon}
                </motion.div>
              ))}

              {/* Sparkling Code Bubbles */}
              {isClient && ['code', 'data', 'api', 'cloud'].map((label, i) => (
                <motion.div
                  key={label}
                  className="absolute w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-emerald-300 flex items-center justify-center text-white text-xs font-mono"
                  animate={{
                    y: [-30, 30, -30],
                    x: [-10, 10, -10],
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: easeInOut,
                    delay: i * 0.4
                  }}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + (i % 2) * 40}%`,
                  }}
                >
                  {label.slice(0, 2)}
                </motion.div>
              ))}

              {/* Connection Lines with Sparkle */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {isClient && [0, 1, 2, 3].map((i) => (
                    <motion.line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={`${200 + 120 * Math.cos((i * Math.PI * 2) / 4)}`}
                      y2={`${200 + 120 * Math.sin((i * Math.PI * 2) / 4)}`}
                      stroke="rgba(16, 185, 129, 0.6)"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      animate={{
                        strokeDashoffset: [0, -15],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: easeInOut,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Glowing Innovation Badge */}
              <motion.div
                className="absolute bottom-8 left-8 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                animate={{
                  y: [-5, 5, -5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: easeInOut
                }}
              >
                INNOVATE
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          className="relative px-4 sm:px-8 lg:px-20 py-16 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* 11. Section title with underline animation */}
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12 relative"
            variants={itemVariants}
          >
            {t("about.whywe")}
            <motion.div
              className="absolute bottom-0 left-1/2 w-0 h-1 bg-emerald-400"
              initial={{ width: 0, x: "-50%" }}
              whileInView={{ width: "200px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              t("about.stage"),
              t("about.cowork"),
              t("about.laptop"),
              t("about.mentor"),
              t("about.sertificate"),
              t("about.practice"),
              t("about.job"),
              t("about.en"),
            ].map((reason, index) => (
              /* 12-19. Individual card animations */
              <motion.div
                key={index}
                className="bg-[rgba(62,189,128,9)] p-6 rounded-2xl shadow-xl relative overflow-hidden cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0"
                  animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.h3
                  className="text-lg font-semibold relative z-10"
                  animate={{
                    color: hoveredCard === index ? "#000" : "#ffffff"
                  }}
                >
                  {reason}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </motion.section>



        {/* Team Section */}
        <motion.section
          className="relative px-4 sm:px-8 lg:px-20 py-16 flex flex-col lg:flex-row items-center gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* 29-30. Background animated elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-emerald-400 rounded-full opacity-10"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-emerald-400 opacity-10 rounded-full"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* 31. Team content with slide animation */}
          <motion.div
            className="lg:w-1/2"
            variants={itemVariants}
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              whileInView={{ color: ["#ffffff", "#10B981", "#ffffff"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t("about.team")}
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl leading-relaxed text-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t("about.team_info")}
            </motion.p>
          </motion.div>

          {/* 32. Enhanced 3D Team Animation */}
          <motion.div
            className="lg:w-1/2 relative h-96 lg:h-[450px]"
            variants={itemVariants}
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-3xl opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* 3D Team Animation */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Team Members Circle */}
              <motion.div
                className="absolute w-40 h-40 rounded-full border-4 border-emerald-400 opacity-60"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: easeInOut }
                }}
              />

              {/* Team Member Avatars */}
              {isClient && [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold"
                  animate={{
                    rotate: -360,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    y: { duration: 2 + i * 0.3, repeat: Infinity, ease: easeInOut, delay: i * 0.2 }
                  }}
                  style={{
                    left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    transformOrigin: `${-35 * Math.cos((i * Math.PI * 2) / 6)}px ${-35 * Math.sin((i * Math.PI * 2) / 6)}px`,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}

              {/* Center Team Icon */}
              <motion.div
                className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-2xl"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: easeInOut }
                }}
                style={{
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.6)",
                }}
              >
                👥
              </motion.div>

              {/* Skill Bubbles */}
              {isClient && ['JS', 'PY', 'UI', 'DB'].map((skill, i) => (
                <motion.div
                  key={skill}
                  className="absolute w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-xs font-bold"
                  animate={{
                    y: [-15, 15, -15],
                    x: [-5, 5, -5],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: easeInOut,
                    delay: i * 0.4
                  }}
                  style={{
                    left: `${25 + i * 20}%`,
                    top: `${25 + (i % 2) * 50}%`,
                  }}
                >
                  {skill}
                </motion.div>
              ))}

              {/* Connection Lines */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <svg className="w-full h-full">
                  {isClient && [...Array(3)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + 40 * Math.cos((i * Math.PI * 2) / 3)}%`}
                      y2={`${50 + 40 * Math.sin((i * Math.PI * 2) / 3)}%`}
                      stroke="rgba(16, 185, 129, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      animate={{
                        strokeDashoffset: [0, -10],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Floating Experience Years */}
              <motion.div
                className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                animate={{
                  y: [-5, 5, -5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: easeInOut
                }}
              >
                7+ YIL
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* 33. Scroll progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-emerald-400 z-50 origin-left"
          style={{ scaleX: useTransform(scrollY, [0, 2000], [0, 1]) }}
        />
      </div>
    </>

  );
}