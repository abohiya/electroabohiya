export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 text-center">
      <div className="bg-white p-10 rounded shadow-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">404 - الصفحة غير موجودة</h1>
        <p className="text-gray-700 mb-4">عذرًا، الصفحة التي تبحث عنها غير موجودة.</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          الرجوع إلى الصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}
