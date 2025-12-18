import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// FIX: Force this route to be dynamic (Server-Side only)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content || '',
        author: body.author || 'Team',
      }
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating blog' }, { status: 500 });
  }
}
