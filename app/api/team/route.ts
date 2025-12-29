import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const team = await prisma.teamMember.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(team);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        slug: body.slug || body.name.toLowerCase().replace(/ /g, '-'),
      }
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
