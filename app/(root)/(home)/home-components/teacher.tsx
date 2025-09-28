
"use client";

import { useGetTeacherQuery } from "@/service/api";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { getCurrentLang } from "@/utils/getCurrentLang";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const TeacherSection = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { data: teachersData, isLoading, error } = useGetTeacherQuery({ limit: 10, offset: 0, lang });

  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const currentOffset = useRef(0);
  const animationRef = useRef<number>(null);
  const fullSetWidthRef = useRef(0);
  const speed = 0.3; 
  const cardsPerView = 2; 
  const cardWidth = 200; 

  useEffect(() => {
    if (teachersData?.results && teachersData.results.length > 0) {
      setSelectedTeacherId(teachersData.results[0].id);
    }
  }, [teachersData]);

  // Full set kengligini hisoblash
  useEffect(() => {
    if (innerRef.current && teachersData?.results.length) {
      // Duplikat soniga qarab (3 ta bo'lgani uchun /3)
      fullSetWidthRef.current = innerRef.current.scrollWidth / 3;
    }
  }, [teachersData]);

  // Animatsiya
  useEffect(() => {
    if (!teachersData?.results.length || !fullSetWidthRef.current) return;

    const animate = () => {
      if (!isPaused && innerRef.current) {
        currentOffset.current -= speed;
        let offset = currentOffset.current;

        // Seamless sikl
        if (offset <= -fullSetWidthRef.current) {
          offset += fullSetWidthRef.current;
        }

        innerRef.current.style.transform = `translateX(${offset}px)`;
        currentOffset.current = offset;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [teachersData?.results.length, isPaused]);

  // Pause/resume event listeners
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);

    container.addEventListener("touchstart", handlePause, { passive: true });
    container.addEventListener("mousedown", handlePause, { passive: true });
    container.addEventListener("touchend", handleResume, { passive: true });
    container.addEventListener("mouseup", handleResume);
    container.addEventListener("mouseleave", handleResume);

    return () => {
      container.removeEventListener("touchstart", handlePause);
      container.removeEventListener("mousedown", handlePause);
      container.removeEventListener("touchend", handleResume);
      container.removeEventListener("mouseup", handleResume);
      container.removeEventListener("mouseleave", handleResume);
    };
  }, []);

  const selectedTeacher = teachersData?.results.find((teacher) => teacher.id === selectedTeacherId);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Video yuklanganda va holat o'zgarganda initial holatni sozlash
  useEffect(() => {
    if (!videoRef.current || !selectedTeacher?.video) return;

    const video = videoRef.current;
    const videoSrc = selectedTeacher.video;

    // Manba o'zgarganda yuklash
    if (video.src !== videoSrc) {
      video.src = videoSrc;
      video.load(); // Yangi manbani yuklash
    }

    // Muted holatini yangilash
    video.muted = isMuted;

    // O'ynash holatini boshqarish
    if (isPlaying) {
      video.play().catch((err) => {
        console.error("Video play failed:", err);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }

    // Xatolarni boshqarish uchun hodisa qo'shish
    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setIsPlaying(false);
    };

    video.addEventListener("error", handleError);
    video.addEventListener("loadeddata", () => {
      console.log("Video loaded successfully");
    });

    return () => {
      video.removeEventListener("error", handleError);
    };
  }, [selectedTeacher?.video, isMuted, isPlaying]);

  const togglePlay = async () => {
    if (!videoRef.current || !selectedTeacher?.video) return;
    
    try {
      const video = videoRef.current;
      if (isPlaying) {
        video.pause();
      } else {
        // Mobil uchun muted va playsInline ta'minlangan
        await video.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Video play/pause failed:", err);
      setIsPlaying(false); // Xato bo'lsa, rasm holatiga qaytish
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  // Duplikat qilingan teacherlar ro'yxati seamless sikl uchun
  const duplicatedTeachers = teachersData?.results
    ? [...teachersData.results, ...teachersData.results, ...teachersData.results]
    : [];

  // Container kengligini cheklash (2 ta karta + gap)
  const containerStyle = {
    width: `100%`,
    maxWidth: `100%`,
    overflow: "hidden",
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="sm:mt-4 w-full mx-auto lg:mt-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold text-white text-center lg:text-left">
          {t("teacherpage.title")}
        </h2>
        <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-300 text-center lg:text-left leading-relaxed mt-2 sm:mt-3 lg:mt-4 mb-6 lg:mb-4">
          {t("teacherpage.descr")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-4 sm:mt-6 lg:mt-8 items-start">
        {/* Teachers List - Left (desktop), Carousel (mobile) */}
        <div className="w-full lg:w-[330px] rounded-xl">
          {/* 📱 Mobile Carousel */}
          <div className="lg:hidden" ref={carouselRef} style={containerStyle}>
            <div
              ref={innerRef}
              className="flex gap-4 will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {duplicatedTeachers.map((teacher, index) => (
                <div
                  key={`${teacher.id}-${index}`}
                  className="min-w-[calc(50%-0.5rem)] flex-shrink-0 flex flex-col items-center bg-[#1A2F3F] p-4 rounded-lg cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedTeacherId(teacher.id)}
                >
                  <Image
                    src={teacher.avatar || "/default-avatar.png"}
                    alt={`${teacher.first_name} ${teacher.last_name}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
                    width={64}
                    height={64}
                  />
                  <p className="text-white text-sm font-semibold mt-2 text-center">
                    {teacher.first_name} {teacher.last_name}
                  </p>
                  <p className="text-gray-400 text-xs">{teacher.job || "Front end developer"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 💻 Desktop List */}
          <div className="hidden lg:block space-y-3">
            {teachersData?.results.map((teacher) => (
              <div
                key={teacher.id}
                className="flex relative items-center gap-3 bg-[#1A2F3F] p-3 rounded-lg cursor-pointer transition-all duration-200"
                onClick={() => setSelectedTeacherId(teacher.id)}
              >
                <Image
                  src={teacher.avatar || "/default-avatar.png"}
                  alt={`${teacher.first_name} ${teacher.last_name}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                  width={48}
                  height={48}
                />
                <div
                  className={`absolute right-2 top-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                    selectedTeacherId === teacher.id
                      ? "bg-green-500 shadow-lg"
                      : "bg-white hover:bg-slate-700"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">
                    {teacher.first_name} {teacher.last_name}
                  </p>
                  <p className="text-gray-400 text-xs">{teacher.job || "Front end developer"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Details - Right Side */}
        <div className="flex-1">
          {selectedTeacher && (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Video Section */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full lg:w-[500px] lg:h-[526px]"
              >
                {selectedTeacher.video && (
                  <div className="relative z-10">
                    <video
                      ref={videoRef}
                      loop
                      muted={isMuted}
                      playsInline // Mobil uchun muhim: to'liq ekran bo'lmasligi
                      preload="auto" // Oldindan yuklash
                      className="w-full h-[526px] rounded-lg shadow-lg object-cover pointer-events-none"
                      onLoadedData={() => {
                        console.log("Video yuklandi");
                        if (videoRef.current) {
                          videoRef.current.muted = isMuted;
                        }
                      }}
                      onError={(e) => {
                        console.error("Video yuklanmadi:", e);
                      }}
                    >
                      {/* Source tegi mobil mosligi uchun */}
                      <source src={selectedTeacher.video} type="video/mp4" />
                      Video yuklanmadi. Brauzeringizni yangilang.
                    </video>

                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/20 pointer-events-auto">
                      <button
                        onClick={togglePlay}
                        className="p-5 rounded-full bg-[#D9D9D9] transition z-20"
                      >
                        {isPlaying ? (
                          <Pause size={40} stroke="white" fill="white" />
                        ) : (
                          <Play size={40} stroke="white" fill="white" />
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="bg-black/60 p-2 rounded-full hover:bg-black/80 transition absolute bottom-4 right-4 z-20"
                      >
                        {isMuted ? (
                          <VolumeX size={24} className="text-white" />
                        ) : (
                          <Volume2 size={24} className="text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Info Section */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full space-y-6"
              >
                <p className="text-white text-[16px] leading-relaxed">
                  {getCurrentLang(selectedTeacher.bio, lang) ||
                    "Lorem Ipsum placeholder text..."}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A2F3F] p-4 rounded-lg text-center h-[95px]">
                    <p className="text-white text-2xl font-bold">
                      {selectedTeacher.year || 7}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{t("teacherpage.stage")}</p>
                  </div>

                  <div className="bg-[#1A2F3F] p-4 rounded-lg text-center h-[95px]">
                    <p className="text-white text-2xl font-bold">
                      {selectedTeacher.student_count || "500+"}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{t("teacherpage.count_student")}</p>
                  </div>

                  <div className="bg-[#1A2F3F] p-4 rounded-lg text-center h-[95px]">
                    <p className="text-white text-2xl font-bold">
                      {selectedTeacher.projects || 72}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{t("teacherpage.all_project")}</p>
                  </div>

                  <div className="bg-[#1A2F3F] p-4 rounded-lg text-center h-[95px]">
                    <span className="text-black bg-green-400 rounded-full px-4 py-1 inline-block text-sm font-bold">
                      {selectedTeacher.status || "Senior"}
                    </span>
                    <p className="text-gray-400 text-xs mt-2">{t("teacherpage.status")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherSection;
