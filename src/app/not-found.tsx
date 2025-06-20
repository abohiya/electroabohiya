'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen p-6 bg-yellow-100 text-yellow-800 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">الصفحة غير موجودة</h1>
      <p className="mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        العودة للصفحة الرئيسية
      </Link>
    </main>
  );
}
