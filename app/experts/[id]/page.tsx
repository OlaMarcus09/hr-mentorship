import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowLeft, Linkedin } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function SingleExpertPage({ params, searchParams }: { params: { id: string }, searchParams: { type?: string } }) {
  // If type is 'team', fetch from TeamMember table, otherwise assume Application (Mentor) but for now let's just support TeamMember for full bios
  const member = await prisma.teamMember.findUnique({ where: { id: parseInt(params.id) } });
  
  if (!member) return <div className="min-h-screen flex items-center justify-center">Member not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 md:p-12">
          <Link href="/experts" className="inline-flex items-center gap-2 text-slate-500 hover:text-black dark:hover:text-white mb-8 transition">
            <ArrowLeft size={18} /> Back to Team
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-lg">
                {member.image ? <img src={member.image} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-slate-200"></div>}
             </div>
             
             <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{member.name}</h1>
                <p className="text-primary font-bold text-lg mb-4">{member.role}</p>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium">
                    <Linkedin size={20} /> LinkedIn Profile
                  </a>
                )}
             </div>
          </div>

          <div className="mt-10 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
             {member.bio}
          </div>
        </div>
      </div>
    </div>
  );
}
