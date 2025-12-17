"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_EVENTS } from "@/data/mock";
import { Plus, Calendar, MapPin, Trash2, Pencil } from "lucide-react";

export default function AdminEventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Events Manager</h1>
          <p className="text-muted-foreground">Schedule webinars and workshops.</p>
        </div>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" /> Schedule Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_EVENTS.map((event) => (
          <Card key={event.id} className="overflow-hidden group">
            <div className="h-40 bg-slate-100 relative">
               <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               <div className="absolute top-2 right-2 flex gap-2">
                 <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-blue-600">
                    <Pencil className="h-4 w-4" />
                 </Button>
                 <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full">
                    <Trash2 className="h-4 w-4" />
                 </Button>
               </div>
            </div>
            <CardContent className="p-5">
              <Badge variant="outline" className="mb-2">Upcoming</Badge>
              <h3 className="font-bold text-lg mb-2 truncate">{event.title}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                   <Calendar className="h-3 w-3" /> {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                   <MapPin className="h-3 w-3" /> {event.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Empty State Card for Visual Balance */}
        <button className="h-full min-h-[250px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors bg-slate-50 dark:bg-slate-900/50">
           <Plus className="h-8 w-8 mb-2" />
           <span className="font-medium">Add New Event</span>
        </button>
      </div>
    </div>
  );
}
