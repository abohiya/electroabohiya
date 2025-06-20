'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟');
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      alert('حدث خطأ أثناء الحذف.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">إدارة المنتجات</h1>
          <Link href="/admin/products/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              + إضافة منتج
            </button>
          </Link>
        </div>

        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-200">
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
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-12 w-12 object-cover mx-auto"
                  />
                </td>
                <td className="p-2 border">
                  <Link
                    href={`/product/${product.id}`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="p-2 border">{product.price}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border space-x-2 flex justify-center gap-2 flex-wrap">
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
                  <Link href={`/product/${product.id}`} target="_blank">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                      عرض
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
