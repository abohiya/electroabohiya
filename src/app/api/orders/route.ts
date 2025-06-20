import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const orders = JSON.parse(fileContents);
    return NextResponse.json(orders);
  } catch (error) {
    console.error('فشل تحميل ملف الطلبات:', error);
    return new NextResponse('فشل تحميل الطلبات', { status: 500 });
  }
}
