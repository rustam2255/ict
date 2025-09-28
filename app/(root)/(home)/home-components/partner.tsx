"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PartnersSlider = () => {
  const logos = [
    "/images/org1.png",
    "/images/org2.png",
    "/images/org3.png",
    "/images/org4.png",
    "/images/org5.png",
    "/images/org6.png",
    "/images/org3.png",
  ];

  // Duplicate logos for infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let requestId: number;
    const speed = 0.5; // px per frame, o'zgartirib tezlikni sozlash mumkin

    const animate = () => {
      setScrollX((prev) => {
        const maxScroll = container.scrollWidth / 2; // duplicated array
        return prev >= maxScroll ? 0 : prev + speed;
      });
      requestId = requestAnimationFrame(animate);
    };

    requestId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestId);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 sm:mt-6 md:mt-8 bg-gradient-to-l h-auto min-h-[80px] sm:min-h-[100px] md:min-h-[130px] lg:min-h-[160px] flex items-center bg-[linear-gradient(90deg,rgba(62,189,128,0.34)_0%,rgba(29,87,59,0.34)_100%)] rounded-lg p-2 sm:p-4 md:p-5 overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-6 whitespace-nowrap"
        style={{ transform: `translateX(-${scrollX}px)` }}
      >
        {duplicatedLogos.map((logo, i) => (
          <div
            key={i}
            className="flex-none w-[150px] h-[150px] flex items-center justify-center"
          >
            <Image
              src={logo}
              alt={`logo-${i}`}
              width={150}
              height={150}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSlider;
