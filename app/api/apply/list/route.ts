import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Fetch all applications, newest first
  const apps = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(apps);
}
