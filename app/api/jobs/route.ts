import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({ orderBy: { postedAt: 'desc' } });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newJob = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        type: body.type,
        location: body.location || 'Remote',
        salary: body.salary || 'Competitive',
      }
    });
    return NextResponse.json({ message: 'Job created', job: newJob }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
