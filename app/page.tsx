import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Calendar, Users, Star, Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getData() {
  const latestBlogs = await prisma.blog.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  const upcomingEvents = await prisma.event.findMany({ take: 3, orderBy: { date: 'asc' } });
  return { latestBlogs, upcomingEvents };
}

export default async function Home() {
  const { latestBlogs, upcomingEvents } = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">Trusted by 7,000+ HR Professionals</div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight text-slate-900 dark:text-white">
              Where HR Careers Grow, <span className="text-primary">Leaders Emerge</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              HR Mentorship is more than a platform — it's a movement. A vibrant community where HR professionals come to learn, connect, grow, and evolve into leaders who shape the future of work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/mentorship/apply" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition shadow-lg shadow-primary/25 text-center">Start Your Journey</Link>
              <Link href="/events" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-lg font-bold transition text-center">Explore Programs</Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 md:gap-12">
               <div><div className="text-3xl font-bold text-slate-900 dark:text-white">7k+</div><div className="text-sm text-slate-500">Members</div></div>
               <div><div className="text-3xl font-bold text-slate-900 dark:text-white">60k+</div><div className="text-sm text-slate-500">Applicants Supported</div></div>
               <div><div className="text-3xl font-bold text-slate-900 dark:text-white">Weekly</div><div className="text-sm text-slate-500">Growth Stories</div></div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" alt="HR Professionals" className="w-full h-auto object-cover"/></div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-20 bg-white dark:bg-slate-950">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-primary text-sm font-medium mb-6"><Star size={16} fill="currentColor" /> About HR Mentorship</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">A Community Built on Growth, <br/> Connection, and Possibility</h2>
            <div className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 space-y-6 text-left md:text-center">
               <p>Founded on July 2, 2018, HR Mentorship began with one vision: to create a safe, structured, supportive space where HR professionals could learn, grow, and access resources that truly transform their careers.</p>
               <p>Today, we have grown into one of Africa's largest HR communities, a network where professionals at every stage find mentorship, learning, opportunities, and a family they can rely on.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"><CheckCircle className="text-primary mb-2" size={24} /><h3 className="font-bold mb-1">Competence</h3><p className="text-sm text-slate-500">Lead with competence and character</p></div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"><Users className="text-primary mb-2" size={24} /><h3 className="font-bold mb-1">People-First</h3><p className="text-sm text-slate-500">Practice people-first leadership</p></div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"><Briefcase className="text-primary mb-2" size={24} /><h3 className="font-bold mb-1">Innovation</h3><p className="text-sm text-slate-500">Build ethical, high-performing workplaces</p></div>
            </div>
            <Link href="/about" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">Explore More <ArrowRight size={18} /></Link>
         </div>
      </section>

      {/* 3. EVENTS SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Upcoming Events</h2><p className="text-slate-500 text-lg max-w-2xl mx-auto">From weekly learning sessions to paid masterclasses, global webinars, study groups, and certification support.</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.length === 0 ? <div className="col-span-3 text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700"><p className="text-slate-500">No upcoming events scheduled.</p></div> : 
              upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-6"><span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Event</span><div className="text-right"><div className="font-bold text-slate-900 dark:text-white">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div></div></div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 min-h-[3.5rem]">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800"><div className="flex items-center gap-1"><MapPin size={14} className="text-primary"/> {event.location}</div></div>
                </div>
              ))
            }
          </div>
          <div className="text-center mt-12"><Link href="/events" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition">View Upcoming Events</Link></div>
        </div>
      </section>

      {/* 4. GALLERY / COMMUNITY SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Our Community in Action</h2><p className="text-slate-500 text-lg">HR Mentorship is where professional growth meets real human community.</p></div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group overflow-hidden rounded-2xl h-48 md:h-64"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Workshop</div></div>
              <div className="relative group overflow-hidden rounded-2xl h-48 md:h-64"><img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Event</div></div>
              <div className="relative group overflow-hidden rounded-2xl h-48 md:h-64"><img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Networking</div></div>
              <div className="relative group overflow-hidden rounded-2xl h-48 md:h-64"><img src="https://images.unsplash.com/photo-1559223607-a43c990ed9bb?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/><div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Mentorship</div></div>
           </div>
           <div className="text-center mt-10"><Link href="/gallery" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition">View Gallery</Link></div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#240b36] to-[#c31432] dark:from-[#2e0249] dark:to-[#580a6b]"></div><div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
           <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Grow Your <span className="text-purple-300">HR Career?</span></h2>
           <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Join thousands of HR professionals who are transforming their careers.</p>
           <div className="flex flex-wrap justify-center gap-6"><Link href="/mentorship/apply" className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-white/90 transition">Start Your Journey &rarr;</Link></div>
        </div>
      </section>
    </div>
  );
}
