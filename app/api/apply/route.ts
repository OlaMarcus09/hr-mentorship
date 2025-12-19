import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Human-friendly validation messages
const applicationSchema = z.object({
  name: z.string().min(2, "Name is too short. Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  type: z.enum(["Mentor", "Mentee"]),
  linkedin: z.string().optional(),
  bio: z.string().min(10, "Please write a bit more about yourself (at least 10 characters)."),
  image: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = applicationSchema.safeParse(body);
    
    // Return the friendly error message
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }

    const app = await prisma.application.create({
      data: {
        ...validation.data,
        image: validation.data.image || null
      }
    });

    return NextResponse.json({ success: true, id: app.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 });
  }
}
