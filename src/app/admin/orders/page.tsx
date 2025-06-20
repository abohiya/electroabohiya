'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: number;
  productId: number;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('فشل تحميل الطلبات:', err));
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        🧾 لوحة التحكم - الطلبات
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد طلبات حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg p-4 border">
              <h2 className="text-lg font-semibold mb-1 text-blue-700">
                طلب رقم: #{order.id}
              </h2>
              <p className="text-sm text-gray-800">
                👤 الزبون: {order.customerName}
              </p>
              <p className="text-sm text-gray-800">
                ☎️ الهاتف: {order.phone}
              </p>
              <p className="text-sm text-gray-800">
                🏠 العنوان: {order.address}
              </p>
              {order.notes && (
                <p className="text-sm text-gray-600 italic">
                  💬 ملاحظات: {order.notes}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                📅 تم الطلب في: {new Date(order.createdAt).toLocaleString()}
              </p>
              <Link
                href={`/product/${order.productId}`}
                className="mt-4 inline-block text-blue-600 hover:underline text-sm"
              >
                🔍 عرض المنتج
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
