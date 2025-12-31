import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE RESOURCE
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await prisma.resource.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
  }
}

// UPDATE RESOURCE (Edit Fix)
export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params; // Await params (Next.js 15 Fix)
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Resource ID' }, { status: 400 });
    }

    const body = await request.json();

    const dataToUpdate = {
      title: body.title,
      type: body.type,
      description: body.description,
      fileUrl: body.fileUrl,
    };

    // Remove undefined keys
    Object.keys(dataToUpdate).forEach(key => 
      (dataToUpdate as any)[key] === undefined && delete (dataToUpdate as any)[key]
    );

    const updatedResource = await prisma.resource.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedResource);
  } catch (error) {
    console.error("Update Resource Error:", error);
    return NextResponse.json({ 
      error: `Update failed: ${error instanceof Error ? error.message : String(error)}` 
    }, { status: 500 });
  }
}
