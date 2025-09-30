'use client'

import { Courses } from '@/interfaces'
import { useGetCoursesQuery } from '@/service/api'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

interface CourseCardProps {
  course: Courses
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 })
  const { t } = useTranslation()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full"
    >
      <Link
        href={`/courses/${course.id}`}
        className="w-full cursor-pointer h-full rounded-[12px] flex flex-col p-3 sm:p-4 lg:p-5 bg-[#0A1E2E] min-h-[280px] sm:min-h-[320px] lg:min-h-[350px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <p className="font-semibold text-[16px] sm:text-[20px] lg:text-[24px] text-white">
              {course.name}
            </p>
          </div>
          <button className="flex items-center justify-center text-[10px] sm:text-[12px] lg:text-[14px] font-semibold bg-green-400 text-black px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-[6px] sm:rounded-[8px] hover:bg-green-300 transition-colors duration-300 whitespace-nowrap">
            {t("coursepage.continue")}
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-green-400 mb-3 sm:mb-4"></div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-[14px] sm:text-[16px] lg:text-[18px] text-white mb-1">
            {t("coursepage.moduls")}
          </h3>

          {/* Modules */}
          <div className="space-y-1 sm:space-y-1">
            {course.moduls?.length > 0 ? (
              course.moduls.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center">
                  <Dot className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-400 flex-shrink-0" />
                  <p className="text-[12px] sm:text-[14px] text-gray-300">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No modules available</p>
            )}

          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const CourseSection = () => {
  const { i18n, t } = useTranslation()
  const lang = i18n.language;
  const { data, error, isLoading } = useGetCoursesQuery({
    limit: 6,
    offset: 0,
    lang
  })

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
        <h2 className="font-bold text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[36px] text-white text-center">
          {t("coursepage.title")}
        </h2>
        <p className="font-medium text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] text-center text-[#BFBABA] max-w-4xl leading-relaxed">
          {t("coursepage.descr")}
        </p>
      </div>
      {isLoading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error loading courses</p>}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-7 mb-8 sm:mb-10 lg:mb-12">
        {data?.results.map((course: Courses) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Explore Button */}
      <div className="flex items-center justify-center">
        <Link href={'/courses'}>
          <button className="w-[200px] sm:w-[220px] lg:w-[240px] h-[40px] sm:h-[45px] lg:h-[50px] text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-black text-center cursor-pointer flex items-center justify-center rounded-[35px] sm:rounded-[40px] lg:rounded-[45px] border-2 border-green-700 bg-gradient-to-l from-[#3EFEA1] to-[#259860] hover:from-[#2FE091] hover:to-[#1F8050] transition-all duration-300 hover:scale-105">
            {t("coursepage.btn")}
          </button>
        </Link>

      </div>
    </motion.div>
  )
}

export default CourseSection
