import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const image = await prisma.galleryImage.create({
      data: {
        title: body.title,
        category: body.category,
        imageUrl: body.imageUrl,
      }
    });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    if (!id) throw new Error("ID required");
    
    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
