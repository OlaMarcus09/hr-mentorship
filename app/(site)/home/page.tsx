import Hero from "@/components/Hero";
import { MOCK_EVENTS, MOCK_TEAM } from "@/data/mock";
import { 
  MissionSection, 
  TeamPreviewSection, 
  EventsSection, 
  GallerySection, 
  CTASection 
} from "@/components/sections";

export default function Home() {
  const galleryItems = [
    {
      imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
      label: "Workshop",
      className: "col-span-1 md:col-span-2 row-span-2"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
      label: "Event",
      className: "col-span-1"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
      label: "Mentorship",
      className: "col-span-1"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      label: "",
      className: "col-span-1 md:col-span-2"
    }
  ];

  const ctaButtons = [
    {
      text: "Become a Mentee",
      className: "bg-white text-purple-900 hover:bg-gray-100 rounded-full px-8 h-14 text-lg font-bold"
    },
    {
      text: "Join as Mentor",
      variant: "outline" as const,
      className: "text-white border-white hover:bg-white hover:text-purple-900 rounded-full px-8 h-14 text-lg font-bold"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      <MissionSection
        badge="About HR Mentorship"
        title="Empowering the Next Generation of HR Professionals"
        description="HR Mentorship is a global platform dedicated to bridging the gap between aspiring HR professionals and experienced leaders. We foster growth through structured mentorship, knowledge-sharing, and real-world exposure — creating a community where every HR professional can thrive with purpose, clarity, and confidence."
        quote="Our goal is to cultivate human resource experts who not only understand organizational dynamics but also champion people-first leadership in workplaces around the world."
      />

      <TeamPreviewSection
        title="Meet Our Expert Team"
        description="Learn from industry-leading HR professionals with decades of combined experience"
        members={MOCK_TEAM}
        maxDisplay={4}
      />

      <EventsSection
        title="Upcoming Events"
        description="Join our workshops, summits, and training sessions to accelerate your HR career"
        events={MOCK_EVENTS}
      />

      <GallerySection
        title="Our Community in Action"
        description="Experience the energy and collaboration of our HR professional community"
        items={galleryItems}
      />

      <CTASection
        badge="Join Our Growing Community"
        title='Ready to Take the Next Step in<br/> Your <span class="text-purple-300">HR Journey?</span>'
        description="Join thousands of HR professionals who are transforming their careers through expert mentorship, practical guidance, and an empowering network designed for your success."
        buttons={ctaButtons}
      />
    </div>
  );
}
