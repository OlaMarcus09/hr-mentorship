import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Submit Application (Frontend uses this)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, linkedin, goal } = body;

    if (!name || !email || !role || !goal) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Check for existing application
    const existing = await prisma.applicant.findFirst({
      where: { email, role }
    });

    if (existing) {
      return NextResponse.json({ error: 'You have already applied for this role.' }, { status: 409 });
    }

    const applicant = await prisma.applicant.create({
      data: {
        name,
        email,
        role, // Saves as 'MENTOR' or 'MENTEE'
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

// GET: Fetch Applicants (Admin uses this)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roleParam = searchParams.get('role'); // Dashboard sends 'mentor' or 'mentee'

    // FIX: If role is provided, convert to UPPERCASE to match Database
    const where = roleParam ? { role: roleParam.toUpperCase() } : {};

    const applicants = await prisma.applicant.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applicants);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applicants' }, { status: 500 });
  }
}
