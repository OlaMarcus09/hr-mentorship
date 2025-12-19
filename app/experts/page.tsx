import { prisma } from '@/lib/prisma';
import { User, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getExperts() {
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
        <Link href="/mentorship/apply" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition shadow-lg">
          Apply to Join Council <ArrowRight size={18} />
        </Link>
      </div>

      {/* Professional Grid Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {experts.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed">
            <p className="text-slate-500">Our council is growing. Be the first to join!</p>
          </div>
        ) : (
          experts.map((expert) => (
            <div key={expert.id} className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-200 dark:bg-slate-800 shadow-sm hover:shadow-2xl transition duration-500">
              
              {/* Full Background Image */}
              {expert.image ? (
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <User size={64} />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                 
                 <h3 className="text-xl font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition duration-300 delay-75">
                   {expert.name}
                 </h3>
                 <p className="text-primary font-medium text-sm mb-3 translate-y-4 group-hover:translate-y-0 transition duration-300 delay-100">
                   Council Member
                 </p>
                 
                 <p className="text-white/80 text-xs line-clamp-3 mb-4 translate-y-4 group-hover:translate-y-0 transition duration-300 delay-150">
                   {expert.bio}
                 </p>

                 {expert.linkedin && (
                   <a 
                     href={expert.linkedin} 
                     target="_blank" 
                     className="translate-y-4 group-hover:translate-y-0 transition duration-300 delay-200 inline-flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-2 rounded-lg font-bold text-sm hover:bg-blue-700"
                   >
                     <Linkedin size={16} /> View Profile
                   </a>
                 )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
