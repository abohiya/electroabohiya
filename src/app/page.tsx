'use client';

import Image from 'next/image';
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';

const categories = [
  { key: 'pc', label: 'حواسيب', image: '/images/categories/pc.png' },
  { key: 'phone', label: 'هواتف', image: '/images/categories/phone.png' },
  { key: 'monitor', label: 'شاشات حاسوب', image: '/images/categories/monitor.png' },
  { key: 'gaming-pc', label: 'حاسوب ألعاب', image: '/images/categories/gaming-pc.png' },
  { key: 'tv', label: 'تلفاز', image: '/images/categories/tv.png' },
];

export default function HomePage() {
  const [filteredCategory, setFilteredCategory] = useState('all');

  const filteredProducts =
    filteredCategory === 'all'
      ? products
      : products.filter((p) => p.category === filteredCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-12 pt-24">
        <HeroSlider />

        {/* 🔘 قسم الفئات الدائرية */}
        <div className="flex flex-wrap gap-6 justify-center my-10 px-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
              onClick={() => setFilteredCategory(cat.key)}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow border border-gray-300">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm sm:text-base font-medium text-gray-800">{cat.label}</p>
            </div>
          ))}
        </div>

        {/* 🛒 المنتجات */}
        <section className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
}
