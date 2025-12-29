import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role'); // 'mentor' or 'mentee'
  
  const where = role ? { role: role } : {};
  
  try {
    const applicants = await prisma.mentorshipApplication.findMany({ 
      where, 
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json(applicants);
  } catch (e) {
    // If the table doesn't exist yet or is empty, return empty array instead of crashing
    return NextResponse.json([]); 
  }
}
