'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Order {
  id: number;
  productId: number;
  productTitle: string;
  name: string;
  phone: string;
  notes: string;
  date: string;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch('/api/orders');
        const data: Order[] = await res.json();
        const foundOrder = data.find((o) => o.id === orderId) || null;
        setOrder(foundOrder);
      } catch (error) {
        console.error('Failed to fetch order', error);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p className="p-6">لم يتم العثور على الطلب.</p>;
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">تفاصيل الطلب #{order.id}</h1>
      <p><strong>المنتج:</strong> {order.productTitle}</p>
      <p><strong>الاسم:</strong> {order.name}</p>
      <p><strong>الهاتف:</strong> {order.phone}</p>
      <p><strong>ملاحظات:</strong> {order.notes}</p>
      <p><strong>التاريخ:</strong> {new Date(order.date).toLocaleString('ar-MA')}</p>
    </main>
  );
}
