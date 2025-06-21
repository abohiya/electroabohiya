'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import products from '@/data/products.json';

export default function OrderPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!product) return <div className="text-center py-20 text-red-600">المنتج غير موجود</div>;

  const handleOrder = () => {
    if (!fullName || !phone || !address) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const message = `
🛒 طلب منتج:
المنتج: ${product.title}
السعر: ${product.price} MAD

👤 الاسم: ${fullName}
📞 الهاتف: ${phone}
📍 العنوان: ${address}
📝 ملاحظات: ${notes || 'لا شيء'}

تم الطلب من موقع Electro Abohiya.
    `;

    const whatsappLink = `https://wa.me/212657788860?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🛒 طلب المنتج</h1>

        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 border rounded-lg mb-10">
          <div className="w-full md:w-1/3 h-60 relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain rounded"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-green-600 text-lg font-bold">{product.price} MAD</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border space-y-4">
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="العنوان الكامل"
            value={address}
            onChange={(e) => setAddress(e.ta
