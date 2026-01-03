import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Save a new message (Frontend uses this)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Contact Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

// GET: Fetch all messages (Admin uses this)
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
