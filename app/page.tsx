import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_EVENTS, MOCK_TEAM } from "@/data/mock";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Users, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* SECTION 1: Mission (Exact Wording) */}
      <section className="py-20 bg-white dark:bg-slate-950 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1">
             About HR Mentorship
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8 text-slate-900 dark:text-white leading-tight">
            Empowering the Next Generation of HR Professionals
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            HR Mentorship is a global platform dedicated to bridging the gap between aspiring HR professionals and experienced leaders. We foster growth through structured mentorship, knowledge-sharing, and real-world exposure — creating a community where every HR professional can thrive with purpose, clarity, and confidence.
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 my-12">
             <p className="text-xl md:text-2xl font-medium text-purple-900 dark:text-purple-300 italic font-heading">
               "Our goal is to cultivate human resource experts who not only understand organizational dynamics but also champion people-first leadership in workplaces around the world."
             </p>
             <div className="mt-6">
                <Link href="/about" className="text-purple-600 font-bold hover:underline inline-flex items-center">
                   Explore More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Meet Our Expert Team (Exact Wording) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                 Learn from industry-leading HR professionals with decades of combined experience
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_TEAM.slice(0,4).map((member) => (
                 <Card key={member.id} className="text-center border-none shadow-sm hover:shadow-xl transition-shadow bg-white dark:bg-slate-950 p-6 rounded-3xl">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800">
                       <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold font-heading">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                    <div className="flex justify-center gap-1 text-yellow-500 text-sm items-center">
                       <Trophy className="h-3 w-3" /> 10+ years experience
                    </div>
                 </Card>
              ))}
           </div>
           
           <div className="text-center mt-12">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-lg">
                 View Full Team
              </Button>
           </div>
        </div>
      </section>

      {/* SECTION 3: Upcoming Events (Exact Wording) */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Join our workshops, summits, and training sessions to accelerate your HR career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {MOCK_EVENTS.map((event) => (
              <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden border-none shadow-lg rounded-3xl bg-white dark:bg-slate-900">
                <div className="p-8 flex-1">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4 px-3 py-1">Workshop</Badge>
                  <h3 className="text-2xl font-bold font-heading mb-2">{event.title}</h3>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                     <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Virtual</span>
                     <span className="flex items-center gap-2"><Users className="h-4 w-4" /> 127 attending</span>
                  </div>
                  <Button variant="outline" className="rounded-full">Register Now</Button>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-8 flex flex-col justify-center items-center text-center min-w-[150px]">
                   <span className="text-purple-600 font-bold text-lg">Feb 15, 2024</span>
                   <span className="text-sm text-muted-foreground">2:00 PM EST</span>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-lg">
                View All Events
             </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4: Community In Action (Gallery) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Our Community in Action</h2>
               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Experience the energy and collaboration of our HR professional community
               </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
               <div className="col-span-1 md:col-span-2 row-span-2 rounded-3xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">Workshop</div>
               </div>
               <div className="col-span-1 rounded-3xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">Event</div>
               </div>
               <div className="col-span-1 rounded-3xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">Mentorship</div>
               </div>
               <div className="col-span-1 md:col-span-2 rounded-3xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
               </div>
            </div>
            
            <div className="text-center mt-12">
               <Link href="/gallery">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-lg">
                     View Full Gallery
                  </Button>
               </Link>
            </div>
         </div>
      </section>

      {/* SECTION 5: Bottom CTA (Purple Gradient) */}
      <section className="py-24 bg-gradient-to-br from-purple-900 to-indigo-900 text-center text-white">
        <div className="container mx-auto px-4">
           <Badge className="bg-white/10 text-white hover:bg-white/20 mb-6 border-none px-4 py-1">Join Our Growing Community</Badge>
           <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
             Ready to Take the Next Step in<br/> Your <span className="text-purple-300">HR Journey?</span>
           </h2>
           <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed">
             Join thousands of HR professionals who are transforming their careers through expert mentorship, practical guidance, and an empowering network designed for your success.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 rounded-full px-8 h-14 text-lg font-bold">
               Become a Mentee
             </Button>
             <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900 rounded-full px-8 h-14 text-lg font-bold">
               Join as Mentor
             </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
