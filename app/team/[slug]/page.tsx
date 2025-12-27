import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowLeft, Linkedin, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function TeamProfilePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;

  const person = await prisma.teamMember.findUnique({
    where: { slug: slug }
  });

  if (!person) return notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link href="/team" className="inline-flex items-center gap-2 text-slate-500 hover:text-black dark:hover:text-white mb-12 transition group font-medium">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Team
        </Link>

        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
           
           {/* LEFT: Portrait Image (Clean) */}
           <div className="md:col-span-5 relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden relative z-10 bg-slate-100 shadow-sm">
                 <Image 
                   src={person.image} 
                   alt={person.name} 
                   fill 
                   className="object-cover" 
                 />
              </div>
           </div>

           {/* RIGHT: Content */}
           <div className="md:col-span-7 pt-4">
              <span className="inline-block py-1 px-3 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold tracking-widest uppercase text-slate-500 mb-6">
                {person.role}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-heading text-slate-900 dark:text-white mb-8 leading-tight">
                {person.name}
              </h1>

              <div className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-10 space-y-6">
                 <p>{person.bio || "No biography available."}</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>

              {/* Contact / Socials */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex gap-8">
                 {person.linkedin && (
                   <a href={person.linkedin} className="flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-primary transition group">
                      <Linkedin size={20} className="text-slate-400 group-hover:text-primary transition" /> LinkedIn
                   </a>
                 )}
                 {person.email && (
                   <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-primary transition group">
                      <Mail size={20} className="text-slate-400 group-hover:text-primary transition" /> Email
                   </a>
                 )}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
