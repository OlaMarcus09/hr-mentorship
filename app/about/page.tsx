import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 text-center bg-white dark:bg-slate-950">
         <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
           About HR Mentorship
         </span>
         <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-6 max-w-4xl mx-auto leading-tight">
           Transforming HR Careers Through Community
         </h1>
         <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
           Building Africa's most vibrant HR community where professionals learn, connect, and grow together.
         </p>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
              <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  Every great movement begins with a vision — and for HR Mentorship, that vision was born on July 2, 2018, when Dr. Oluyemi Adeosun, a distinguished Human Resources leader, envisioned a safe space where HR professionals could learn, grow, and thrive together.
                </p>
                <p>
                  What began as a single WhatsApp group for professionals sharing knowledge has blossomed into a continental force for professional excellence.
                </p>
              </div>
           </div>
           <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200" alt="Our Story" fill className="object-cover" />
           </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-10 border border-primary/20 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition">
               <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h3>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                 To be a globally trusted community for nurturing exceptional HR leaders — where mentorship ignites growth, connection inspires possibility, and every professional flourishes to their fullest potential.
               </p>
            </div>
            <div className="p-10 border border-primary/20 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition">
               <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h3>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                 To empower HR professionals through continuous learning, mentorship, and meaningful connections — building competence, confidence, and character for impactful leadership.
               </p>
            </div>
         </div>
      </section>

      {/* 4. CORE VALUES (Grid) */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
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

      {/* 5. OUR IMPACT */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 text-center">
         <h2 className="text-3xl font-heading font-bold mb-16 text-slate-900 dark:text-white">Our Impact</h2>
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "10,000+", l: "Active Members" },
              { n: "60,000+", l: "Job Platform Members" },
              { n: "400+", l: "Learning Sessions" },
              { n: "5", l: "Regional Chapters" },
            ].map((stat, idx) => (
              <div key={idx} className="p-6">
                 <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.n}</div>
                 <div className="text-sm font-bold uppercase tracking-widest text-slate-500">{stat.l}</div>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}
