'use client'
import Image from 'next/image'
import React from 'react'
import { CourseCard } from '../(home)/home-components/courses'
import { Courses } from '@/interfaces'
import { useGetCoursesQuery } from '@/service/api'
import Loading from '../_components/loading'
import Error from '../_components/error'
import { motion, Transition } from 'framer-motion'

import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import CourseBackground from '../_components/animate-corse'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cubicBezier: Transition['ease'] = [0.25, 0.1, 0.25, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier, // endi TS xato bermaydi
    },
  },
};




const CorsePage = () => {
  const { i18n, t } = useTranslation()
  const lang = i18n.language;
  const { data, error, isLoading } = useGetCoursesQuery({
    limit: 6,
    offset: 0,
    lang
  })
  if (isLoading) return <Loading />
  

  return (
    <>
      <Head>
        <title>{t('coursepage.title')}</title>
        <meta name="description" content={t('coursepage.descr')} />
        <meta property="og:title" content={t('coursepage.title')} />
        <meta property="og:description" content={t('coursepage.descr')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ictacademy.uz/courses" />
        <meta property="og:image" content="/images/hero_courses.png" />
        <meta name="keywords" content="ICT Akademiyasi, IT kurslar, dasturlash, Frontend, Backend" />
      </Head>
      <CourseBackground />
      <motion.div
        className="overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >


        {/* Content */}
        <motion.div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-3 lg:py-9"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col items-center justify-center   mb-8 sm:mb-10 lg:mb-12"
            variants={itemVariants}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold  ">
              {t("coursepage.title")}
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mx-auto leading-relaxed text-center">
              {t("coursepage.descr")}
            </p>
          </motion.div>

          {/* Courses Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12"
            variants={containerVariants}
          >
            {data?.results.map((course: Courses) => (
              <motion.div
                key={course.id}
                className="w-full"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default CorsePage
