'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import products from '@/data/products.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import type { Product } from '@/types'; // ❌ غير مستخدم وتم التعليق عليه

export default function ProductDetailsPage() {
  const params = useParams();
  const id = parseInt(params?.id as string);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-lg font-semibold">المنتج غير موجود</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative w-full h-80">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-green-600 text-xl font-semibold mb-4">{product.price} MAD</p>
            <p className="text-gray-700 mb-6">تفاصيل أو وصف المنتج يمكن وضعه هنا.</p>
            <a
              href={`/order/${product.id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
            >
              طلب هذا المنتج
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
