import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE APPLICANT
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await prisma.applicant.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

// UPDATE STATUS (Accept/Reject)
export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);
    const body = await request.json();
    const { status } = body; // Expects "ACCEPTED" or "REJECTED"

    if (isNaN(id) || !status) {
      return NextResponse.json({ error: 'Invalid Data' }, { status: 400 });
    }

    const updated = await prisma.applicant.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
