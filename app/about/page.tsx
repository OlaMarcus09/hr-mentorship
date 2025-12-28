import Image from "next/image";
import { Quote } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* 1. NEW HERO IMAGE SECTION */}
      <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[60vh]">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
           <Image
             src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200"
             alt="HR Community"
             fill
             className="object-cover"
             priority
           />
           {/* Overlay for text readability */}
           <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
         </div>

         {/* Content */}
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-white font-bold text-sm mb-6 backdrop-blur-md">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Transforming HR Careers Through Community
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Building Africa's most vibrant HR community where professionals learn, connect, and grow together.
            </p>
         </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
              <div className="prose dark:prose-invert text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                <p>
                  Every great movement begins with a vision — and for HR Mentorship, that vision was born on July 2, 2018, when Dr. Oluyemi Adeosun, a distinguished Human Resources leader, envisioned a safe space where HR professionals could learn, grow, and thrive together.
                </p>
                <p>
                  What began as a single WhatsApp group for professionals sharing knowledge has blossomed into a continental force for professional excellence.
                </p>
              </div>
           </div>
           <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800" alt="Our Story" fill className="object-cover" />
           </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-12 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition group">
               <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition">Our Vision</h3>
               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                 To be a globally trusted community for nurturing exceptional HR leaders — where mentorship ignites growth, connection inspires possibility, and every professional flourishes to their fullest potential.
               </p>
            </div>
            <div className="p-12 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition group">
               <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition">Our Mission</h3>
               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                 To empower HR professionals through continuous learning, mentorship, and meaningful connections — building competence, confidence, and character for impactful leadership.
               </p>
            </div>
         </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-16 text-slate-900 dark:text-white">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { l: "G", t: "Growth", d: "We are committed to lifelong learning and continuous improvement." },
                 { l: "C", t: "Connection", d: "We believe in the power of community, empathy, and authentic relationships." },
                 { l: "M", t: "Mutual Respect", d: "We honour every voice and perspective with humility and grace." },
                 { l: "I", t: "Integrity", d: "We uphold the highest standards of professionalism and ethics." },
                 { l: "E", t: "Excellence", d: "We challenge ourselves to aim higher and deliver quality." },
                 { l: "I", t: "Innovation", d: "We embrace creativity and forward thinking in an evolving landscape." },
                 { l: "S", t: "Service", d: "We mentor not just for success, but to uplift others." },
                 { l: "B", t: "Balance", d: "We recognize that true success matches career with well-being." },
               ].map((val, idx) => (
                 <div key={idx} className="bg-white dark:bg-slate-950 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-6 text-xl shadow-lg shadow-primary/30">
                      {val.l}
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">{val.t}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{val.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. COMMUNITY VOICE (Testimonials - Added Back) */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto text-center mb-16">
           <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">Community Voice</h2>
           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Hear from the professionals whose careers have been transformed.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
           {/* Testimonial 1 */}
           <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-2xl border border-slate-100 dark:border-slate-800 relative">
              <Quote className="text-primary/20 absolute top-6 left-6" size={48} />
              <div className="relative z-10 pt-8">
                 <p className="text-lg text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed">"HR Mentorship gave me the confidence and strategic insight to step into a senior leadership role. The peer support and expert guidance are unmatched in the industry."</p>
                 <div>
                    <div className="font-bold text-xl text-slate-900 dark:text-white">Chioma N.</div>
                    <div className="text-sm text-primary font-bold uppercase tracking-wider">Head of HR, FinTech Corp</div>
                 </div>
              </div>
           </div>

           {/* Testimonial 2 */}
           <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-2xl border border-slate-100 dark:border-slate-800 relative">
              <Quote className="text-primary/20 absolute top-6 left-6" size={48} />
              <div className="relative z-10 pt-8">
                 <p className="text-lg text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed">"I found my current job and my closest professional mentors through this community. It's more than just a network; it's a family dedicated to mutual growth."</p>
                 <div>
                    <div className="font-bold text-xl text-slate-900 dark:text-white">Emmanuel O.</div>
                    <div className="text-sm text-primary font-bold uppercase tracking-wider">Talent Acquisition Lead</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. OUR IMPACT */}
      <section className="py-24 px-6 bg-primary text-white text-center">
         <h2 className="text-3xl font-heading font-bold mb-16 text-white">Our Impact</h2>
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { n: "10,000+", l: "Active Members" },
              { n: "60,000+", l: "Job Platform Members" },
              { n: "400+", l: "Learning Sessions" },
              { n: "5", l: "Regional Chapters" },
            ].map((stat, idx) => (
              <div key={idx} className="p-6">
                 <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.n}</div>
                 <div className="text-sm font-bold uppercase tracking-widest text-white/80">{stat.l}</div>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}
