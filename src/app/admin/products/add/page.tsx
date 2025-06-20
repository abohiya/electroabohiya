'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !imageFile || !category || !description) {
      setError('جميع الحقول مطلوبة');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!uploadRes.ok) {
      setError('فشل رفع الصورة');
      return;
    }

    const uploadData = await uploadRes.json();
    const imagePath = uploadData.path;

    const newProduct = {
      title,
      price,
      category,
      description,
      image: imagePath,
    };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      router.push('/admin/products');
    } else {
      setError('حدث خطأ أثناء إضافة المنتج');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="bg-white max-w-2xl mx-auto rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-right">🆕 إضافة منتج جديد</h1>

        {error && <p className="text-red-600 mb-4 text-right">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-right">العنوان</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-right">السعر</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-right">الوصف</label>
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-right">الصورة</label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="upload"
                className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition"
              >
                اختر صورة
              </label>
              <span className="text-gray-600 text-sm">
                {imageFile ? imageFile.name : 'لم يتم اختيار أي صورة بعد'}
              </span>
            </div>
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-40 object-contain rounded border"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-right">القسم</label>
            <select
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">اختر قسمًا</option>
              <option value="حواسيب">💻 حواسيب</option>
              <option value="هواتف">📱 هواتف</option>
              <option value="إكسسوارات">🎧 إكسسوارات</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition text-lg font-bold"
          >
            ➕ إضافة المنتج
          </button>
        </form>
      </div>
    </div>
  );
}