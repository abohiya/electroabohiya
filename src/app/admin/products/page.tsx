'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
  isNew: boolean;
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => alert('فشل تحميل المنتجات'));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('فشل الحذف');
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">إدارة المنتجات</h1>
      <Link href="/admin/products/add" className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        إضافة منتج جديد
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4 relative">
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
              className="rounded mb-3 object-cover"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-green-600 font-semibold mb-2">{product.price}</p>
            <p className="text-sm text-gray-600 mb-3">القسم: {product.category}</p>
            <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'متوفر في المخزون' : 'غير متوفر'}
            </p>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/admin/products/edit/${product.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                تعديل
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
