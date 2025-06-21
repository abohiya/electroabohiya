'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // ✅ ستايل السلايدر

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
    { key: 'all', label: 'الكل' },
    { key: 'laptop', label: '💻 حواسيب' },
    { key: 'phone', label: '📱 هواتف' },
    { key: 'accessory', label: '🎧 إكسسوارات' },
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
        <div className="w-full max-w-7xl mx-auto mb-16 overflow-hidden rounded-xl">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            className="rounded-xl"
          >
            {['hero1.jpg', 'hero2.jpg', 'hero3.jpg'].map((file, index) => (
              <div key={index} className="relative w-full h-[400px]">
                <Image
                  src={`/images/banners/${file}`}
                  alt={`Hero Banner ${index + 1}`}
                  fill
                  className="object-cover rounded-xl"
                  priority={index === 0}
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* 🔘 تصفية الفئات */}
        <div id="products" className="max-w-6xl mx-auto px-4 mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilteredCategory(cat.key)}
                className={`px-4 py-2 rounded-full font-medium border ${
                  filteredCategory === cat.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 📦 المنتجات */}
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4">
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
    </>
  );
}
