import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Simple validation for the new password
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate Input
    const validation = passwordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }

    const { currentPassword, newPassword } = validation.data;

    // 2. Identify User from Cookie (Next.js 15 Async Cookies)
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract ID (token format is "mock-jwt-token-{ID}")
    const adminId = parseInt(token.split('-').pop() || "0");

    // 3. Fetch Admin from DB
    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // 4. Verify Old Password
    // (Note: In a production app with hashed passwords, we would use bcrypt.compare here)
    if (admin.password !== currentPassword) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    // 5. Update to New Password
    await prisma.admin.update({
      where: { id: adminId },
      data: { password: newPassword }
    });

    return NextResponse.json({ message: "Password updated successfully" });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
