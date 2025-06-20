import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file || typeof file.name !== 'string') {
    return NextResponse.json({ error: 'لم يتم تحديد ملف صالح' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}_${file.name}`; // لضمان اسم فريد
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filePath = path.join(uploadDir, fileName);

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ success: true, path: `/uploads/${fileName}` });
  } catch (error) {
    console.error('خطأ أثناء الحفظ:', error);
    return NextResponse.json({ error: 'فشل الحفظ' }, { status: 500 });
  }
}
