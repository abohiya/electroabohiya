'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
  isOnSale?: boolean;
  isAvailable?: boolean;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => alert('فشل تحميل المنتجات'));
  }, []);

  const categories = [
    { key: 'all', label: 'الكل', image: '/images/categories/all.png' },
    { key: 'pc', label: '💻 حواسيب', image: '/images/categories/pc.png' },
    { key: 'phone', label: '📱 هواتف', image: '/images/categories/phone.png' },
    { key: 'gaming-pc', label: '🎮 حاسوب ألعاب', image: '/images/categories/gaming-pc.png' },
    { key: 'monitor', label: '🖥️ شاشات', image: '/images/categories/monitor.png' },
    { key: 'tv', label: '📺 تلفاز', image: '/images/categories/tv.png' },
  ];

  const filteredProducts =
    filteredCategory === 'all'
      ? products
      : products.filter((p) => p.category === filteredCategory);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pb-12 pt-24">
        {/* 🔁 سلايدر الهيرو */}
        <HeroSlider />

        {/* 🟢 الفئات الدائرية بالصور */}
        <div className="max-w-6xl mx-auto px-4 mt-12">
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilteredCategory(cat.key)}
                className={`flex flex-col items-center gap-2 ${
                  filteredCategory === cat.key ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                } transition`}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 🛍️ المنتجات */}
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4 mt-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              isNew={product.isNew}
              isOnSale={product.isOnSale}
              isAvailable={product.isAvailable}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
