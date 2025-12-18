import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createJobSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { postedAt: 'desc' } });
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // SECURITY: Validate inputs
    const validation = createJobSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message }, 
        { status: 400 }
      );
    }

    const { title, company, type, location } = validation.data;

    const newJob = await prisma.job.create({
      data: {
        title, 
        company, 
        type, 
        location,
        salary: 'Competitive',
      }
    });
    return NextResponse.json({ message: 'Job created', job: newJob }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
