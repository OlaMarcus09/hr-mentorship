import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = 'admin@hrmentorship.com';
    const password = 'password123';
    
    // 1. Hash the password (security requirement)
    const hashedPassword = await hash(password, 12);

    // 2. Create or Update the Admin User
    await prisma.admin.upsert({
      where: { email },
      update: { password: hashedPassword }, // If exists, update password
      create: {
        name: 'Super Admin',
        email,
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });

    return NextResponse.json({ success: true, message: "Admin account restored! You can login now." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to seed admin.' }, { status: 500 });
  }
}
