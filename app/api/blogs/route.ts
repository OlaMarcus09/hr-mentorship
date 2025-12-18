import { NextResponse } from 'next/server';

const MOCK_BLOGS = [
  { id: 1, title: 'Ace your Interview', author: 'Team' },
  { id: 2, title: 'Remote Work Trends', author: 'Olawale' }
];

export async function GET() {
  return NextResponse.json(MOCK_BLOGS);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: 'Blog created', data: body }, { status: 201 });
}
