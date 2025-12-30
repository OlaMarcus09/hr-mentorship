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
    
    // VALIDATION: Ensure Date exists
    if (!body.date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    // CONVERSION: Force the string into a Database Date Object
    const dateObj = new Date(body.date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
        return NextResponse.json({ error: 'Invalid Date format' }, { status: 400 });
    }
    
    const event = await prisma.event.create({
      data: {
        title: body.title,
        location: body.location,
        image: body.image,
        date: dateObj, 
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Create Event Error:", error);
    // Return the actual error message so you can see it
    return NextResponse.json({ error: `Failed: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}
