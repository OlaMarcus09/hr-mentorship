import { prisma } from '@/lib/prisma';
import { User, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getExperts() {
  // Fetch only APPROVED Mentors
  const experts = await prisma.application.findMany({
    where: { 
      type: 'Mentor',
      status: 'APPROVED'
    },
    orderBy: { createdAt: 'desc' }
  });
  return experts;
}

export default async function ExpertsPage() {
  const experts = await getExperts();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-6">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900 dark:text-white">
          Meet Our Experts Council
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Industry-leading HR professionals dedicated to guiding the next generation.
        </p>
        
        {/* FIXED: The 'Apply' button now links to the application form */}
        <Link href="/mentorship/apply" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition shadow-lg">
          Apply to Join Council <ArrowRight size={18} />
        </Link>
      </div>

      {/* Experts Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {experts.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed">
            <p className="text-slate-500">Our council is growing. Be the first to join!</p>
          </div>
        ) : (
          experts.map((expert) => (
            <div key={expert.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800 group">
              
              {/* Profile Image */}
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-slate-50 dark:border-slate-800 shadow-md group-hover:border-primary transition duration-300">
                 {expert.image ? (
                   <img src={expert.image} alt={expert.name} className="w-full h-full object-cover"/>
                 ) : (
                   <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                     <User size={48} />
                   </div>
                 )}
              </div>

              <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{expert.name}</h3>
              <div className="text-sm text-primary font-medium mb-4">Council Member</div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3 h-20 text-left">
                 {expert.bio}
              </div>

              {expert.linkedin && (
                <a href={expert.linkedin} target="_blank" className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-600 transition">
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
