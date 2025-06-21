'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
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

        {/* 📦 المنتجات */}
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4 mt-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition relative"
            >
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  جديد
                </span>
              )}
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h2>
              <p className="text-green-600 font-semibold mb-1">{product.price}</p>
              <p className="text-green-600 text-sm mt-1">متوفر في المخزون</p>
              <p className="text-sm text-gray-600 mb-3 truncate">{product.description}</p>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  🔍 عرض التفاصيل
                </Link>
                <Link
                  href={`/order/${product.id}`}
                  className="text-center bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                >
                  🛒 اطلب الآن
                </Link>
                <a
                  href={`https://wa.me/212657788860?text=${encodeURIComponent(
                    'أرغب في شراء المنتج: ' + product.title
                  )}`}
                  target="_blank"
                  className="text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  واتساب
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
