import { prisma } from '@/lib/prisma';
import { User, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getTeam() {
  const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
  const mentors = await prisma.application.findMany({ where: { type: 'Mentor', status: 'APPROVED' } });
  return { team, mentors };
}

export default async function ExpertsPage() {
  const { team, mentors } = await getTeam();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TEAM SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900 dark:text-white">Meet Our Team</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">The people behind the platform dedicated to your growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {team.length === 0 ? <p className="col-span-3 text-center text-slate-500">Team members coming soon.</p> : team.map((member) => (
            <Link key={member.id} href={`/experts/${member.id}?type=team`} className="group bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-slate-50 dark:border-slate-800 shadow-md group-hover:border-primary transition duration-300">
                 {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><User size={48} /></div>}
              </div>
              <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white group-hover:text-primary transition">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
              <p className="text-slate-500 text-sm line-clamp-3">{member.bio}</p>
            </Link>
          ))}
        </div>

        {/* MENTORS SECTION */}
        <div className="text-center mb-16 pt-16 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-slate-900 dark:text-white">Experts Council</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">Industry-leading HR professionals.</p>
          <Link href="/mentorship/apply" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition shadow-lg">
            Apply to Join Council <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {mentors.map((expert) => (
            <div key={expert.id} className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-200 dark:bg-slate-800">
              {expert.image ? <img src={expert.image} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"/> : <div className="absolute inset-0 flex items-center justify-center text-slate-400"><User size={64} /></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                 <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition duration-300">{expert.name}</h3>
                 <p className="text-white/80 text-xs line-clamp-3 translate-y-4 group-hover:translate-y-0 transition duration-300 delay-75">{expert.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
