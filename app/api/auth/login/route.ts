import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Find user in DB
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    // 2. Check Password (Simple check for now)
    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 3. Return Token & Role
    return NextResponse.json({
      success: true,
      token: 'mock-jwt-token-' + admin.id,
      user: { name: admin.name, role: admin.role, email: admin.email }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
