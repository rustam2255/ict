"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGetStudentQuery } from "@/service/api";
import { Students } from "@/interfaces";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.05, ease: "easeOut" as const },
  },
};

export function truncateWords(text: string | null, limit: number = 20): string {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
}

interface StudentCardProps {
  course: Students;
}

const StudentCard: React.FC<StudentCardProps> = ({ course }) => {
  return (
    <motion.div
      className="w-full min-h-[205px] relative p-3 sm:p-4 md:p-5 rounded-[7px] bg-[#0A1E2E]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
        <Image
          src={course.avatar || "/images/student.jpg"}
          alt="Talaba"
          width={131}
          height={131}
          className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[131px] lg:h-[131px] object-cover mx-auto sm:mx-0 flex-shrink-0"
        />
        <div className="flex flex-col justify-between gap-3 sm:gap-4 md:gap-5 flex-1 text-center sm:text-left">
          <div>
            <p className="font-semibold text-lg sm:text-xl md:text-[24px] text-white">
              {course.first_name} {course.last_name}
            </p>

            {/* Bio */}
            <p
              className={`font-medium text-xs sm:text-sm md:text-[12px] text-gray-300 mt-1 sm:mt-2 leading-relaxed overflow-hidden`}
            >
              {course.bio || ""}
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-[20px] font-bold bg-gradient-to-l from-[#3EFEA1] to-[#259860] bg-clip-text text-transparent self-center sm:self-end">
            {course.job}
          </p>
        </div>
      </div>

      <Image
        src={"/logolight.png"}
        alt="Logotip"
        width={70}
        height={70}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-0 md:right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px]"
      />
    </motion.div>
  );
};

const StudentPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error } = useGetStudentQuery({ limit: 10, offset: 0, lang });

  const courses = data?.results || [];
  const duplicatedCourses = [...courses, ...courses, ...courses]; // 3 marta duplikat qilish, yanada silliq sikl uchun
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const currentOffset = useRef(0);
  const animationRef = useRef<number>(null);
  const fullSetHeightRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const speed = 0.3; // Sekin harakatlanish tezligi

  // Full set balandligini hisoblash
  useEffect(() => {
    if (innerRef.current && courses.length > 0) {
      // Duplikat soniga qarab (3 ta bo'lgani uchun /3)
      fullSetHeightRef.current = innerRef.current.scrollHeight / 3;
    }
  }, [courses]);

  // Animatsiya
  useEffect(() => {
    if (!courses.length || !fullSetHeightRef.current) return;

    const animate = () => {
      if (!isPaused && innerRef.current) {
        currentOffset.current -= speed;
        let offset = currentOffset.current;

        // Seamless sikl
        if (offset <= -fullSetHeightRef.current) {
          offset += fullSetHeightRef.current;
        }

        innerRef.current.style.transform = `translateY(${offset}px)`;
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
  }, [courses.length, isPaused, speed]);

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
    container.addEventListener("mouseleave", handleResume); // Agar sichqoncha tashqariga chiqsa

    return () => {
      container.removeEventListener("touchstart", handlePause);
      container.removeEventListener("mousedown", handlePause);
      container.removeEventListener("touchend", handleResume);
      container.removeEventListener("mouseup", handleResume);
      container.removeEventListener("mouseleave", handleResume);
    };
  }, []);

  // Container balandligini cheklash (taxminiy, 2 qator)
  const totalHeight = 250 * 2 + 50; // 2 qator + gap taxmin

  const containerStyle = {
    height: `${totalHeight}px`,
    overflow: "hidden",
  };

  if (isLoading) {
    return <div className="px-2 sm:px-4">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="px-2 sm:px-4">Xato yuz berdi.</div>;
  }

  return (
    <div className="px-2 sm:px-4">
      <div ref={carouselRef} className="relative" style={containerStyle}>
        <div
          ref={innerRef}
          className="grid gap-4 sm:gap-6 md:gap-9 grid-cols-1 xl:grid-cols-2 will-change-transform"
          style={{ transform: "translateY(0px)" }}
        >
          {duplicatedCourses.map((course, index) => (
            <div key={`${course.id}-${index}`} className="w-full">
              <StudentCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;