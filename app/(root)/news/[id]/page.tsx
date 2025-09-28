'use client'
import { useGetNewsDetailQuery } from '@/service/api';
import { useParams } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import Loading from '../../_components/loading';
import Error from '../../_components/error';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation()
  const lang = i18n.language;
  const { data, isLoading, error } = useGetNewsDetailQuery({ id: Number(id), lang }, { refetchOnMountOrArgChange: true });
  if (isLoading) return <Loading />
  if (error) return <Error />

  const newsDetail = data;

  return (
    <>
      <Head>
        <title>{newsDetail?.name}</title>
        <meta name="description" content={newsDetail?.description} />
        <meta property="og:title" content={newsDetail?.name} />
        <meta property="og:description" content={newsDetail?.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ictacademy.uz/news/${id}`} />
        <meta property="og:image" content={newsDetail?.image || '/logo.png'} />
        <meta name="keywords" content={`ICT Akademiyasi, yangiliklar, IT, kurslar, ${newsDetail?.name || ''}`} />
      </Head>
      <motion.div
        className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Rasm */}
        <motion.div
          className="relative overflow-hidden rounded-xl shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={newsDetail?.image || '/logo.png'}
            alt={newsDetail?.name || 'News image'}
            width={800}
            height={450}
            className="w-full xl:h-[450px]  h-[300px] "
          />
        </motion.div>

        {/* Title & Text */}
        <motion.div
          className="mt-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-emerald-300 bg-clip-text text-transparent leading-tight mb-6">
            {newsDetail?.name}
          </h1>

          {newsDetail?.description && (
            <motion.p
              className="text-slate-300 text-xl leading-relaxed mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {newsDetail.description}
            </motion.p>
          )}

          <motion.div
            className="prose prose-lg prose-invert max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div
              className="text-slate-200 leading-relaxed space-y-6 text-base lg:text-lg"
              dangerouslySetInnerHTML={{
                __html: newsDetail?.body?.replace(/\n/g, '<br />') || 'Matn mavjud emas'
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>

  );
}

export default NewsDetail;
