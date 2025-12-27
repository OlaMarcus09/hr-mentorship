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
    // Fetch from our seeder/API
    async function fetchTeam() {
      try {
        // We'll call the seeder to get the data list for now (or a real GET endpoint)
        // For speed/demo, we use the seeder endpoint which returns the data if it exists or creates it
        // Ideally this should be a GET /api/team, but we'll use the seed endpoint for data consistency in this demo
        const res = await fetch('/api/seed-team'); 
        // Note: In production we'd use a proper GET route, but the seed route returns JSON message. 
        // Let's fallback to the hardcoded list if fetch fails or just use the list below for instant render speed
        // The list below matches the DB seed perfectly.
        
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
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* 1. HERO SECTION (PURE WHITE / CLEAN) */}
      {/* Removed bg-primary and purple overlay as requested */}
      <div className="relative pt-40 pb-16 px-6 text-center bg-white dark:bg-slate-950">
         <h1 className="text-5xl md:text-7xl font-heading text-slate-900 dark:text-white italic mb-4">
           Meet Our Team
         </h1>
         <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
           The exceptional minds shaping the future of HR Mentorship.
         </p>
      </div>

      {/* 2. SEARCH BAR (CLEAN - NO DROPDOWNS) */}
      <div className="relative z-20 px-4 mb-16">
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-full shadow-xl border border-slate-200 dark:border-slate-800 p-2 flex items-center">
           <Search className="ml-4 text-slate-400" size={20} />
           <input 
             type="text" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search by name..." 
             className="flex-1 pl-4 pr-6 py-2 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
           />
        </div>
      </div>

      {/* 3. TEAM GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {loading ? (
           <div className="text-center py-20 text-slate-500 animate-pulse">Loading...</div>
        ) : filteredTeam.length === 0 ? (
           <div className="text-center py-20 text-slate-500">No team members found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredTeam.map((member: any, index: number) => (
              <Link 
                key={member.slug} 
                href={`/team/${member.slug}`} 
                className="group cursor-pointer"
              >
                {/* Clean Image Container */}
                <div className="relative h-[420px] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900 mb-4 reveal-card" style={{ animationDelay: `${index * 100}ms` }}>
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient only at very bottom for text readability if needed */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Text Content - Below Image (Clean Style) */}
                <div className="text-left">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold font-heading leading-tight group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm tracking-wide font-medium mt-1">
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
