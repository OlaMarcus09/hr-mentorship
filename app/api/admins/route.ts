import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const dynamic = 'force-dynamic';

// LIST ALL ADMINS
export async function GET() {
  try {
    // Return all admins but exclude passwords for security
    const admins = await prisma.admin.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
  }
}

// CREATE NEW ADMIN
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json({ error: 'Email and Password are required' }, { status: 400 });
    }

    // Encrypt the password
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
    console.error("Create Admin Error:", error);
    return NextResponse.json({ error: 'Failed to create admin (Email might already exist)' }, { status: 500 });
  }
}

// DELETE ADMIN
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    // Prevent deleting the main admin (optional safety check, assuming ID 1 is super admin)
    if (id === 1) {
       return NextResponse.json({ error: 'Cannot delete the Super Admin' }, { status: 403 });
    }

    await prisma.admin.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500 });
  }
}
