'use client';

import ProductCard from './ProductCard';
import products from '@/data/products.json';

export default function FeaturedProducts() {
  return (
    <section className="py-12 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">منتجات جديدة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            isNew={product.isNew}
            isOnSale={product.isOnSale}
            isAvailable={product.isAvailable}
          />
        ))}
      </div>
    </section>
  );
}
