import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET Blog Error:", error); // Log error to terminal
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the received data to check for missing fields
    console.log("Receiving Blog Data:", body);

    // Validation
    if (!body.title || !body.content || !body.author) {
      console.error("Validation Error: Missing required fields");
      return NextResponse.json({ error: 'Title, Content, and Author are required' }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        excerpt: body.excerpt || body.content.substring(0, 150) + "...", // Auto-generate excerpt if missing
        content: body.content,
        author: body.author,
        image: body.image || null, // Handle empty image string
      }
    });

    console.log("Blog Created Successfully:", blog.id);
    return NextResponse.json(blog);

  } catch (error) {
    console.error("POST Blog Error:", error); // This will show the exact DB error in your terminal
    return NextResponse.json({ error: 'Failed to create blog', details: String(error) }, { status: 500 });
  }
}
