import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const app = await prisma.mentorshipApplication.create({
      data: {
        role: body.role,
        name: body.name,
        email: body.email,
        linkedin: body.linkedin,
        goal: body.goal,
        status: "PENDING"
      }
    });
    return NextResponse.json(app);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
