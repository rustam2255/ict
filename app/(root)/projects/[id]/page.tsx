'use client'
import { useGetProjectDetailQuery } from '@/service/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import Loading from '../../_components/loading'
import Error from '../../_components/error'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'

const ProjectDetail = () => {
  const { id } = useParams()
  const { i18n, t } = useTranslation()
  const lang = i18n.language;
  const { data, isLoading, error } = useGetProjectDetailQuery({ id: Number(id), lang })
  if (isLoading) return <Loading />
  if (error) return <Error />

  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta name="description" content={data?.description} />
        <meta property="og:title" content={data?.name} />
        <meta property="og:description" content={data?.description} />
        <meta property="og:image" content={data?.photo || '/images/logo.png'} />
      </Head>
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="w-full max-w-full mx-auto rounded-[23px] border border-gray-300 p-4 sm:p-6 md:p-8 lg:p-10 bg-slate-900/40 backdrop-blur-md"
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl">
              {data?.name}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <motion.div
                className="border border-gray-300 rounded-[9px] text-center flex items-center justify-center p-1 w-full sm:w-[122px] h-[32px] bg-[#0B2234]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="font-bold text-sm sm:text-base">Web site</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={data?.url || ''}
                  className="border border-gray-300 rounded-[9px] text-center flex items-center justify-center p-1 w-full sm:w-[122px] h-[32px] bg-[#0B2234]"
                  target='_blank'
                >
                  <p className="font-bold text-sm sm:text-base">{t("project.go")}</p>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8 md:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              width={1095}
              height={425}
              src={data?.photo || '.images/logo/png'}
              alt={data?.name || 'Logo'}
              className="w-full h-auto max-h-[425px] object-cover rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm sm:text-base text-center text-slate-300 leading-relaxed">
              {data?.description}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>

  )
}

export default ProjectDetail
