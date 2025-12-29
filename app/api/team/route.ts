import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { id: 'asc' } });
    return NextResponse.json(team);
  } catch (error) {
    console.error("GET Team Error:", error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.role) {
      return NextResponse.json({ error: 'Name and Role are required' }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image || "https://via.placeholder.com/400x500?text=No+Image", // Default image
        slug: body.slug || body.name.toLowerCase().replace(/ /g, '-'),
      }
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error("POST Team Error:", error);
    return NextResponse.json({ error: 'Failed to create team member', details: String(error) }, { status: 500 });
  }
}
