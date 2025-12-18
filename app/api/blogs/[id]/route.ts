import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// FIX: This prevents Next.js from trying to run this during 'npm run build'
export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) }
    });
    return NextResponse.json(blog || { error: 'Not found' }, { status: blog ? 200 : 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        content: body.content,
        author: body.author
      }
    });
    return NextResponse.json({ message: 'Updated', updatedData: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.blog.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
