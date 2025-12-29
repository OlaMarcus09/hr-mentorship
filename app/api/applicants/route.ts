import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role'); // Filter by 'mentor' or 'mentee'
  
  const where = role ? { role: role } : {};
  
  // Try/Catch in case table doesn't exist yet
  try {
    const applicants = await prisma.mentorshipApplication.findMany({ 
      where, 
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json(applicants);
  } catch (e) {
    return NextResponse.json([]); // Return empty if table missing
  }
}
