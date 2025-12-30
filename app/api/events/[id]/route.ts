import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    // Fix Date Format
    let dataToUpdate: any = { ...body };
    
    if (body.date) {
      const parsedDate = new Date(body.date);
      if (!isNaN(parsedDate.getTime())) {
        dataToUpdate.date = parsedDate;
      } else {
        delete dataToUpdate.date;
      }
    }

    delete dataToUpdate.id; // Protect ID

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Update Event Error:", error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
