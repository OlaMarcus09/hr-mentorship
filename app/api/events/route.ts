import { NextResponse } from 'next/server';

const MOCK_EVENTS = [
  { id: 1, title: 'HR Summit', date: '2025-12-15' }
];

export async function GET() {
  return NextResponse.json(MOCK_EVENTS);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: 'Event created', data: body }, { status: 201 });
}
