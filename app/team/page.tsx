import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

export default function TeamPage() {
  const coreTeam = [
    {
      name: "Oluyemi Adeosun, PhD, DTM",
      role: "Founder & Visionary Leader",
      image: "/team/oluyemi.jpg",
      bio: "A top-performing HR Executive and Economist with over 24 years of experience spanning Power, Oil & Gas, and Fintech."
    },
    {
      name: "Irene Ewheme Obagwu",
      role: "Director of Brand & Creativity",
      image: "/team/irene.jpg",
      bio: "A dynamic HR professional and creative strategist leading the community's storytelling and visual identity."
    },
    {
      name: "Deborah Dumbiri",
      role: "Director of Finance and Welfare",
      image: "/team/deborah.jpg",
      bio: "Seasoned HR professional driving people strategies and member well-being initiatives."
    },
    {
      name: "Adenrele Amosu",
      role: "Director of People Engagement",
      image: "/team/adenrele.jpg",
      bio: "Over 15 years of cross-sector experience, driving initiatives that strengthen connection and inclusivity."
    },
    {
      name: "Omobolajoko Sowemimo",
      role: "Projects & Operations Director",
      image: "/team/omobolajoko.jpg",
      bio: "HR and Culture Leader aligning talent strategy with business excellence."
    },
    {
      name: "Abimbola Victoria Akindiilete",
      role: "Director of Web and ICT",
      image: "/team/abimbola.jpg",
      bio: "Strategic HR leader overseeing digital strategy and technology-driven communication systems."
    },
    {
      name: "Ajoke Oyedele-Omotayo",
      role: "Director of Counselling and Support",
      image: "/team/ajoke.jpg",
      bio: "Executive People Strategist with over 25 years of corporate leadership experience."
    },
    {
      name: "Titilope Kolade-Iyiola",
      role: "Director of Publicity",
      image: "/team/titilope.jpg",
      bio: "Managing event publicity and information flow to keep the community connected."
    },
    {
      name: "Yetunde Akintoye",
      role: "Director of Membership",
      image: "/team/yetunde.jpg",
      bio: "Championing initiatives that strengthen connection, inclusion, and professional development."
    },
    {
      name: "Olukunle Hunge",
      role: "Director of Socials",
      image: "/team/olukunle.jpg",
      bio: "Fostering connection and belonging through social programs and wellness initiatives."
    },
    {
      name: "Tochukwu Emeka Umeh",
      role: "Coordinator – Northern Nigeria",
      image: "/team/tochukwu.jpg",
      bio: "Advocate for people development driving community growth across Northern Nigeria."
    },
    {
      name: "Victor Agu",
      role: "Creative & Data Integration",
      image: "/team/victor.jpg",
      bio: "Merging analytics with people strategy to drive organizational success."
    },
    {
      name: "Ugochi Obi",
      role: "Director, Job Alert & Employability",
      image: "/team/ugochi.jpg",
      bio: "Leading one of Nigeria’s largest online employability communities."
    },
    {
      name: "Ezinne Obiora (Zee)",
      role: "Director, Book Club",
      image: "/team/ezinne.jpg",
      bio: "Curating conversations that stretch minds and connect perspectives through literature."
    },
    {
      name: "Monisola Ibhade Oyelaja",
      role: "Director, Chaplaincy & Pastoral Care",
      image: "/team/monisola.jpg",
      bio: "Providing emotional and spiritual guidance to members with empathy and grace."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">Our Leadership</h1>
             <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
               The visionaries and strategists driving HR excellence across Africa.
             </p>
          </div>

          {/* CORE TEAM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {coreTeam.map((member, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group text-center">
                   <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-slate-100 dark:border-slate-800 relative">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition duration-500"
                        // Fallback logic not strictly possible in static export easily, 
                        // so user MUST ensure images exist in public/team/
                      />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                   <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{member.role}</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{member.bio}</p>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
