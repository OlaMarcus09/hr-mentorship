import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing ID or Status" }, { status: 400 });
    }

    // Update the application status in the database
    const updated = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status: status } // 'APPROVED' or 'REJECTED'
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
