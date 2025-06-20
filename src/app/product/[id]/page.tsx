'use client';

import { useParams } from 'next/navigation';
import products from '@/data/products.json';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const params = useParams();
  const product = products.find((p) => String(p.id) === params.id);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        ❌ المنتج غير موجود
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
        <img
          src={`/${product.image}`}
          alt={product.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
        <p className="text-orange-600 font-bold text-lg mb-2">{product.price}</p>
        <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`https://wa.me/212657788860?text=أريد طلب منتج: ${encodeURIComponent(product.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold"
          >
            طلب الآن عبر واتساب
          </a>
          <Link
            href="/"
            className="flex-1 text-center bg-gray-300 hover:bg-gray-400 text-black py-3 rounded font-semibold"
          >
            العودة للمنتجات
          </Link>
        </div>
      </div>
    </main>
  );
}
