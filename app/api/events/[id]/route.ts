import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE EVENT
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params; // <--- Await the params here
    const id = parseInt(params.id);
    
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

// UPDATE (EDIT) EVENT
export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params; // <--- Await the params here (The Fix)
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Event ID' }, { status: 400 });
    }

    const body = await request.json();

    // Prepare Data
    let dataToUpdate: any = {
      title: body.title,
      location: body.location,
      image: body.image,
      registrationLink: body.registrationLink,
    };

    // Strict Date Handling
    if (body.date) {
      const parsedDate = new Date(body.date);
      if (!isNaN(parsedDate.getTime())) {
        dataToUpdate.date = parsedDate;
      }
    }

    // Clean up undefined data
    Object.keys(dataToUpdate).forEach(key => 
      dataToUpdate[key] === undefined && delete dataToUpdate[key]
    );

    // Update in DB
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ 
      error: `Update failed: ${error instanceof Error ? error.message : String(error)}` 
    }, { status: 500 });
  }
}
