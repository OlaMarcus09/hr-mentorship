import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const member = await prisma.teamMember.findUnique({ where: { id: parseInt(id) } });
    return NextResponse.json(member);
  }

  const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(team);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio,
        image: body.image,
        linkedin: body.linkedin
      }
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 });
  }
}
