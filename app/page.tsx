import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Calendar, MapPin, Star, TrendingUp, Shield } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// Fetch Data from Database
async function getData() {
  const latestBlogs = await prisma.blog.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  
  const upcomingEvents = await prisma.event.findMany({
    take: 3,
    orderBy: { date: 'asc' }
  });

  return { latestBlogs, upcomingEvents };
}

export default async function Home() {
  const { latestBlogs, upcomingEvents } = await getData();

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* 1. HERO SECTION (Restored Design) */}
      <section className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-24 px-6 overflow-hidden">
        {/* Background Overlay Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-sm font-medium">Trusted by 500+ HR Professionals</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">HR Career</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              Transform your expertise with personalized mentorship, cutting-edge resources, and a thriving community dedicated to career excellence.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/mentorship/apply" 
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-lg font-bold transition shadow-lg shadow-purple-900/50 flex items-center gap-2"
              >
                Join Our Community
              </Link>
              <Link 
                href="/about" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold transition border border-white/10"
              >
                Learn More
              </Link>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-slate-400">Career Growth</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-slate-400">Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold">7k+</div>
                <div className="text-sm text-slate-400">Mentees</div>
              </div>
            </div>
          </div>

          {/* Hero Image / Visual */}
          <div className="relative hidden lg:block">
            {/* Abstract Cards Visual */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500">
               <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl mb-6 text-white">
                 <h3 className="text-lg font-semibold opacity-90">Current Mentees</h3>
                 <div className="text-4xl font-bold mt-2">1,247</div>
                 <div className="text-sm opacity-75">Active in programs</div>
               </div>
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm text-slate-300 mb-1"><span>Career Growth</span><span>94%</span></div>
                   <div className="h-2 bg-slate-700 rounded-full overflow-hidden"><div className="h-full w-[94%] bg-purple-500"></div></div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm text-slate-300 mb-1"><span>Skill Development</span><span>89%</span></div>
                   <div className="h-2 bg-slate-700 rounded-full overflow-hidden"><div className="h-full w-[89%] bg-blue-500"></div></div>
                 </div>
               </div>
            </div>
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/30 blur-[100px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-24 px-6 bg-slate-50 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-4">
            About HR Mentorship
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Empowering the Next Generation of HR Professionals
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We foster growth through structured mentorship, knowledge-sharing, and real-world exposure — creating a community where every HR professional can thrive with purpose, clarity, and confidence.
          </p>
          <Link href="/about" className="inline-flex items-center text-purple-700 font-bold hover:underline mt-4">
            Explore More <ArrowRight size={16} className="ml-2"/>
          </Link>
        </div>
      </section>

      {/* 3. DARK STATS SECTION */}
      <section className="py-20 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
           <div className="p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:bg-white/10 transition">
             <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto flex items-center justify-center mb-4"><Users size={24}/></div>
             <div className="text-4xl font-bold mb-2">10,000+</div>
             <div className="text-slate-300">Active Professionals</div>
           </div>
           <div className="p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:bg-white/10 transition">
             <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto flex items-center justify-center mb-4"><TrendingUp size={24}/></div>
             <div className="text-4xl font-bold mb-2">98%</div>
             <div className="text-slate-300">Career Growth Rate</div>
           </div>
           <div className="p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:bg-white/10 transition">
             <div className="w-12 h-12 bg-pink-500 rounded-lg mx-auto flex items-center justify-center mb-4"><Shield size={24}/></div>
             <div className="text-4xl font-bold mb-2">500+</div>
             <div className="text-slate-300">Expert Mentors</div>
           </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS (Dynamic Data, Original Design) */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Upcoming Events</h2>
            <p className="text-xl text-slate-600">Join our workshops, summits, and training sessions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.length === 0 ? (
               <p className="col-span-3 text-center py-10 bg-white border rounded-lg text-gray-500">No upcoming events scheduled.</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Event
                    </span>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                      <div className="text-xs text-slate-500">{new Date(event.date).getFullYear()}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{event.title}</h3>
                  
                  <div className="mt-auto pt-6 flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin size={16} className="text-purple-600"/>
                    <span>{event.location}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/events" className="inline-block bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3 rounded-lg font-bold transition">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (Dark Gradient) */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
             Join Our Growing Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Take the Next Step in Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">HR Journey?</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Join thousands of HR professionals who are transforming their careers through expert mentorship.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link href="/mentorship/apply" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-lg font-bold transition flex items-center gap-2">
              Become a Mentee <ArrowRight size={18}/>
            </Link>
            <Link href="/mentorship/apply" className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold transition flex items-center gap-2">
              Join as Mentor <ArrowRight size={18}/>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
