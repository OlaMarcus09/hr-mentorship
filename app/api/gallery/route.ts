import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, category, caption } = body;

    const newImage = await prisma.galleryImage.create({
      data: { image, category, caption }
    });
    
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.galleryImage.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
