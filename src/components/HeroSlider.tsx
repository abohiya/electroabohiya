'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/images/slider/slider1.png',
  '/images/slider/slider2.png',
  '/images/slider/slider3.png',
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-md">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className="object-cover"
            unoptimized
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
