import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createEventSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate
    const validation = createEventSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }

    const { title, date, image, location } = validation.data;

    const newEvent = await prisma.event.create({
      data: { 
        title, 
        date, 
        image: image || null, 
        location: location || 'Online' 
      }
    });
    
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.event.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
