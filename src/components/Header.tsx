'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Electro Abohiya
        </Link>
        <nav className="flex gap-6 text-gray-700 font-medium">
          <Link href="/">الرئيسية</Link>
          <Link href="#products">المنتجات</Link>
          <Link href="/admin" className="text-blue-600 hover:underline">
            لوحة التحكم
          </Link>
        </nav>
      </div>
    </header>
  );
}
