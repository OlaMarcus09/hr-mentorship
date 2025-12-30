import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function WebinarsPage() {
  // Logic: Show "Virtual" events OR "Video" resources
  const events = await prisma.event.findMany({ 
    where: { location: { contains: 'Virtual', mode: 'insensitive' } } 
  });
  
  return (
    <div className="min-h-screen bg-slate-50 pt-32 px-6">
       <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-12">Upcoming Webinars</h1>
          {events.length === 0 ? <p>No upcoming webinars scheduled.</p> : (
             <div className="grid gap-6">
                {events.map(e => (
                   <div key={e.id} className="bg-white p-6 rounded-xl shadow text-left">
                      <h3 className="font-bold text-xl">{e.title}</h3>
                      <p className="text-slate-500">{new Date(e.date).toLocaleDateString()}</p>
                   </div>
                ))}
             </div>
          )}
       </div>
    </div>
  );
}
