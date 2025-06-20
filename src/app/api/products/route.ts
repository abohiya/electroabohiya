
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/data/products.json');

// ✅ GET: جلب جميع المنتجات
export async function GET() {
  try {
    const jsonData = await readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

// ✅ POST: إضافة منتج جديد
export async function POST(req: NextRequest) {
  const newProduct = await req.json();

  try {
    const jsonData = await readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const productWithId = { id: newId, ...newProduct };

    products.push(productWithId);
    await writeFile(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true, product: productWithId });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء الحفظ' }, { status: 500 });
  }
}

// ✅ PUT: تعديل منتج موجود
export async function PUT(req: NextRequest) {
  try {
    const updatedProduct = await req.json();
    const jsonData = await readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);

    const index = products.findIndex((p: any) => p.id === updatedProduct.id);
    if (index === -1) {
      return NextResponse.json({ error: 'لم يتم العثور على المنتج' }, { status: 404 });
    }

    products[index] = updatedProduct;
    await writeFile(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('خطأ أثناء التحديث:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء التحديث' }, { status: 500 });
  }
}

// ✅ DELETE: حذف منتج
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'لم يتم تحديد معرف المنتج' }, { status: 400 });
    }

    const jsonData = await readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);
    const updatedProducts = products.filter((p: any) => p.id !== Number(id));

    await writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('خطأ في الحذف:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء الحذف' }, { status: 500 });
  }
}
