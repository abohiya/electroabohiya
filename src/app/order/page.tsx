
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

async function getProduct(id: number) {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(data);
  return products.find((p: any) => p.id === id);
}

export default async function OrderProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(parseInt(params.id));

  if (!product) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">🛒 طلب منتج: {product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-56 object-cover rounded mb-4" />
      <p className="text-green-600 font-semibold mb-1">{product.price}</p>
      <p className="text-gray-500 mb-4">{product.description}</p>

      <form className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="notes"
          placeholder="ملاحظات إضافية (اختياري)"
          className="w-full border p-2 rounded"
          rows={3}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          onClick={() =>
            window.open(
              `https://wa.me/212657788860?text=${encodeURIComponent(
                `مرحبًا، أود طلب هذا المنتج:

📦 ${product.title}
💰 السعر: ${product.price}`
              )}`,
              '_blank'
            )
          }
        >
          إرسال الطلب عبر واتساب
        </button>
      </form>
    </div>
  );
}
