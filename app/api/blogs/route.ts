import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// READ (Get all)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // If ID is provided, fetch single blog (for editing)
  if (id) {
    const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
    return NextResponse.json(blog);
  }

  // Otherwise fetch all
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(blogs);
}

// CREATE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        author: body.author,
        content: body.content,
        image: body.image || null
      }
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

// UPDATE (New!)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, author, content, image } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: { title, author, content, image }
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.blog.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
