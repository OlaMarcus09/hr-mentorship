import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowLeft, Linkedin, Mail, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ExpertProfilePage(props: { params: Promise<{ id: string }>, searchParams: Promise<{ type?: string }> }) {
  // 1. Await params (Next.js 15 Fix)
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  let person: any = null;
  let role = "Team Member";

  // 2. Fetch based on type (Team Member or Mentor)
  if (searchParams.type === 'mentor') {
     person = await prisma.application.findUnique({ where: { id } });
     role = "Expert Council";
  } else {
     // Default to Team Member
     // Note: If you haven't created the TeamMember table yet, this might fail. 
     // For now, we will try to fetch, if it fails, we show the dummy data fallback.
     try {
       person = await prisma.teamMember.findUnique({ where: { id } });
     } catch (e) {
       person = null;
     }
  }

  // 3. Fallback for Demo/Design (If database is empty)
  if (!person) {
    // Dummy fallback so you can see the design
    person = {
      id: id,
      name: "Olawale Marcus",
      role: "Founder & Lead",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      bio: "Olawale is a seasoned HR professional with over 15 years of experience...",
      email: "marcus@hrmentorship.com",
      linkedin: "#"
    };
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link href="/experts" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Team
        </Link>

        <div className="grid md:grid-cols-12 gap-12 items-start">
           
           {/* LEFT: Portrait Image (Corporate Style) */}
           <div className="md:col-span-5 relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl relative z-10 bg-slate-200">
                 <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 -left-10 w-full h-full border-2 border-slate-100 dark:border-slate-800 -z-0 rounded-lg hidden md:block"></div>
           </div>

           {/* RIGHT: Content */}
           <div className="md:col-span-7 pt-4">
              <span className="inline-block py-1 px-3 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold tracking-widest uppercase text-slate-500 mb-6">
                {person.role || role}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-heading text-slate-900 dark:text-white mb-8 leading-tight">
                {person.name}
              </h1>

              <div className="flex flex-col gap-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-10">
                 <p>{person.bio || "No biography available yet."}</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              </div>

              {/* Contact / Socials */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex gap-6">
                 {person.linkedin && (
                   <a href={person.linkedin} className="flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-blue-600 transition">
                      <Linkedin size={20} /> LinkedIn
                   </a>
                 )}
                 {person.email && (
                   <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-primary transition">
                      <Mail size={20} /> Email
                   </a>
                 )}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
