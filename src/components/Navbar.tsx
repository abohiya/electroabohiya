'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* العنوان على اليمين */}
          <div className="flex-shrink-0 text-blue-700 text-3xl font-extrabold rtl:order-2">
            <Link href="/">Electro Abohiya</Link>
          </div>

          {/* الروابط على اليسار مع مسافات متوسطة */}
          <div className="flex space-x-10 rtl:space-x-reverse rtl:order-1 text-lg">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-700 font-semibold transition"
            >
              الرئيسية
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-700 font-semibold transition"
            >
              المنتجات
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-700 font-semibold transition"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
