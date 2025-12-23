import { prisma } from '@/lib/prisma';
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getTeam() {
  // Safe fetch - if table is empty, returns empty array instead of crashing
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
    const mentors = await prisma.application.findMany({ where: { type: 'Mentor', status: 'APPROVED' } });
    return { team, mentors };
  } catch (e) {
    return { team: [], mentors: [] };
  }
}

export default async function ExpertsPage() {
  const { team, mentors } = await getTeam();

  // Dummy data matches the "Corporate" look if DB is empty
  const displayTeam = team.length > 0 ? team : [
    { id: 101, name: "Abdulganiy Abdulganiy", role: "Associate", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
    { id: 102, name: "Abdulkabir Olode", role: "Associate", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
    { id: 103, name: "Abdulmajeed Moshood", role: "Associate", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" },
    { id: 104, name: "Abisola Odeinde", role: "Partner", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80" },
    { id: 105, name: "Adanna Uzowuru", role: "Associate", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
    { id: 106, name: "Adebola Soyode", role: "Associate", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
    { id: 107, name: "Adeniyi Aderogba", role: "Senior Associate", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
    { id: 108, name: "Adeoluwakiiti Opesanwo", role: "Associate", image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* 1. HERO SECTION (The Purple Background) */}
      <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Purple Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop" 
            alt="Team Meeting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 mt-20">
           <h1 className="text-5xl md:text-7xl font-heading text-amber-400 italic mb-4 drop-shadow-lg">Our Team</h1>
           <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light">
             Meet the exceptional minds shaping the future of HR Mentorship.
           </p>
        </div>

        {/* Floating Search Bar (Sitting on the edge) */}
        <div className="absolute -bottom-8 left-0 w-full px-4 z-20">
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 flex flex-col md:flex-row gap-2">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name..." 
                  className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                />
             </div>
             <div className="flex gap-2">
               <button className="flex items-center justify-between gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 transition min-w-[160px]">
                  <span>Practice Area</span>
                  <ChevronDown size={16} />
               </button>
               <button className="flex items-center justify-between gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 transition min-w-[140px]">
                  <span>Location</span>
                  <ChevronDown size={16} />
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* 2. TEAM GRID SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTeam.map((member: any, index: number) => (
            <Link 
              key={member.id} 
              href={`/experts/${member.id}?type=team`} 
              className="group relative h-[480px] overflow-hidden rounded-sm bg-slate-200 dark:bg-slate-800 cursor-pointer reveal-card"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* IMAGE */}
              <img 
                src={member.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* DARK GRADIENT OVERLAY (Bottom Up) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              {/* TEXT CONTENT (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                 <div className="w-12 h-0.5 bg-amber-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <h3 className="text-white text-2xl font-bold font-heading leading-tight mb-1">{member.name}</h3>
                 <p className="text-white/80 text-sm tracking-widest uppercase font-medium">{member.role}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mentors Section Removed for visual parity with video, can add back if needed */}

      </div>
    </div>
  );
}
