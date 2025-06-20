'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  isNew?: boolean;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => alert('فشل تحميل المنتجات'));
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-100 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">جميع المنتجات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-green-600 font-semibold">{product.price}</p>
            {product.isNew && (
              <span className="inline-block mt-1 px-2 py-1 bg-red-500 text-white text-xs rounded">
                جديد
              </span>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
