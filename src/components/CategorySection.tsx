// ✅ CategorySection.tsx
"use client";

import Image from 'next/image';

const categories = [
  {
    title: 'حواسيب',
    image: '/images/categories/laptop.jpg',
    alt: 'Laptop Category',
  },
  {
    title: 'هواتف',
    image: '/images/categories/phone.jpg',
    alt: 'Phone Category',
  },
  {
    title: 'إكسسوارات',
    image: '/images/categories/accessory.jpg',
    alt: 'Accessory Category',
  },
];

export default function CategorySection() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">الفئات</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <Image src={cat.image} alt={cat.alt} width={160} height={160} className="rounded mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">{cat.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
