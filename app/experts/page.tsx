import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_EXPERTS } from "@/data/mock";
import { Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ExpertsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Image Banner */}
      <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">The Experts Council</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light font-body">
            A collective of the most seasoned HR veterans in the industry.
          </p>
        </div>
      </section>

      {/* Experts Grid (Square Cards) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_EXPERTS.map((expert) => (
              <Link key={expert.id} href={"/experts/" + expert.id} className="group">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Square Image container */}
                  <div className="aspect-square w-full overflow-hidden relative bg-slate-200">
                    <img 
                      src={expert.imageUrl} 
                      alt={expert.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">View Full Profile</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold font-heading mb-1 group-hover:text-primary transition-colors">{expert.name}</h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm mb-4">{expert.role}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{expert.company}</span>
                      <Linkedin className="h-5 w-5 text-slate-400 hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading mb-4">Are you an HR Veteran?</h2>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 mt-4 rounded-full px-8">Apply to Join Council</Button>
         </div>
      </section>
    </div>
  );
}
