import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const hashedPassword = await hash(body.password, 12);

    const admin = await prisma.admin.create({
      data: {
        name: body.name || 'Admin',
        email: body.email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ success: true, admin: { id: admin.id, email: admin.email } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // FIXED: No parseInt here
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.admin.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
