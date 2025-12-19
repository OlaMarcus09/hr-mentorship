import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Check if admin exists
    const count = await prisma.admin.count();
    if (count > 0) {
      return NextResponse.json({ message: 'Admin already exists. No action taken.' });
    }

    // 2. Create Super Admin
    // You can change 'password123' to whatever you want, or change it in the dashboard later
    const hashedPassword = await hash('password123', 12); 
    
    await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: 'admin@hrmentorship.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });

    return NextResponse.json({ success: true, message: 'Super Admin restored! Login with: admin@hrmentorship.com / password123' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
