import { prisma } from '@/lib/prisma';
import { Calendar, MapPin } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getEvents() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' }
  });
  return events;
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Upcoming Events & Workshops</h1>
        <p className="text-xl text-gray-600">Join our sessions to grow your career and network.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No upcoming events scheduled.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
              {/* Event Image */}
              <div className="h-48 bg-gray-100 relative">
                {event.image ? (
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Calendar size={48} />
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar size={16} className="text-blue-600" />
                    <span>{new Date(event.date).toDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin size={16} className="text-red-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <button className="mt-6 w-full py-2 border border-black rounded-lg hover:bg-black hover:text-white transition font-medium">
                  Register Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
