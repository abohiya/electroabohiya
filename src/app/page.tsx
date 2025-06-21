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

        {/* 🟢 الفئات الدائرية */}
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
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 🛒 المنتجات */}
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4 mt-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-200"
            >
              {/* الوسوم */}
              {(product.isNew || product.isOnSale || !product.isAvailable) && (
                <div className="absolute top-2 right-2 flex flex-wrap gap-1 z-10">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                      جديد
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                      تخفيض
                    </span>
                  )}
                  {!product.isAvailable && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
                      غير متوفر
                    </span>
                  )}
                </div>
              )}

              {/* صورة المنتج */}
              <div className="w-full h-48 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* محتوى البطاقة */}
              <div className="p-4 text-center">
                <h3 className="text-sm text-gray-600">{product.title}</h3>
                <p className="text-lg font-bold text-green-600 mt-1">{product.price} MAD</p>
                <p className="text-green-600 text-sm mt-1">متوفر في المخزون</p>
                <p className="text-sm text-gray-600 mb-3 truncate">{product.description}</p>

                {/* الأزرار */}
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href={`/product/${product.id}`}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    🔍 عرض التفاصيل
                  </Link>
                  <Link
                    href={`/order/${product.id}`}
                    className="bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
                  >
                    🛒 اطلب الآن
                  </Link>
                  <a
                    href={`https://wa.me/212657788860?text=${encodeURIComponent(
                      'أرغب في شراء المنتج: ' + product.title
                    )}`}
                    target="_blank"
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    واتساب
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
