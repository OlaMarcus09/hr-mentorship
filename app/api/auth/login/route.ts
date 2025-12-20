import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Find Admin
    const admin = await prisma.admin.findUnique({ where: { email } });
    
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Check Password
    const isValid = await compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Create Token
    // We store the ID and Role in the token so the frontend knows if it's SUPER_ADMIN
    const token = sign(
      { id: admin.id, email: admin.email, role: admin.role }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // 4. Return success (The frontend handles the cookie setting usually, or we return it here)
    const response = NextResponse.json({ success: true, role: admin.role });
    
    // Set HTTP-only cookie for security
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 1 day
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
