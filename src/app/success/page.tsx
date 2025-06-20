'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen p-6 bg-green-100 text-green-800 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">تم الطلب بنجاح!</h1>
      <p className="mb-6">شكراً لك على طلبك. سيتم التواصل معك قريبًا.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        العودة للصفحة الرئيسية
      </Link>
    </main>
  );
}
