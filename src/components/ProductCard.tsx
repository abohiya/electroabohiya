'use client';

import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  isNew?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold truncate">{product.title}</h3>
      <p className="text-blue-600 font-bold">{product.price}</p>
      {product.isNew && (
        <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-2">
          جديد
        </span>
      )}
    </div>
  );
}
