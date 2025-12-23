import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Check if we already have team members
    const count = await prisma.teamMember.count();
    if (count > 0) {
      return NextResponse.json({ message: 'Team data already exists. No action taken.' });
    }

    // 2. The Data to Insert
    const teamData = [
      {
        name: "Abdulganiy Abdulganiy",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        name: "Abdulkabir Olode",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        bio: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "Abdulmajeed Moshood",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
        bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      },
      {
        name: "Abisola Odeinde",
        role: "Partner",
        image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
        bio: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
      },
      {
        name: "Adanna Uzowuru",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        bio: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
      },
      {
        name: "Adebola Soyode",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        bio: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est."
      },
      {
        name: "Adeniyi Aderogba",
        role: "Senior Associate",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        bio: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus."
      },
      {
        name: "Adeoluwakiiti Opesanwo",
        role: "Associate",
        image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&w=800&q=80",
        bio: "Rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est."
      }
    ];

    // 3. Insert them
    await prisma.teamMember.createMany({ data: teamData });

    return NextResponse.json({ success: true, message: 'Team members seeded successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed team' }, { status: 500 });
  }
}
