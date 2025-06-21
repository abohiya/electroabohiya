// src/components/Header.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* الشعار */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Electro Abohiya Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-gray-800">Electro Abohiya</span>
          </div>
        </Link>

        {/* (إضافة عناصر أخرى إذا رغبت لاحقاً) */}
      </div>
    </header>
  );
}
