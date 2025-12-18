import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Briefcase, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// Fetch Data for Homepage from Database
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
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white py-24 px-6 relative z-0">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold font-heading mb-6 leading-tight">
              Start Your HR Journey with Expert Mentorship
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Connect with industry leaders, gain practical skills, and accelerate your professional growth.
            </p>
            
            {/* MAIN BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/mentorship/apply" 
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition flex items-center gap-2"
              >
                Start Journey <ArrowRight size={18} />
              </Link>
              
              <Link 
                href="/events" 
                className="border border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition"
              >
                Explore Programs
              </Link>
            </div>

            {/* JOIN LINKS (NOW CLICKABLE) */}
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
              <Link href="/mentorship/apply" className="flex items-center gap-2 hover:text-white transition group">
                <CheckCircle size={18} className="text-green-500 group-hover:scale-110 transition"/> 
                <span className="underline decoration-slate-600 underline-offset-4 group-hover:decoration-white">Join as Mentee</span>
              </Link>
              
              <Link href="/mentorship/apply" className="flex items-center gap-2 hover:text-white transition group">
                <CheckCircle size={18} className="text-green-500 group-hover:scale-110 transition"/> 
                <span className="underline decoration-slate-600 underline-offset-4 group-hover:decoration-white">Join as Mentor</span>
              </Link>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="hidden md:block relative h-[400px] w-full bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
             <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                <Users size={64} />
             </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Mentors", value: "50+" },
            { label: "Mentees Guided", value: "200+" },
            { label: "Jobs Posted", value: "150+" },
            { label: "Success Rate", value: "95%" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Insights</h2>
              <p className="text-gray-600">Trends and tips directly from our database</p>
            </div>
            <Link href="/blog" className="text-blue-600 flex items-center gap-2 hover:underline">
              View all blogs <ArrowRight size={16}/>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestBlogs.length === 0 ? (
               <p className="col-span-3 text-center py-10 bg-gray-50 rounded-lg text-gray-500">No blogs posted yet.</p>
            ) : (
              latestBlogs.map((blog) => (
                <div key={blog.id} className="group cursor-pointer">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden relative border">
                     {blog.image ? (
                       <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-400"><Briefcase/></div>
                     )}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{new Date(blog.createdAt).toLocaleDateString()}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition line-clamp-2">{blog.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Don't miss out on these sessions</p>
            </div>
            <Link href="/events" className="text-blue-600 flex items-center gap-2 hover:underline">
              See all events <ArrowRight size={16}/>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.length === 0 ? (
               <p className="col-span-3 text-center py-10 bg-white border rounded-lg text-gray-500">No upcoming events.</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-xl border hover:shadow-md transition">
                  <div className="text-sm font-bold text-blue-600 mb-2 uppercase flex items-center gap-2">
                    <Calendar size={14}/>
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-lg font-bold mb-1 line-clamp-1">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{event.location}</p>
                  <Link href="/events" className="text-sm font-medium underline">Event Details &rarr;</Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
