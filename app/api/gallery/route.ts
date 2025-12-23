import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newImage = await prisma.galleryImage.create({
      data: { 
        imageUrl: body.image || body.imageUrl, 
        title: body.caption || body.title || "",
        category: body.category || "General"
      }
    });
    
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
  }
}
