'use client';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-red-100 p-6 text-center">
          <div className="bg-white p-10 rounded shadow-md">
            <h1 className="text-3xl font-bold text-red-700 mb-4">حدث خطأ غير متوقع 😢</h1>
            <p className="text-gray-800 mb-4">{error.message}</p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              العودة إلى الصفحة الرئيسية
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
