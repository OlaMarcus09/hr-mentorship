import { NextResponse } from 'next/server';

const MOCK_JOBS = [
  { id: 1, title: 'Senior HR Manager', company: 'TechCorp', type: 'Remote' },
  { id: 2, title: 'Talent Lead', company: 'Startup', type: 'Hybrid' }
];

export async function GET() {
  return NextResponse.json(MOCK_JOBS, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    { message: 'Job created', job: { id: 3, ...body } },
    { status: 201 }
  );
}
