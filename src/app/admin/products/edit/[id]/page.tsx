'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  description: string;
  isNew: boolean;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('laptop');
  const [image, setImage] = useState<File | string>('');
  const [description, setDescription] = useState('');
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?id=${productId}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        if (data.length > 0) {
          const prod = data[0];
          setProduct(prod);
          setTitle(prod.title);
          setPrice(prod.price);
          setCategory(prod.category);
          setImage(prod.image);
          setDescription(prod.description);
          setIsNew(prod.isNew);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !category || !description) {
      alert('الرجاء ملء جميع الحقول.');
      return;
    }

    setUploading(true);

    let imageUrl = typeof image === 'string' ? image : '';

    try {
      if (typeof image !== 'string') {
        const formData = new FormData();
        formData.append('file', image);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          alert('حدث خطأ أثناء رفع الصورة.');
          setUploading(false);
          return;
        }
        imageUrl = uploadData.url;
      }

      const updatedProduct = {
        id: productId,
        title,
        price,
        category,
        image: imageUrl,
        description,
        isNew,
      };

      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        alert('فشل تحديث المنتج.');
        setUploading(false);
        return;
      }

      alert('تم تحديث المنتج بنجاح!');
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('حدث خطأ غير متوقع.');
      setUploading(false);
    }
  };

  if (loading) return <p className="p-6">جارٍ تحميل المنتج...</p>;
  if (!product) return <p className="p-6">المنتج غير موجود.</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">تعديل المنتج</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold mb-1">اسم المنتج</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">السعر</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">القسم</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="laptop">حواسيب</option>
            <option value="phone">هواتف</option>
            <option value="accessory">إكسسوارات</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">الوصف</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">صورة المنتج</label>
          {typeof image === 'string' ? (
            <Image
              src={image}
              alt={title}
              width={400}
              height={300}
              className="rounded mb-2"
            />
          ) : (
            <p>تم اختيار صورة جديدة</p>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            id="isNew"
          />
          <label htmlFor="isNew">منتج جديد</label>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'جارٍ التحديث...' : 'تحديث المنتج'}
        </button>
      </form>
    </main>
  );
}
