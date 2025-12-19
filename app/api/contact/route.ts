import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: Fetch all messages (For Admin)
export async function GET() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST: Save a new message (For Users)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simple validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newMessage = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
      }
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
