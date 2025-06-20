'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // 🔄 انتظر لحظة قبل إعادة التوجيه ليتم حفظ الكوكي
        setTimeout(() => {
          router.push('/admin/products');
        }, 200);
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">🔐 تسجيل دخول المشرف</h1>
        <input
          type="password"
          placeholder="كلمة المرور"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          دخول
        </button>
      </form>
    </main>
  );
}
