import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Upsert: Updates if exists, Creates if not
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@hrmentorship.com' },
      update: {
        password: 'password123', // Resets password to this
        name: 'Super Admin'
      },
      create: {
        email: 'admin@hrmentorship.com',
        password: 'password123',
        name: 'Super Admin',
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Admin account seeded successfully!',
      credentials: {
        email: 'admin@hrmentorship.com',
        password: 'password123'
      },
      note: "If your app uses password hashing (like bcrypt), this plain text password might not work. Let me know if you need a hashed version."
    });
  } catch (error) {
    console.error("Error seeding admin:", error);
    return NextResponse.json({ error: 'Failed to seed admin' }, { status: 500 });
  }
}
