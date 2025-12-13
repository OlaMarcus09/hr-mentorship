import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center space-y-6 md:space-y-8">
        
        {/* Top Badge */}
        <div className="flex justify-center">
           <Badge className="bg-white/10 text-white hover:bg-white/20 border-white/20 px-4 py-1 text-sm font-normal">
              Trusted by 500+ HR Professionals
           </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tight font-heading leading-tight">
          Elevate Your <span className="text-cyan-400">HR Career</span>
        </h1>
        
        {/* Description */}
        <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto font-light font-body leading-relaxed">
          Transform your expertise with personalized mentorship and cutting-edge resources.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 pt-8 border-t border-white/10 max-w-3xl mx-auto text-white">
          <div>
            <div className="text-2xl md:text-4xl font-bold font-heading">98%</div>
            <div className="text-xs md:text-sm text-gray-300">Career Growth</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold font-heading">10K+</div>
            <div className="text-xs md:text-sm text-gray-300">Professionals</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold font-heading">7k+</div>
            <div className="text-xs md:text-sm text-gray-300">Mentees</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
           <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8 h-12 text-lg border-none">
             Start Your Journey
           </Button>
           {/* FIXED: Added 'bg-transparent' to stop it from being white in light mode */}
           <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900 rounded-full px-8 h-12 text-lg">
             Explore Programs
           </Button>
        </div>
      </div>
    </div>
  );
}
