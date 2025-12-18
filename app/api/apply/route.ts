import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation Schema
const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  type: z.enum(["Mentor", "Mentee"]),
  linkedin: z.string().optional(),
  bio: z.string().min(10, "Please provide a bit more detail about yourself.")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate
    const validation = applicationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }

    // Save to DB
    const app = await prisma.application.create({
      data: validation.data
    });

    return NextResponse.json({ success: true, id: app.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
