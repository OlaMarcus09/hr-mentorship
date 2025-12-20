import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    // Check if email exists
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    
    const admin = await prisma.admin.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role: 'ADMIN' // Default role
      }
    });
    
    return NextResponse.json(admin);
  } catch(e) {
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}
