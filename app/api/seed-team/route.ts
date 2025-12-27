import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Clear old data to prevent slug conflicts during development
    await prisma.teamMember.deleteMany({});

    const teamData = [
      {
        name: "Abdulganiy Abdulganiy",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
        bio: "Experienced associate with a focus on HR analytics and performance management.",
        slug: "abdulganiy-abdulganiy"
      },
      {
        name: "Abdulkabir Olode",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        bio: "Specializes in talent acquisition and employee relations strategies.",
        slug: "abdulkabir-olode"
      },
      {
        name: "Abdulmajeed Moshood",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
        bio: "Dedicated to fostering inclusive workplace cultures and compliance.",
        slug: "abdulmajeed-moshood"
      },
      {
        name: "Abisola Odeinde",
        role: "Partner",
        image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
        bio: "Strategic partner driving organizational change and leadership development.",
        slug: "abisola-odeinde"
      },
      {
        name: "Adanna Uzowuru",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        bio: "Expert in compensation, benefits, and HR systems implementation.",
        slug: "adanna-uzowuru"
      },
      {
        name: "Adebola Soyode",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        bio: "Focuses on learning and development initiatives for rapid growth.",
        slug: "adebola-soyode"
      },
      {
        name: "Adeniyi Aderogba",
        role: "Senior Associate",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        bio: "Senior HR professional with a track record of successful restructuring projects.",
        slug: "adeniyi-aderogba"
      },
      {
        name: "Adeoluwakiiti Opesanwo",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&w=800&q=80",
        bio: "Passionate about employee engagement and retention strategies.",
        slug: "adeoluwakiiti-opesanwo"
      }
    ];

    await prisma.teamMember.createMany({ data: teamData });

    return NextResponse.json({ success: true, message: 'Team members seeded with SLUGS successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to seed team' }, { status: 500 });
  }
}
