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

// POST: Create Applicant
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

// DELETE: Robust Fix (Handles # symbols, Body, and Query Params)
export async function DELETE(request: Request) {
  try {
    let id: string | null = null;
    
    // 1. Try to get ID from request body (JSON)
    try {
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const body = await request.json().catch(() => null);
        if (body && body.id) {
          id = String(body.id);
        }
      }
    } catch (error) {
      console.log("Body parsing failed, trying URL params");
    }
    
    // 2. If not in body, try URL search parameters (?id=...)
    if (!id) {
      const { searchParams } = new URL(request.url);
      const urlId = searchParams.get('id');
      if (urlId) id = urlId;
    }
    
    // 3. Validate ID
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    // 4. CLEAN THE ID (Remove the # if it exists)
    const cleanedId = id.trim().replace(/^#/, '');
    
    console.log(`Deleting applicant: ${cleanedId}`);

    // 5. Execute Delete
    await prisma.applicant.delete({
      where: { id: cleanedId }
    });

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
    
  } catch (error: any) {
    console.error("Delete Error:", error);
    // Handle "Record not found" gracefully
    if (error.code === 'P2025') {
       return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete applicant' }, { status: 500 });
  }
}
