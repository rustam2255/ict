"use client";

import Image from "next/image";
import React from "react";
import { useGetNewsQuery } from "@/service/api";
import { News } from "@/interfaces";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const NewsSection = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language;
  const { data, isLoading, isError } = useGetNewsQuery({ limit: 3, offset: 0, lang });

  if (isLoading) {
    return <p className="text-center py-10">Yuklanmoqda...</p>;
  }

  if (isError) {
    return <p className="text-center py-10 text-red-500">Xatolik yuz berdi ❌</p>;
  }

  if (!data || data.results.length === 0) {
    return <p className="text-center py-10">Yangiliklar topilmadi</p>;
  }

  return (
    <div className="w-full flex flex-col gap-5 mt-5 h-full">
      {data.results[0] && (
        <motion.div
          className="relative w-full h-[200px] md:h-[399px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Link
            href={`/news/${data.results[0].id}`}>
            <Image
              src={data.results[0].image || "/images/new_first.png"}
              alt={data.results[0].name}
              fill
              className="rounded-lg object-cover"
            />
          </Link>



        </motion.div>
      )}

      {/* Keyingi 3 ta kichik yangilik */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-11">
        {data.results.slice(1, 4).map((item: News, index: number) => (
          <motion.div
            key={item.id}
            className="flex flex-col flex-1" // har bir item teng tarqaladi
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Link href={`/news/${item.id}`} className="block w-full">
              <div className="relative w-full aspect-[429/245] rounded-lg overflow-hidden">
                <Image
                  src={item.image || "/images/new_second.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="mt-2">
              <p className="text-[14px] text-[#C4C4C4]">
                {new Date().toLocaleDateString("uz-UZ")}
              </p>
              <p className="text-[16px] font-bold line-clamp-2">
                {item.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default NewsSection;
