import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { postedAt: 'desc' } });
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.company || !body.description) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newJob = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        type: body.type,
        location: body.location,
        salary: body.salary || null,
        description: body.description,
        requirements: body.requirements || null,
        applyLink: body.applyLink || null
      }
    });
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post job' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.job.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
