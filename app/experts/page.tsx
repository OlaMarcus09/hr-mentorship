"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ExpertsPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fast data load
    const dummyTeam = [
       { id: 101, name: "Abdulganiy Abdulganiy", role: "Associate", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
       { id: 102, name: "Abdulkabir Olode", role: "Associate", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
       { id: 103, name: "Abdulmajeed Moshood", role: "Associate", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" },
       { id: 104, name: "Abisola Odeinde", role: "Partner", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80" },
       { id: 105, name: "Adanna Uzowuru", role: "Associate", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
       { id: 106, name: "Adebola Soyode", role: "Associate", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
       { id: 107, name: "Adeniyi Aderogba", role: "Senior Associate", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
       { id: 108, name: "Adeoluwakiiti Opesanwo", role: "Associate", image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&w=800&q=80" },
    ];
    setTeam(dummyTeam);
    setLoading(false);
  }, []);

  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. HERO SECTION */}
      {/* Added responsive height: h-[40vh] on mobile, h-[50vh] on desktop */}
      <div className="relative h-[40vh] md:h-[50vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop" 
            alt="Team Meeting" 
            fill
            className="object-cover grayscale mix-blend-multiply"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-6 mt-0">
           {/* Responsive Text Sizes */}
           <h1 className="text-4xl md:text-7xl font-heading text-white italic mb-3 drop-shadow-xl">Team Members</h1>
           <p className="text-white/90 text-sm md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
             Meet the exceptional minds shaping the future of HR Mentorship.
           </p>
        </div>
      </div>

      {/* 2. SEARCH BAR (Floating Intersection) */}
      {/* Negative margin pulls it up over the hero image. Z-index ensures it's on top. */}
      <div className="relative z-30 px-4 -mt-8 md:-mt-10 mb-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 md:p-3 flex flex-col md:flex-row gap-3">
           
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..." 
                className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
              />
           </div>
           
           <div className="hidden md:flex gap-2">
             <button className="flex items-center justify-between gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 transition min-w-[160px]">
                <span>Practice Area</span>
                <ChevronDown size={16} />
             </button>
           </div>
        
        </div>
      </div>

      {/* 3. TEAM GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {loading ? (
           <div className="text-center py-20 text-slate-500 animate-pulse">Loading team...</div>
        ) : filteredTeam.length === 0 ? (
           <div className="text-center py-20 text-slate-500">No team members found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeam.map((member: any, index: number) => (
              <Link 
                key={member.id} 
                href={`/experts/${member.id}?type=team`} 
                className="group relative h-[450px] overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer reveal-card shadow-sm hover:shadow-xl transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* NEXT.JS OPTIMIZED IMAGE */}
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-8 h-0.5 bg-primary mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-white text-xl font-bold font-heading leading-tight mb-1">{member.name}</h3>
                  <p className="text-slate-300 text-sm tracking-wide font-medium">{member.role}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
