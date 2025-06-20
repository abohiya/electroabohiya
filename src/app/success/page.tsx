export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-green-100 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {/* أيقونة ✅ */}
        <div className="text-green-600 text-5xl mb-4">✅</div>

        {/* العنوان */}
        <h1 className="text-3xl font-bold mb-2 text-green-700">تم إرسال الطلب بنجاح!</h1>

        {/* رسالة تأكيد */}
        <p className="text-gray-600 mb-6">
          شكراً لك على ثقتك. سنتواصل معك قريبًا لتأكيد تفاصيل الطلب.
        </p>

        {/* زر العودة إلى الصفحة الرئيسية */}
        <a
          href="/"
          className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold mb-3 transition duration-200"
        >
          العودة إلى الصفحة الرئيسية
        </a>

        {/* زر العودة إلى المتجر / قسم المنتجات */}
        <a
          href="/#products"
          className="block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
        >
          مشاهدة المنتجات
        </a>
      </div>
    </main>
  )
}
