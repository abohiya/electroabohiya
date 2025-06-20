'use client';

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="min-h-screen p-6 bg-red-100 text-red-800 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">حدث خطأ ما!</h1>
      <p className="mb-6">عذراً، حدث خطأ أثناء تحميل الصفحة.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        العودة للصفحة الرئيسية
      </Link>
    </main>
  );
}
