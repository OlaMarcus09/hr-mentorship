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
    
    // FALLBACK: If date is missing or invalid, use current time
    let eventDate = new Date();
    if (body.date) {
        const parsedDate = new Date(body.date);
        if (!isNaN(parsedDate.getTime())) {
            eventDate = parsedDate;
        }
    }
    
    const event = await prisma.event.create({
      data: {
        title: body.title || "Untitled Event",
        location: body.location || "TBD",
        image: body.image || "",
        date: eventDate, 
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Create Event Error:", error);
    // Return detailed error so we know why
    return NextResponse.json({ error: `DB Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}
