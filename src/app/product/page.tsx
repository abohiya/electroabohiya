'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">إدارة المنتجات</h1>
          <Link href="/admin/products/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              + إضافة منتج
            </button>
          </Link>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-right">
              <th className="p-2 border">الصورة</th>
              <th className="p-2 border">العنوان</th>
              <th className="p-2 border">السعر</th>
              <th className="p-2 border">القسم</th>
              <th className="p-2 border">التحكم</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2 border">
                  <img src={product.image} alt={product.title} className="h-12 w-12 object-cover" />
                </td>
                <td className="p-2 border">
                  <Link href={`/product/${product.id}`} className="text-blue-600 hover:underline">
                    {product.title}
                  </Link>
                </td>
                <td className="p-2 border">{product.price}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border space-x-2">
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                      تعديل
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
