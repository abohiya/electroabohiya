'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-blue-600 text-2xl font-bold">
              Electro Abohiya
            </Link>
          </div>
          <div className="space-x-4 rtl:space-x-reverse">
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
              لوحة التحكم
            </Link>
            <Link href="/admin/products" className="text-gray-700 hover:text-blue-600 font-medium">
              المنتجات
            </Link>
            <Link href="/admin/orders" className="text-gray-700 hover:text-blue-600 font-medium">
              الطلبات
            </Link>
            <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
              العودة للموقع
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
