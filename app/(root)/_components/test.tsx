"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Test = () => {
  const { t } = useTranslation();

  const messages = [
    t("test.mes-first"),
    t("test.mes-second"),
    t("test.mes-first"),
    t("test.mes-second"),
  ];

  return (
    <div className="bg-gradient-to-b from-[#1d573b]/75 to-[#0D2537]/75 h-12 flex items-center overflow-hidden relative">
      <div className="whitespace-nowrap flex animate-marquee">
        {messages.map((msg, i) => (
          <span key={i} className="mx-8 text-white text-lg font-medium">
            {msg}
          </span>
        ))}
        {/* takrorlangan yozuvlar (infinite uchun) */}
        {messages.map((msg, i) => (
          <span key={`dup-${i}`} className="mx-8 text-white text-lg font-medium">
            {msg}
          </span>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Test;
