"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        // Fetch from the seeder API for demo/speed
        const res = await fetch('/api/seed-team');
        // Fallback data matching the seed for instant render
        const data = [
          { name: "Abdulganiy Abdulganiy", role: "Associate", slug: "abdulganiy-abdulganiy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
          { name: "Abdulkabir Olode", role: "Associate", slug: "abdulkabir-olode", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
          { name: "Abdulmajeed Moshood", role: "Associate", slug: "abdulmajeed-moshood", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" },
          { name: "Abisola Odeinde", role: "Partner", slug: "abisola-odeinde", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80" },
          { name: "Adanna Uzowuru", role: "Associate", slug: "adanna-uzowuru", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
          { name: "Adebola Soyode", role: "Associate", slug: "adebola-soyode", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
          { name: "Adeniyi Aderogba", role: "Senior Associate", slug: "adeniyi-aderogba", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
          { name: "Adeoluwakiiti Opesanwo", role: "Associate", slug: "adeoluwakiiti-opesanwo", image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&w=800&q=80" },
        ];
        setTeam(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. HERO SECTION WITH IMAGE */}
      <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[50vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="HR Team"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
           <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-white font-bold text-sm mb-6 backdrop-blur-md">
             Our People
           </span>
           <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
             Meet the Core Team
           </h1>
           <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
             The dedicated professionals driving our vision and supporting the HR community.
           </p>
        </div>
      </section>

      {/* 2. SEARCH & INTRO CONTENT */}
      <section className="py-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto text-center">
           {/* Search Bar */}
           <div className="relative mb-10">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-full shadow-inner border border-slate-200 dark:border-slate-700 p-2 flex items-center">
                 <Search className="ml-4 text-slate-400" size={20} />
                 <input 
                   type="text" 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   placeholder="Search by name or role..." 
                   className="flex-1 pl-4 pr-6 py-3 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-500 font-medium text-lg"
                 />
              </div>
           </div>
           
           {/* Content Beneath Search */}
           <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
             Our team is composed of experienced HR practitioners, thought leaders, and community builders passionate about elevating the profession. Get to know the faces behind HR Mentorship.
           </p>
        </div>
      </section>

      {/* 3. TEAM GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
           <div className="text-center py-20 text-slate-500 animate-pulse">Loading team...</div>
        ) : filteredTeam.length === 0 ? (
           <div className="text-center py-20 text-slate-500 text-lg">No team members found matching "{search}".</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredTeam.map((member: any, index: number) => (
              <Link 
                key={member.slug} 
                href={`/team/${member.slug}`} 
                className="group cursor-pointer block"
              >
                {/* Image Container - Sharp, fixed aspect ratio, subtle hover */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-5 shadow-sm transition-shadow hover:shadow-md">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-1">
                    {member.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
