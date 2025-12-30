import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // CRITICAL FIX: Convert string date to Date object
    if (!body.date) return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    
    const event = await prisma.event.create({
      data: {
        title: body.title,
        location: body.location,
        image: body.image,
        date: new Date(body.date), // <--- This fixes the crash
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Create Event Error:", error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
