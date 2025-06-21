// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      id: 1,
      title: 'حاسوب HP Pavilion',
      price: '6,990 MAD',
      image: '/uploads/laptop1.jpg', // مسار الصورة صحيح
      category: 'laptop',
      description: 'حاسوب قوي للمهام اليومية والألعاب الخفيفة',
      isNew: true,
    },
    {
      id: 2,
      title: 'iPhone 13 Pro',
      price: '12,500 MAD',
      image: '/uploads/iphone.jpg',
      category: 'phone',
      description: 'هاتف آيفون بإمكانيات عالية وتصميم أنيق',
    },
    {
      id: 3,
      title: 'سماعات Samsung Buds',
      price: '990 MAD',
      image: '/uploads/earbuds.jpg',
      category: 'accessory',
      description: 'سماعات لاسلكية بجودة صوت ممتازة',
    },
  ];

  return NextResponse.json(products);
}
