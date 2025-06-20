'use client';

import Link from 'next/link';

export default function AdminHome() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">لوحة التحكم الرئيسية</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <Link
            href="/admin/products"
            className="block p-6 bg-blue-100 hover:bg-blue-200 rounded text-center transition"
          >
            🛍️ إدارة المنتجات
          </Link>

          <Link
            href="/admin/orders"
            className="block p-6 bg-green-100 hover:bg-green-200 rounded text-center transition"
          >
            📦 إدارة الطلبات
          </Link>

          <Link
            href="/admin/stats"
            className="block p-6 bg-yellow-100 hover:bg-yellow-200 rounded text-center transition"
          >
            📊 الإحصائيات
          </Link>
        </div>
      </div>
    </main>
  );
}
