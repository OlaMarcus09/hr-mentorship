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

// POST: Create Applicant (Application Form)
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

// PATCH: HANDLE ACCEPT / REJECT
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Get ID from Body (Since URL fragment # might be stripped)
    let id = body.id;

    // 2. Fallback: Get ID from URL
    if (!id) {
        const { searchParams } = new URL(request.url);
        id = searchParams.get('id');
    }

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // 3. Clean the ID (Remove #)
    const cleanedId = String(id).trim().replace(/^#/, '');
    const status = body.status; // "Accepted" or "Rejected"

    // 4. Update Database
    const updated = await prisma.applicant.update({
      where: { id: cleanedId },
      data: { status }
    });

    return NextResponse.json({ success: true, applicant: updated });
  } catch (error) {
    console.error("Patch Error:", error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

// DELETE: HANDLE REMOVAL
export async function DELETE(request: Request) {
  try {
    let id = null;

    // 1. Try URL Params first
    const { searchParams } = new URL(request.url);
    id = searchParams.get('id');

    // 2. If no ID in URL, try Body
    if (!id) {
        try {
            const body = await request.json();
            id = body.id;
        } catch (e) {
            // Body might be empty, ignore error
        }
    }

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // 3. Clean ID
    const cleanedId = String(id).trim().replace(/^#/, '');

    // 4. Delete from Database
    await prisma.applicant.delete({
      where: { id: cleanedId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: 'Failed to delete applicant' }, { status: 500 });
  }
}
