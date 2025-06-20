
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
}

export default function OrderProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      const found = data.find((p: Product) => p.id === parseInt(params.id as string));
      setProduct(found);
    };

    fetchProduct();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return alert('يرجى ملء الاسم ورقم الهاتف');
    setLoading(true);

    const orderData = {
      productId: product?.id,
      productTitle: product?.title,
      name,
      phone,
      notes,
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setName('');
      setPhone('');
      setNotes('');
    } else {
      alert('حدث خطأ أثناء إرسال الطلب');
    }
  };

  if (!product) return <p className="text-center p-8">جاري تحميل المنتج...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">🛒 طلب منتج: {product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-56 object-cover rounded mb-4" />
      <p className="text-green-600 font-semibold mb-1">{product.price}</p>
      <p className="text-gray-500 mb-4">{product.description}</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="الاسم الكامل"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="رقم الهاتف"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <textarea
          placeholder="ملاحظات إضافية (اختياري)"
          className="w-full border p-2 rounded"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'جاري الإرسال...' : '📤 إرسال الطلب'}
        </button>

        {success && <p className="text-green-600 mt-3">✅ تم إرسال الطلب بنجاح!</p>}
      </form>
    </div>
  );
}
