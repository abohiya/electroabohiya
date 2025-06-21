'use client';

import Image from 'next/image';

export default function HeroSlider() {
  return (
    <section className="w-full bg-[#0052CC] text-white py-16 px-4 md:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      {/* النص */}
      <div className="flex-1 text-center md:text-right">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
          أقوى العروض
        </h1>
        <p className="text-lg mb-6">خصومات على أحدث المنتجات</p>
        <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-100 transition">
          تسوق الآن
        </button>
      </div>

      {/* الصورة */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/images/slider/hero-slide.jpg"
          alt="Laptop Hero"
          width={500}
          height={400}
          className="object-contain rounded-xl shadow-lg"
          priority
        />
      </div>
    </section>
  );
}
