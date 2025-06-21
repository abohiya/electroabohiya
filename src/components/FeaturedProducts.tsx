// ✅ FeaturedProducts.tsx
"use client";

import Image from "next/image";
import products from "@/data/products.json";

export default function FeaturedProducts() {
  return (
    <section className="py-12 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        منتجات جديدة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products
          .filter((product) => product.isNew)
          .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="rounded mb-4 object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.title}
              </h3>
              <p className="text-blue-600 font-bold mb-2">{product.price}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                طلب الآن
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
