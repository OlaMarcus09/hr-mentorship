import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera, Users, ArrowRight } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
             backgroundImage: 'url("https://images.unsplash.com/photo-1505373877711-439c42643a8e?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
            Capturing moments from our community events and celebrating our members.
          </p>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Events Gallery Card */}
          <Link href="/events" className="group">
            <div className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" 
                alt="Events" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2 text-cyan-400">
                  <Camera className="h-6 w-6" />
                  <span className="font-bold uppercase tracking-wider text-sm">Collection</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Events Gallery</h3>
                <p className="text-gray-300 mb-6 max-w-md">Highlights from our summits, workshops, and networking mixers.</p>
                <Button variant="outline" className="w-fit text-white border-white hover:bg-card hover:text-foreground">
                  View Photos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>

          {/* Members Gallery Card */}
          <Link href="/about" className="group">
            <div className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80" 
                alt="Members" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2 text-purple-400">
                  <Users className="h-6 w-6" />
                  <span className="font-bold uppercase tracking-wider text-sm">Collection</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Members Gallery</h3>
                <p className="text-gray-300 mb-6 max-w-md">Meet the vibrant faces that make up the HR Mentorship community.</p>
                <Button variant="outline" className="w-fit text-white border-white hover:bg-card hover:text-foreground">
                  View Members <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
}
