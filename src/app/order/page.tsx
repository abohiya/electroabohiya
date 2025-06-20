'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: string;
}

export default function OrderPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => alert('فشل تحميل المنتجات'));
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-100 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">اختر المنتج للطلب</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <Link href={`/order/${product.id}`} className="block text-blue-600 hover:underline">
              {product.title} - {product.price}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
