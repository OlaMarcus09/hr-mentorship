import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hashedPassword = await hash('password123', 12);

    // Create or Update the Master Admin
    await prisma.admin.upsert({
      where: { email: 'admin@hrmentorship.com' },
      update: {
        password: hashedPassword,
        role: 'SUPER_ADMIN' // <--- This grants full access
      },
      create: {
        email: 'admin@hrmentorship.com',
        password: hashedPassword,
        name: 'Master Admin',
        role: 'SUPER_ADMIN'
      }
    });

    return NextResponse.json({ success: true, message: 'Master Admin set to SUPER_ADMIN' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed admin' }, { status: 500 });
  }
}
