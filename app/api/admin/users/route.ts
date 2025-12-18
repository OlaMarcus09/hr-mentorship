import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createAdminSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
  return NextResponse.json(admins);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. SECURITY CHECK: Validate input with Zod
    const validation = createAdminSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        // FIX: Use 'issues' instead of 'errors' for TypeScript compliance
        { error: validation.error.issues[0].message }, 
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;
    
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ message: 'Admin added', admin: newAdmin }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.admin.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Admin removed' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
