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
    // 1. Parse ID safely
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Event ID' }, { status: 400 });
    }

    const body = await request.json();
    console.log("Updating Event ID:", id, "With data:", body); // Debug log

    // 2. Prepare Data Object
    const dataToUpdate: any = {
      title: body.title,
      location: body.location,
      image: body.image,
      registrationLink: body.registrationLink,
    };

    // 3. STRICT Date Handling
    if (body.date) {
      const parsedDate = new Date(body.date);
      if (!isNaN(parsedDate.getTime())) {
        dataToUpdate.date = parsedDate;
      }
    }

    // 4. Remove undefined keys (so we don't overwrite with null unless intended)
    Object.keys(dataToUpdate).forEach(key => 
      dataToUpdate[key] === undefined && delete dataToUpdate[key]
    );

    // 5. Run Update
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Update Event Error Detailed:", error);
    // Return the ACTUAL error message to the frontend
    return NextResponse.json({ 
      error: `Update failed: ${error instanceof Error ? error.message : String(error)}` 
    }, { status: 500 });
  }
}
