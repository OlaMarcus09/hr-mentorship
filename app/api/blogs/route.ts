import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' }});
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We are trusting the Frontend sent a valid URL for 'image'
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content || '',
        author: body.author || 'Team',
        image: body.image || null, // Save the URL
      }
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating blog' }, { status: 500 });
  }
}
