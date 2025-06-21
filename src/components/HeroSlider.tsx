// src/components/HeroSlider.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = [
  '/banners/hero1.png',
  '/banners/hero2.png',
  '/banners/hero3.png',
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[300px] md:h-[450px] overflow-hidden relative rounded-xl shadow-md mt-4">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={src}
            alt={`slider-${index}`}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
