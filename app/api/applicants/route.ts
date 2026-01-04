import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: Fetch All Applicants
export async function GET() {
  try {
    const applicants = await prisma.applicant.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(applicants);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applicants' }, { status: 500 });
  }
}

// POST: Create Applicant (For the Application Form)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const applicant = await prisma.applicant.create({
      data: body,
    });
    return NextResponse.json(applicant);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

// DELETE: Fix for Mentor/Mentee Delete Button
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // Get the text ID (e.g., cmjy...)

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Delete using the String ID
    await prisma.applicant.delete({
      where: { id } 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: 'Failed to delete applicant' }, { status: 500 });
  }
}
