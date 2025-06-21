'use client';

import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  id: number;
  title: string;
  price: string;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
  isAvailable?: boolean;
};

export default function ProductCard({
  id,
  title,
  price,
  image,
  isNew = false,
  isOnSale = false,
  isAvailable = true,
}: ProductCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-200">
      {/* الوسوم أعلى الكارد */}
      {(isNew || isOnSale || !isAvailable) && (
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 z-10">
          {isNew && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">جديد</span>}
          {isOnSale && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">تخفيض</span>}
          {!isAvailable && <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">غير متوفر</span>}
        </div>
      )}

      {/* ✅ صورة المنتج - بدون قص */}
      <div className="w-full h-64 relative bg-white">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* معلومات المنتج */}
      <div className="p-4 text-center">
        <h3 className="text-sm text-gray-600">{title}</h3>
        <p className="text-lg font-bold text-green-600 mt-1">{price} MAD</p>

        {/* الأزرار */}
        <div className="flex flex-col gap-2 mt-4">
          <Link href={`/product/${id}`} className="bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
            🔍 عرض التفاصيل
          </Link>
          <button className="bg-yellow-400 text-black py-1.5 rounded hover:bg-yellow-500">
            🛒 اطلب الآن
          </button>
          <a
            href={`https://wa.me/212600000000?text=أرغب في طلب المنتج: ${title}`}
            target="_blank"
            className="bg-green-500 text-white py-1.5 rounded hover:bg-green-600"
          >
            واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
