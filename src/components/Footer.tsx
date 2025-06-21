'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* الشعار والوصف */}
        <div>
          <Image
            src="/images/logo-footer.png"
            alt="Electro Abohiya Logo"
            width={180}
            height={40}
            className="mb-4 object-contain"
          />
          <p className="text-sm text-gray-400">
            Electro Abohiya هو المتجر الرائد لبيع الحواسيب، الهواتف، الإكسسوارات، وخدمات الصيانة بأفضل الأسعار.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/products">المنتجات</Link></li>
            <li><Link href="/services">خدماتنا</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>

        {/* معلومات */}
        <div>
          <h3 className="text-lg font-bold mb-4">معلومات</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">سياسة الخصوصية</Link></li>
            <li><Link href="#">شروط الاستخدام</Link></li>
            <li><Link href="#">الأسئلة الشائعة</Link></li>
          </ul>
        </div>

        {/* تواصل معنا */}
        <div>
          <h3 className="text-lg font-bold mb-4">تابعنا</h3>
          <div className="flex items-center gap-4 mb-4">
            <Link href="#"><i className="fab fa-facebook text-xl"></i></Link>
            <Link href="#"><i className="fab fa-instagram text-xl"></i></Link>
            <Link href="#"><i className="fab fa-whatsapp text-xl"></i></Link>
          </div>
          <Image
            src="/images/payment-card.png"
            alt="بطاقات الدفع"
            width={180}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        جميع الحقوق محفوظة © Electro Abohiya 2025
      </p>
    </footer>
  );
}
