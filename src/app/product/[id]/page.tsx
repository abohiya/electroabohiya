'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
  isNew: boolean;
  category: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/products');
        const data: Product[] = await res.json();
        const found = data.find((p) => p.id === productId) || null;
        setProduct(found);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) return <p className="p-6">المنتج غير موجود.</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-100 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-green-600 font-semibold mb-2">{product.price}</p>
      <p className="mb-4">{product.description}</p>
      <p>
        <strong>القسم:</strong> {product.category}
      </p>
      {product.isNew && (
        <span className="inline-block mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
          جديد
        </span>
      )}
    </main>
  );
}
