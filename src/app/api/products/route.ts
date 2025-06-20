import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.json');

export async function GET() {
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newProduct = await req.json();

    const jsonData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const productWithId = { id: newId, ...newProduct };

    products.push(productWithId);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true, product: productWithId });
  } catch {
    return NextResponse.json({ error: 'حدث خطأ أثناء الحفظ' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    if (!id) return NextResponse.json({ error: 'معرف المنتج غير صالح' }, { status: 400 });

    const jsonData = await fs.readFile(filePath, 'utf-8');
    let products = JSON.parse(jsonData);

    products = products.filter((p: { id: number }) => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'حدث خطأ أثناء الحذف' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedProduct = await req.json();

    const jsonData = await fs.readFile(filePath, 'utf-8');
    let products = JSON.parse(jsonData);

    products = products.map((p: { id: number }) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'حدث خطأ أثناء التحديث' }, { status: 500 });
  }
}
