import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import products from '@/data/products.json';

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
  isNew?: boolean;
  isOnSale?: boolean;
  isAvailable?: boolean;
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) return notFound();

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto py-10 px-4 bg-white min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ✅ صورة المنتج بدون قص */}
          <div className="relative w-full h-[500px] bg-white border rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
            {(product.isNew || product.isOnSale || !product.isAvailable) && (
              <div className="absolute top-2 left-2 flex gap-2 z-10">
                {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">جديد</span>}
                {product.isOnSale && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">تخفيض</span>}
                {!product.isAvailable && <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">غير متوفر</span>}
              </div>
            )}
          </div>

          {/* التفاصيل */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.title}</h1>
            <p className="text-green-600 text-xl font-semibold mb-2">{product.price} MAD</p>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/order/${product.id}`}
                className="flex-1 text-center bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
              >
                🛒 اطلب الآن
              </Link>
              <a
                href={`https://wa.me/212657788860?text=${encodeURIComponent(
                  `أرغب في شراء المنتج: ${product.title}`
                )}`}
                target="_blank"
                className="flex-1 text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                واتساب
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
