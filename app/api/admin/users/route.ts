import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: List all admins
export async function GET() {
  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, createdAt: true } // Don't send passwords!
  });
  return NextResponse.json(admins);
}

// POST: Add new Admin
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if email already exists
    const existing = await prisma.admin.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const newAdmin = await prisma.admin.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: 'ADMIN' // Default role
      }
    });

    return NextResponse.json({ message: 'Admin added', admin: newAdmin }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add admin' }, { status: 500 });
  }
}

// DELETE: Remove Admin
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.admin.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Admin removed' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
