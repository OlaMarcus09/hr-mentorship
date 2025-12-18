import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await prisma.event.findMany();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newEvent = await prisma.event.create({
    data: { title: body.title, date: body.date }
  });
  return NextResponse.json(newEvent, { status: 201 });
}
