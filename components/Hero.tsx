import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
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
        {/* CHANGED: text-3xl for mobile (was 4xl), semibold instead of bold */}
        <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight font-heading leading-tight">
          Elevate Your <span className="text-cyan-400 italic">HR Career</span>
        </h1>
        
        {/* CHANGED: text-base for mobile (was xl), lighter weight */}
        <p className="text-base md:text-xl text-gray-200 max-w-xl mx-auto font-light font-body leading-relaxed">
          Connect with veterans, access world-class courses, and find top remote opportunities.
        </p>

        {/* Search Bar - More compact on mobile */}
        <div className="flex w-full max-w-lg mx-auto items-center space-x-2 bg-white/10 p-1.5 rounded-full backdrop-blur-sm border border-white/20">
          <Input 
            type="text" 
            placeholder="Search mentors, jobs..." 
            className="bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0 text-base h-9 px-4"
          />
          <Button size="icon" className="bg-cyan-500 hover:bg-cyan-600 text-white shrink-0 rounded-full h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats - Compact Grid */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-2xl mx-auto">
          <div>
            <div className="text-xl md:text-3xl font-bold text-white font-heading">500+</div>
            <div className="text-[10px] md:text-sm text-cyan-200 uppercase tracking-wider font-body">Mentors</div>
          </div>
          <div>
            <div className="text-xl md:text-3xl font-bold text-white font-heading">120+</div>
            <div className="text-[10px] md:text-sm text-cyan-200 uppercase tracking-wider font-body">Courses</div>
          </div>
          <div>
            <div className="text-xl md:text-3xl font-bold text-white font-heading">50k+</div>
            <div className="text-[10px] md:text-sm text-cyan-200 uppercase tracking-wider font-body">Members</div>
          </div>
        </div>
      </div>
    </div>
  );
}
