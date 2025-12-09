import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_TEAM } from "@/data/mock";
import { Users, Target, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner with Image */}
      <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
             backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Our Mission</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-body font-light">
            To democratize access to world-class HR mentorship and resources across Africa.
          </p>
        </div>
      </section>

      {/* 2. The Story (Split Layout) */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-heading text-primary mb-6">Bridging the Gap</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                HR Mentorship started with a simple observation: while the tech industry had abundant mentorship, HR professionals were often working in silos.
              </p>
              <p>
                We built this platform to connect the dots—bringing together veterans who have "seen it all" with the next generation of leaders who are hungry to learn.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 h-[400px] bg-slate-100 rounded-3xl overflow-hidden shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" 
               alt="Team meeting" 
               className="object-cover w-full h-full"
             />
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-heading mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg py-8">
              <CardContent className="flex flex-col items-center">
                <div className="h-16 w-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-cyan-600 dark:text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-muted-foreground">We set the gold standard for HR practices.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg py-8">
              <CardContent className="flex flex-col items-center">
                <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">We grow faster when we grow together.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg py-8">
              <CardContent className="flex flex-col items-center">
                <div className="h-16 w-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-orange-600 dark:text-orange-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-muted-foreground">Trust is the currency of our profession.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Core Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-heading mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_TEAM.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4 border-4 border-white shadow-lg">
                  <AvatarImage src={member.imageUrl} className="object-cover" />
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
