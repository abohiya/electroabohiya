'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('laptop');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !category || !image || !description) {
      alert('الرجاء ملء جميع الحقول.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', image);

    try {
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

      const newProduct = {
        title,
        price,
        category,
        image: uploadData.url,
        description,
        isNew,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        alert('فشل إضافة المنتج.');
        setUploading(false);
        return;
      }

      alert('تم إضافة المنتج بنجاح!');
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('حدث خطأ غير متوقع.');
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">إضافة منتج جديد</h1>
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
          <input type="file" accept="image/*" onChange={handleImageChange} required />
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
          {uploading ? 'جارٍ الإضافة...' : 'إضافة المنتج'}
        </button>
      </form>
    </main>
  );
}
