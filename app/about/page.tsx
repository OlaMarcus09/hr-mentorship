import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Heart, Shield, Star, Users, Globe, BookOpen, Briefcase, Zap, Coffee, Phone, Mail, Linkedin, Twitter, Instagram, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
         <Image 
           src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000" 
           alt="About HR Mentorship" 
           fill 
           className="object-cover"
           priority
         />
         <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">About HR Mentorship</h1>
            <p className="text-xl text-white/90">Where learning meets connection, and connection births transformation.</p>
         </div>
      </section>

      {/* 2. OUR STORY & BRAND STORY */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
         <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-primary">Our Story</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
               Every great movement begins with a vision — and for HR Mentorship, that vision was born on <strong>July 2, 2018</strong>, when <strong>Dr. Oluyemi Adeosun</strong>, a distinguished Human Resources leader, envisioned a safe space where HR professionals could learn, grow, and thrive together.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
               What began as a single WhatsApp group has blossomed into a thriving network of over <strong>7,000 members</strong> across Nigeria and the diaspora. Today, HR Mentorship stands as one of Africa’s most vibrant HR communities.
            </p>
         </div>
         <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border-l-4 border-primary">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Brand Story</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
               At HR Mentorship, we believe that every professional carries the seed of greatness within.
            </p>
            <ul className="space-y-3">
               <li className="flex gap-3"><span className="text-primary font-bold">The Leaf:</span> Symbolises growth and nurturing.</li>
               <li className="flex gap-3"><span className="text-primary font-bold">The Bird:</span> Represents vision, freedom, and courage.</li>
               <li className="flex gap-3"><span className="text-primary font-bold">Purple:</span> Embodies wisdom, leadership, and creativity.</li>
            </ul>
         </div>
      </section>

      {/* 3. WHO WE ARE & WHAT WE DO */}
      <section className="py-20 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
            <div>
               <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">Who We Are</h2>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  HR Mentorship is a dynamic and impactful Human Resources community dedicated to the growth, development, and advancement of professionals across Nigeria and beyond.
               </p>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  With a strong presence across multiple cities — including Lagos, Abuja, Port Harcourt, and Ibadan — we connect HR practitioners of all levels: from emerging professionals to senior executives. We operate through <strong>eight active WhatsApp groups</strong>, a large Telegram hub, and a Job Alert group of over <strong>60,000 members</strong>.
               </p>
            </div>
            <div>
               <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">What We Do</h2>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  At the heart of our initiatives is the <strong>Weekly Learning Series</strong>, where seasoned HR experts share insights on workplace trends, leadership, and strategy.
               </p>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Beyond professional learning, we emphasise holistic development. Through social hangouts, sports engagements, and community projects, we create opportunities for bonding, relaxation, and building lifelong relationships.
               </p>
            </div>
         </div>
      </section>

      {/* 4. VISION, MISSION & VALUES */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
               <div className="bg-primary/5 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-primary mb-3">Our Vision</h3>
                  <p className="text-slate-700 dark:text-slate-300">To be a globally trusted community for nurturing exceptional HR leaders — where mentorship ignites growth, connection inspires possibility, and every professional flourishes to their fullest potential.</p>
               </div>
               <div className="bg-primary/5 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-primary mb-3">Our Mission</h3>
                  <p className="text-slate-700 dark:text-slate-300">To empower HR professionals through continuous learning, mentorship, and meaningful connections — building competence, confidence, and character for impactful leadership.</p>
               </div>
            </div>

            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-10">Our Core Values (The 8 Pillars)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { title: "Growth", desc: "Committed to lifelong learning.", icon: <Star/> },
                 { title: "Connection", desc: "Collaboration and authentic relationships.", icon: <Users/> },
                 { title: "Mutual Respect", desc: "We honour every voice and perspective.", icon: <Heart/> },
                 { title: "Integrity", desc: "Highest standards of professionalism.", icon: <Shield/> },
                 { title: "Excellence", desc: "We challenge ourselves to aim higher.", icon: <CheckCircle2/> },
                 { title: "Innovation", desc: "Embracing creativity and new ways.", icon: <Zap/> },
                 { title: "Service", desc: "Mentoring to uplift others.", icon: <Globe/> },
                 { title: "Balance", desc: "Blending career with personal well-being.", icon: <Coffee/> },
               ].map((val, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm hover:shadow-md transition text-left">
                     <div className="text-primary mb-3">{val.icon}</div>
                     <h4 className="font-bold text-slate-900 dark:text-white mb-1">{val.title}</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. PROGRAMS SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Our Programs</h2>
               <p className="text-slate-600 dark:text-slate-400">Thoughtfully designed to help you learn, connect, and grow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: "The Learning Series", desc: "Weekly expert-led sessions on workplace trends and people strategy.", icon: <BookOpen/> },
                 { title: "Certification & Support", desc: "Guidance for CIPM, SPHRi, SHRM, plus career coaching.", icon: <Award/> },
                 { title: "Webinars & Trainings", desc: "Specialised full-day training programs in analytics, law, and leadership.", icon: <Globe/> },
                 { title: "HR Mentorship Socials", desc: "A sanctuary to unwind, laugh, and reconnect with your lighter self.", icon: <Coffee/> },
                 { title: "Side Hustle Platform", desc: "Connect with clients and share resources for personal ventures.", icon: <Briefcase/> },
                 { title: "Regional Chapters", desc: "Physical meet-ups in Lagos, Abuja, PH, Ibadan, and the North.", icon: <Users/> },
                 { title: "Book Club", desc: "Monthly readings exploring leadership, self-development, and culture.", icon: <BookOpen/> },
                 { title: "Job Placement", desc: "Connecting 60,000+ professionals with verified job opportunities daily.", icon: <Briefcase/> },
                 { title: "Mentorship", desc: "One-on-one guidance and peer collaboration to advance careers.", icon: <Users/> },
               ].map((prog, i) => (
                  <div key={i} className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-primary/30 transition">
                     <div className="text-primary mb-4">{prog.icon}</div>
                     <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{prog.title}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{prog.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. IMPACT & COMMUNITY VOICE */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-primary rounded-3xl p-10 md:p-16 text-center text-white mb-16 shadow-2xl">
               <h2 className="text-3xl font-heading font-bold mb-8">Our Impact by the Numbers</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div><p className="text-4xl font-bold mb-1">7,000+</p><p className="text-sm opacity-80">Active Members</p></div>
                  <div><p className="text-4xl font-bold mb-1">60,000+</p><p className="text-sm opacity-80">Job Seekers Supported</p></div>
                  <div><p className="text-4xl font-bold mb-1">5</p><p className="text-sm opacity-80">Active Chapters</p></div>
                  <div><p className="text-4xl font-bold mb-1">400+</p><p className="text-sm opacity-80">Learning Sessions</p></div>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm">
                  <p className="italic text-slate-600 dark:text-slate-300 mb-6">"I joined HR Mentorship as a fresh graduate, and today, I’m a certified HR professional with a clear career path."</p>
                  <p className="font-bold text-primary">– Member, Lagos Chapter</p>
               </div>
               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm">
                  <p className="italic text-slate-600 dark:text-slate-300 mb-6">"It’s more than learning; it’s a family. The support, laughter, and wisdom shared here keep me grounded and inspired."</p>
                  <p className="font-bold text-primary">– Member, Abuja Chapter</p>
               </div>
               <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm">
                  <p className="italic text-slate-600 dark:text-slate-300 mb-6">"HR Mentorship helped me rediscover my confidence. It’s not just a community — it’s where leaders are built."</p>
                  <p className="font-bold text-primary">– Member, Port Harcourt Chapter</p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. REPLACED CTA SECTION (Purple Background) */}
      <section className="py-32 bg-primary relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Be Part of the Story</h2>
            <p className="text-xl text-white/90 mb-10">Whether you’re an aspiring HR professional, a seasoned leader, or someone looking to grow, HR Mentorship welcomes you.</p>
            <div className="flex justify-center">
               <a href="https://t.me/hrmentorship" target="_blank" className="px-12 py-5 bg-white text-primary font-bold text-lg rounded-full shadow-2xl hover:scale-105 hover:shadow-white/20 transition-all flex items-center gap-2">
                  Join the Movement <ArrowRight size={20}/>
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
