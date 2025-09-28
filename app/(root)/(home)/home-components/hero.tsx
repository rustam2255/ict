
"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGetCoursesBannerQuery } from "@/service/api";
import { CourseBanner } from "@/interfaces";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";
import Loading from "../../_components/loading";
import Error from "../../_components/error";
import Link from "next/link";
import { truncateWords } from "@/utils/words";

const HeroSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error } = useGetCoursesBannerQuery({
    limit: 6,
    offset: 0,
    lang,
  });
  const courses: CourseBanner[] = data?.results || [];
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Dastlab video ovozsiz
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Birinchi kursni tanlash
  useEffect(() => {
    if (courses.length > 0 && selectedCourse === null) {
      setSelectedCourse(courses[0].id);
    }
  }, [courses]);

  // Video o‘ynashini va muted holatini boshqarish
  useEffect(() => {
    if (!videoRef.current || !selectedCourse) return;

    const video = videoRef.current;
    const selectedVideo = courses.find((c) => c.id === selectedCourse)?.video || "/video/test.MP4";

    // Video manbasini o‘zgartirish
    if (video.src !== selectedVideo) {
      video.src = selectedVideo;
      video.load(); // Yangi manbani yuklash
    }

    // Muted holatini yangilash
    video.muted = isMuted;

    if (isPlaying) {
      video.play().catch((err) => {
        console.error("Video play failed:", err);
        setIsPlaying(false); // Xato yuz bersa, isPlaying ni o‘chirish
      });
    } else {
      video.pause();
    }
  }, [isPlaying, isMuted, selectedCourse, courses]);

  if (isLoading) return <Loading />;


  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const activeCourse = courses.find((c) => c.id === selectedCourse) || null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative group w-full mx-auto shadow-[7px_4px_4px_0px_rgba(0,0,0,0.25)] h-[45vh] md:h-[65vh] lg:h-[75vh] rounded-[23px] overflow-hidden"
    >
      {/* Video yoki image */}
      <div className="absolute inset-0 mx-auto  bg-black">
        {!isPlaying ? (
          <Image
            src={activeCourse?.banner || "/images/hero.jpg"}
            alt={activeCourse?.name || "hero"}
            fill
            className="rounded-[23px] object-cover  "
          />
        ) : (
          <div className="w-full h-full aspect-video">
            <video
              ref={videoRef}
              loop
              muted={isMuted} // Dinamik muted holati
              playsInline
              className="w-full h-full  rounded-[23px]"
              onEnded={() => setIsPlaying(false)}
              onError={(e) => {
                console.error("Video error:", e);
                setIsPlaying(false); // Xato yuz bersa, rasmga qaytish
              }}
            />
          </div>
        )}
      </div>

      {/* Soya */}
      {!isPlaying && (
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-[350px] hidden xl:flex justify-center items-center flex-col sm:max-w-[450px] md:max-w-[630px] rounded-[23px] rounded-tr-[150px] md:rounded-tr-[250px] shadow-[32px_4px_4px_0px_rgba(0,0,0,0.25)]  md:h-[70vh] lg:h-[80vh] absolute top-0 left-0 bg-gradient-to-b from-[#1d573b]/75 to-[#0D2537]/75"
        >
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-semibold text-[48px] text-white"
          >
            {activeCourse?.name || "Select a course"}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-medium text-[16px] md:text-[20px] text-gray-200 text-center mt-3"
          >
            {activeCourse?.description
              ? truncateWords(activeCourse.description, 20)
              : "Choose a course to see its description here."}
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex mt-20 justify-start   gap-2"
          >
            <button className="px-[10px] py-[5px] sm:px-[14px] sm:py-[6px] lg:px-[30px] lg:py-[8px] bg-[#0B2234] rounded-[15px] sm:rounded-[20px] lg:rounded-[45px] border-2 border-green-400 cursor-pointer hover:scale-105 transition">
              <Link href={"/contact"}>
                <p className="text-[14px] sm:text-[16px] lg:text-[24px] text-white font-semibold">
                  Get Started
                </p>
              </Link>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Play/pause tugmalar */}
      {!isPlaying ? (
        <motion.div
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="absolute rounded-full flex text-center opacity-[90%] items-center justify-center top-[40%] left-1/2 -translate-x-1/2 bg-[#D9D9D9] w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] cursor-pointer"
        >
          <Play className="w-[35px] h-[40px] sm:w-[55px] sm:h-[65px] lg:w-[67px] lg:h-[75px] text-black" />
        </motion.div>
      ) : (
        <motion.div
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="absolute rounded-full flex text-center items-center justify-center top-[40%] left-1/2 -translate-x-1/2 bg-[#D9D9D9] w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] cursor-pointer opacity-0 group-hover:opacity-100 transition"
        >
          <Pause className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] text-black" />
        </motion.div>
      )}

      {/* Ovoz tugmasi (o‘ng yuqori burchakda) */}
      {isPlaying && (
        <motion.div
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="absolute rounded-full flex text-center items-center justify-center top-[10px] right-[10px] bg-[#D9D9D9] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] cursor-pointer opacity-[90%] group-hover:opacity-100 transition"
        >
          {isMuted ? (
            <VolumeX className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] lg:w-[30px] lg:h-[30px] text-black" />
          ) : (
            <Volume2 className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] lg:w-[30px] lg:h-[30px] text-black" />
          )}
        </motion.div>
      )}

      {/* Pastdagi kurslar */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute rounded-l-full w-[180px] sm:w-[200px] lg:w-[221px] h-[70px] sm:h-[80px] lg:h-[84px] bg-[#D9D9D9] bottom-0 right-0 flex items-center pl-5"
      >
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setSelectedCourse(course.id);
              setIsPlaying(false);
            }}
            className={`relative z-${courses.length - index} w-full pl-1`}
            style={{ marginLeft: index === 0 ? 0 : "-50%" }}
          >
            <Image
              src={course.banner}
              alt={course.name}
              width={45}
              height={45}
              className={`rounded-full border-2 w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] lg:w-[60px] lg:h-[60px] border-white cursor-pointer transition ${selectedCourse === course.id
                  ? "ring-2 sm:ring-3 lg:ring-4 ring-green-400"
                  : ""
                }`}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;