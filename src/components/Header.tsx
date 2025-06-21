'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Electro Abohiya
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            الرئيسية
          </Link>
          <Link href="#products" className="text-gray-700 hover:text-blue-600 transition">
            المنتجات
          </Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition">
            لوحة التحكم
          </Link>
        </nav>
      </div>
    </header>
  );
}
