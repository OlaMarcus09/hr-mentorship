import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Hash the password (encrypt it)
    const hashedPassword = await hash('password123', 12);

    // 2. Upsert Admin User (Create if new, Update if exists)
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@hrmentorship.com' },
      update: {
        password: hashedPassword, // Reset password
        name: 'Super Admin'
      },
      create: {
        email: 'admin@hrmentorship.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Admin password reset to: password123',
      credentials: {
        email: 'admin@hrmentorship.com',
        password: 'password123'
      }
    });
  } catch (error) {
    console.error("Error resetting admin:", error);
    return NextResponse.json({ 
      error: 'Failed to reset admin', 
      details: String(error) 
    }, { status: 500 });
  }
}
