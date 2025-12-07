import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container px-4 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-heading">
          Elevate Your <span className="text-cyan-400 italic">HR Career</span>
        </h1>
        
        <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light font-body">
          Connect with veterans, access world-class courses, and find top remote opportunities in one ecosystem.
        </p>

        {/* Search Bar - More rounded now */}
        <div className="flex w-full max-w-lg mx-auto items-center space-x-2 bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20">
          <Input 
            type="text" 
            placeholder="Find a mentor, course, or job..." 
            className="bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0 text-lg px-4"
          />
          <Button size="icon" className="bg-cyan-500 hover:bg-cyan-600 text-white shrink-0 rounded-full h-10 w-10">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-3xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-white font-heading">500+</div>
            <div className="text-sm text-cyan-200 uppercase tracking-wider font-body">Mentors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-heading">120+</div>
            <div className="text-sm text-cyan-200 uppercase tracking-wider font-body">Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white font-heading">50k+</div>
            <div className="text-sm text-cyan-200 uppercase tracking-wider font-body">Members</div>
          </div>
        </div>
      </div>
    </div>
  );
}
