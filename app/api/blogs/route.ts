import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;

  // Single Blog
  if (id) {
    const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
    return NextResponse.json(blog);
  }

  // Paginated List
  const [blogs, total] = await prisma.$transaction([
    prisma.blog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, excerpt: true, author: true, image: true, createdAt: true } // Exclude heavy content
    }),
    prisma.blog.count()
  ]);

  return NextResponse.json({
    blogs,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        author: body.author,
        content: body.content,
        excerpt: body.excerpt || body.content.substring(0, 150) + "...", // Auto-generate excerpt
        image: body.image || null
      }
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
// ... (PUT/DELETE remain same as previous step, omitted for brevity but assumed present)
