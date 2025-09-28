"use client";
import { useGetCourseDetailQuery } from "@/service/api";
import { getMediaUrl } from "@/utils/get";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

import Loading from "../../_components/loading";
import Error from "../../_components/error";
import { useTranslation } from "react-i18next";
import Head from "next/head";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const { data, isLoading, error } = useGetCourseDetailQuery({
    id: Number(id),
    lang,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta name="description" content={data?.description} />
        <meta property="og:title" content={data?.name} />
        <meta property="og:description" content={data?.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={data?.banner || "/images/hero_courses.png"}
        />
        <meta
          name="keywords"
          content="ICT Akademiyasi, IT kurslar, dasturlash, Frontend, Backend"
        />
      </Head>

      <div>
  

        {/* Content */}
        <div className="w-[98%] xs:w-[96%] sm:w-[94%] md:w-[92%] lg:w-[90%] xl:w-[88%] mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-6">
          <motion.h2
            className="font-bold text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-white text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t("coursepage.info_course")}
          </motion.h2>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* left sidebar */}
            <motion.div
              className="bg-[#0A1E2E] p-4 w-full xl:w-[360px] col-span-1 xl:col-span-3 max-h-[730px] overflow-y-auto relative rounded-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#10B981 #1F2937",
              }}
            >
              <h3 className="text-center mb-3 font-semibold text-lg text-white">
                {data?.name}
              </h3>

              {data?.moduls?.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  <h4 className="text-sm md:text-base mt-2 mb-2 font-semibold text-white">
                    Module {index + 1}: {module.name}
                  </h4>
                  <ul className="list-disc ml-2 list-inside text-gray-300 space-y-1">
                    {module.themes.map((theme: string, i: number) => (
                      <li key={i} className="text-sm">
                        {theme}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* main content */}
            <motion.div
              className="col-span-1 xl:col-span-9 xl:ml-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed">
                {data?.description}
              </p>

              <motion.h3
                className="font-semibold text-xl mt-6 text-center text-white"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {t("coursepage.info_teach")}
              </motion.h3>

              <div className="flex flex-col lg:flex-row gap-6 mt-5">
                {/* video */}
                <motion.div
                  className="relative w-full lg:w-[281px] h-[220px] sm:h-[320px] lg:h-[425px] mx-auto lg:mx-0"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  {data?.teachers?.[0]?.video && (
                    <>
                      <video
                        ref={videoRef}
                        loop
                        muted={isMuted}
                        className="w-full h-full rounded-lg shadow-lg object-cover"
                        src={getMediaUrl(data.teachers?.[0]?.video)}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20">
                        <button
                          onClick={togglePlay}
                          className="p-3 rounded-full bg-[#D9D9D9] transition"
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white" />
                          )}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="bg-black/60 p-2 rounded-full hover:bg-black/80 transition absolute bottom-3 right-3"
                        >
                          {isMuted ? (
                            <VolumeX className="w-6 h-6 text-white" />
                          ) : (
                            <Volume2 className="w-6 h-6 text-white" />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* teacher info */}
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="font-medium text-sm md:text-base text-[#D9D9D9] leading-relaxed">
                    {data?.teachers?.[0]?.bio}
                  </p>

                  {/* cards */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      {
                        value: data?.teachers?.[0]?.year,
                        label: t("teacherpage.stage"),
                      },
                      {
                        value: data?.teachers?.[0]?.student_count,
                        label: t("teacherpage.count_student"),
                      },
                      {
                        value: data?.teachers?.[0]?.projects,
                        label: t("teacherpage.all_project"),
                      },
                      {
                        value: data?.teachers?.[0]?.status,
                        label: t("teacherpage.status"),
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="h-[90px] bg-[#0A1E2E] flex flex-col text-center items-center justify-center rounded-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 * i }}
                      >
                        <span className="font-bold text-white text-2xl lg:text-3xl">
                          {item.value}
                        </span>
                        <p className="font-medium text-xs text-[#D9D9D9]">
                          {item.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
