import { MOCK_TEAM } from "@/data/mock";
import { Users, Target, Shield } from "lucide-react";
import { PageHero, StorySection, ValuesSection, TeamGridSection } from "@/components/sections";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We set the gold standard for HR practices.",
      iconBgColor: "bg-cyan-100 dark:bg-cyan-900",
      iconColor: "text-cyan-600 dark:text-cyan-300"
    },
    {
      icon: Users,
      title: "Community",
      description: "We grow faster when we grow together.",
      iconBgColor: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-300"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Trust is the currency of our profession.",
      iconBgColor: "bg-orange-100 dark:bg-orange-900",
      iconColor: "text-orange-600 dark:text-orange-300"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Our Mission"
        description="To democratize access to world-class HR mentorship and resources across Africa."
        backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80"
      />

      <StorySection
        title="Bridging the Gap"
        paragraphs={[
          "HR Mentorship started with a simple observation: while the tech industry had abundant mentorship, HR professionals were often working in silos.",
          "We built this platform to connect the dots—bringing together veterans who have \"seen it all\" with the next generation of leaders who are hungry to learn."
        ]}
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Team meeting"
      />

      <ValuesSection 
        title="Our Core Values" 
        values={values} 
      />

      <TeamGridSection
        title="Meet the Team"
        description="The people behind the platform dedicated to your growth."
        members={MOCK_TEAM}
      />
    </div>
  );
}
