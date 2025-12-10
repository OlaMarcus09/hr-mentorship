import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_EVENTS } from "@/data/mock";
import { Calendar, MapPin, Clock, Plus } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Upcoming Events</h1>
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light">
             Webinars, Summits, and Workshops to level up your game.
          </p>
          <div className="mt-8">
            <Button className="bg-white text-primary hover:bg-gray-100 rounded-full font-bold px-8">
               <Plus className="mr-2 h-4 w-4" /> Submit an Event
            </Button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {MOCK_EVENTS.map((event) => (
             <Card key={event.id} className="overflow-hidden border-none shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden relative">
                   <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                   <div className="absolute top-4 right-4 bg-white text-primary font-bold px-3 py-1 rounded text-sm shadow-sm">
                      Upcoming
                   </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                   <div className="flex items-center text-sm text-cyan-600 font-bold mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                   </div>
                   <h3 className="text-xl font-bold font-heading mb-2">{event.title}</h3>
                   <p className="text-muted-foreground text-sm mb-6 flex-1">
                      {event.summary}
                   </p>
                   
                   <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm">
                      <div className="flex items-center text-muted-foreground">
                         <Clock className="h-4 w-4 mr-2" /> {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                         <MapPin className="h-4 w-4 mr-2" /> {event.location}
                      </div>
                   </div>
                   
                   <Button className="w-full mt-6">Register Now</Button>
                </CardContent>
             </Card>
           ))}
        </div>
      </section>
    </div>
  );
}
