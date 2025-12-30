import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const isValid = await compare(password, admin.password);
    if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // Return the role so the frontend can hide/show tabs
    return NextResponse.json({ 
      success: true, 
      role: admin.role, // 'SUPER_ADMIN' or 'ADMIN'
      name: admin.name 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
