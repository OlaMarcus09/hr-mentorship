import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjusted import to match your project structure

export const dynamic = 'force-dynamic';

// Helper: Strip # if present
const normalizeId = (id: string | null | undefined): string | null => {
  if (!id) return null;
  return id.startsWith('#') ? id.substring(1) : id;
};

// Helper: Find ID in URL or Body
const extractId = async (request: NextRequest): Promise<string | null> => {
  // 1. Try URL Query Params (?id=...)
  const { searchParams } = new URL(request.url);
  const queryId = searchParams.get('id');
  
  if (queryId) return normalizeId(queryId);
  
  // 2. Try JSON Body
  try {
    // Clone request to read body safely
    const body = await request.clone().json(); 
    return normalizeId(body.id);
  } catch (error) {
    return null;
  }
};

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

// PATCH: Handle Accept/Reject
export async function PATCH(request: NextRequest) {
  try {
    const id = await extractId(request);
    
    if (!id) {
      return NextResponse.json({ error: 'Applicant ID is required' }, { status: 400 });
    }
    
    // We need the body for the 'status' field
    const body = await request.json();
    const { status } = body;
    
    if (!status || !['Accepted', 'Rejected', 'Pending'].includes(status)) {
      return NextResponse.json({ error: 'Valid status required' }, { status: 400 });
    }
    
    const updatedApplicant = await prisma.applicant.update({
      where: { id },
      data: { status },
    });
    
    return NextResponse.json({ success: true, applicant: updatedApplicant });
    
  } catch (error: any) {
    console.error('Update Error:', error);
    if (error.code === 'P2025') return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update applicant' }, { status: 500 });
  }
}

// DELETE: Handle Removal
export async function DELETE(request: NextRequest) {
  try {
    const id = await extractId(request);
    
    if (!id) {
      return NextResponse.json({ error: 'Applicant ID is required' }, { status: 400 });
    }
    
    await prisma.applicant.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
    
  } catch (error: any) {
    console.error('Delete Error:', error);
    if (error.code === 'P2025') return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete applicant' }, { status: 500 });
  }
}
