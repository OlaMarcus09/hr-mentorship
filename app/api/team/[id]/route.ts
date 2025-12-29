import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        slug: body.slug || body.name.toLowerCase().replace(/ /g, '-'),
      }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH Team Error:", error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = parseInt(params.id);
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Team Error:", error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
