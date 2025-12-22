import { prisma } from '@/lib/prisma';
import { Search, ChevronDown, Linkedin } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getTeam() {
  const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
  const mentors = await prisma.application.findMany({ where: { type: 'Mentor', status: 'APPROVED' } });
  return { team, mentors };
}

export default async function ExpertsPage() {
  const { team, mentors } = await getTeam();

  // Combine real team with dummy placeholders if empty to show the design
  const displayTeam = team.length > 0 ? team : [
    { id: 101, name: "Olawale Marcus", role: "Founder & Lead", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
    { id: 102, name: "Sarah Johnson", role: "Head of Learning", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
    { id: 103, name: "David Chen", role: "Senior Partner", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
    { id: 104, name: "Amara Okeke", role: "Strategy Lead", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
    { id: 105, name: "James Wilson", role: "Global HR", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
    { id: 106, name: "Priya Patel", role: "Operations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
    { id: 107, name: "Michael Ross", role: "Legal Counsel", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
    { id: 108, name: "Elena Rodriguez", role: "Recruitment", image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&w=800&q=80", bio: "Lorem ipsum..." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div>
               <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Our People</p>
               <h1 className="text-4xl md:text-5xl font-heading text-slate-900 dark:text-white">
                 Meet Our Team
               </h1>
            </div>
            
            {/* SEARCH BAR & FILTER */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name..." 
                    className="pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
               </div>
               <button className="flex items-center justify-between gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition min-w-[140px]">
                  <span>Practice</span>
                  <ChevronDown size={16} />
               </button>
            </div>
          </div>
        </div>

        {/* TEAM GRID (PORTRAIT CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayTeam.map((member: any, index: number) => (
            <Link 
              key={member.id} 
              href={`/experts/${member.id}?type=team`} 
              className="group relative h-[450px] overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* IMAGE */}
              <img 
                src={member.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* TEXT CONTENT (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                 <div className="w-8 h-0.5 bg-primary mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <h3 className="text-white text-xl font-bold font-heading leading-tight mb-1">{member.name}</h3>
                 <p className="text-slate-300 text-sm font-medium tracking-wide uppercase">{member.role}</p>
                 
                 {/* Hidden arrow that appears on hover */}
                 <div className="mt-4 text-white/80 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-2">
                    VIEW PROFILE <span className="text-primary">→</span>
                 </div>
              </div>
            </Link>
          ))}
        </div>

        {/* MENTORS SECTION (Clean Grid) */}
        {mentors.length > 0 && (
          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800">
             <h2 className="text-3xl font-heading mb-8 text-slate-900 dark:text-white">Experts Council</h2>
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {mentors.map((mentor: any) => (
                  <div key={mentor.id} className="relative aspect-[3/4] rounded-lg overflow-hidden group bg-slate-100">
                     <img src={mentor.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"/>
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                        <div>
                           <p className="text-white font-bold text-sm">{mentor.name}</p>
                           <p className="text-white/60 text-xs">Expert</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
