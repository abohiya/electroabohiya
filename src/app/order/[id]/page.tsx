'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
  isNew?: boolean;
}

export default function OrderPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.id === Number(id));
        setProduct(found || null);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-24 text-red-600 font-bold">
        لم يتم العثور على المنتج
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">تأكيد الطلب</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={200}
            className="rounded-md object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-green-600 font-semibold mb-2">{product.price}</p>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <a
              href={`https://wa.me/212657788860?text=${encodeURIComponent(
                `أرغب في طلب المنتج: ${product.title} بسعر ${product.price}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              إرسال الطلب عبر واتساب
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ⬅️ العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
