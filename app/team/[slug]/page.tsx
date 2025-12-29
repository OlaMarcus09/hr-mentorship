import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Linkedin, Mail } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function TeamMemberPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  // Fetch the team member using the slug
  const person = await prisma.teamMember.findUnique({
    where: { slug: params.slug }
  });

  if (!person) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
       <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/team" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-bold transition">
             <ArrowLeft size={20} /> Back to Team
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-start">
             {/* Image Side */}
             <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                <Image 
                   src={person.image} 
                   alt={person.name} 
                   fill 
                   className="object-cover"
                   priority
                />
             </div>

             {/* Content Side */}
             <div>
                <span className="inline-block py-1 px-3 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest rounded-full mb-4">
                   {person.role}
                </span>
                
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                   {person.name}
                </h1>

                <div className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-10 space-y-6">
                   <p>
                     A dedicated professional contributing to the growth and excellence of the HR Mentorship community. 
                     Committed to empowering HR professionals and fostering leadership across the continent.
                   </p>
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                   <button className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-lg font-bold hover:opacity-90 transition">
                      <Linkedin size={20} /> Connect on LinkedIn
                   </button>
                   <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-bold hover:bg-slate-200 transition">
                      <Mail size={20} /> Send Email
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
