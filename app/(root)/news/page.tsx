"use client";

import { News } from "@/interfaces";
import { useGetNewsQuery } from "@/service/api";
import { ArrowUpRight, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Loading from "../_components/loading";
import Error from "../_components/error";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { motion, Transition } from "framer-motion";
import BackgroundShapes from "../_components/bg";


const cubicBezier: Transition["ease"] = [0.25, 0.1, 0.25, 1];

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier,
    },
  },
};

const NewsPage = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, isError } = useGetNewsQuery({ limit: 10, offset: 0, lang });

  const news: News[] = data?.results || [];

  if (isLoading) return <Loading />;
  

  return (
    <>
      <Head>
        <title>ICT Akademiyasi - {t("news.title")}</title>
        <meta name="description" content={t("news.descr")} />
        <meta property="og:title" content={`ICT Akademiyasi - ${t("news.title")}`} />
        <meta property="og:description" content={t("news.descr")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ictacademy.uz/news" />
        <meta property="og:image" content={news[0]?.image || "/logo.png"} />
        <meta name="keywords" content="ICT Akademiyasi, yangiliklar, IT, kurslar, o'zbek tilida, dasturlash" />
      </Head>

      <motion.div
        className="relative overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Orqa fon shakllar */}
        <BackgroundShapes />

        {/* Content */}
        <motion.div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-8 lg:py-9 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            className="flex flex-col items-center justify-center mb-8 sm:mb-10 lg:mb-12"
            variants={itemVariants}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              {t("news.title")}
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-center">
              {t("news.descr")}
            </p>
          </motion.div>

          {/* News Grid */}
          {news.length === 0 ? (
            <motion.div
              className="flex items-center justify-center min-h-[40vh]"
              variants={itemVariants}
            >
              <div className="text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 sm:p-12">
                <div className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-slate-600/30 to-slate-700/30 rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 xs:w-10 xs:h-10 text-slate-400" />
                </div>
                <h3 className="text-slate-300 text-lg xs:text-xl sm:text-2xl font-bold mb-2">
                  {t("news.notfound")}
                </h3>
                <p className="text-slate-500 text-sm xs:text-base">
                  {t("news.message")}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12"
              variants={containerVariants}
            >
              {news.map((article) => (
                <motion.div
                  key={article.id}
                  className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-green-700/30 rounded-xl overflow-hidden hover:border-green-500/40 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/10 hover:transform hover:-translate-y-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
                    <Image
                      src={article.image || "/logo.png"}
                      alt={article.name}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 ease-out"></div>
                    <div className="absolute top-3 left-3 xs:top-4 xs:left-4">
                      <span className="bg-gradient-to-r from-green-900 to-emerald-500 text-white px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-semibold backdrop-blur-sm">
                        {t("news.rating")}
                      </span>
                    </div>
                  </div>
                  <div className="relative p-4 xs:p-5 sm:p-6">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white group-hover:text-green-500 transition-all duration-300 mb-2 xs:mb-3 leading-tight">
                      {article.name}
                    </h3>
                    {article.description && (
                      <p className="text-slate-400 text-sm xs:text-base line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
                        {article.description}
                      </p>
                    )}
                    <div className="mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-slate-700/50">
                      <Link
                        href={`/news/${article.id}`}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 font-medium text-sm xs:text-base transition-colors duration-300 group-hover:translate-x-1"
                      >
                        {t("news.full")}
                        <ArrowUpRight className="w-4 h-4 xs:w-5 xs:h-5 transition-transform group-hover:rotate-45" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default NewsPage;
