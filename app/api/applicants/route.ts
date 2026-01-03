import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, linkedin, goal } = body;

    // Validate
    if (!name || !email || !role || !goal) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Check if email already applied
    const existing = await prisma.applicant.findFirst({
      where: { email, role } // Can apply for both roles, but not same role twice
    });

    if (existing) {
      return NextResponse.json({ error: 'You have already applied for this role.' }, { status: 409 });
    }

    const applicant = await prisma.applicant.create({
      data: {
        name,
        email,
        role, // 'MENTOR' or 'MENTEE'
        linkedin,
        goal,
        status: 'PENDING'
      }
    });

    return NextResponse.json(applicant, { status: 201 });
  } catch (error) {
    console.error('Application Error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
