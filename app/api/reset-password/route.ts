import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hashedPassword = await hash('password123', 12);
    
    // Update the existing admin OR create if missing
    await prisma.admin.upsert({
      where: { email: 'admin@hrmentorship.com' },
      update: { 
        password: hashedPassword,
        role: 'SUPER_ADMIN' // Ensure rights are restored
      },
      create: {
        name: 'Super Admin',
        email: 'admin@hrmentorship.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });

    return NextResponse.json({ success: true, message: 'Password FORCE RESET to: password123' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
