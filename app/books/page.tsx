import { prisma } from '@/lib/prisma';
import Image from "next/image";
import { Download } from "lucide-react";

export const revalidate = 60;

export default async function BooksPage() {
  const books = await prisma.resource.findMany({ where: { type: 'Book' }, orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       <section className="relative pt-48 pb-20 px-6 bg-primary w-full overflow-hidden">
         <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200" 
              alt="Books Hero" 
              fill 
              className="object-cover opacity-20"
              priority
            />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Book of the Month</h1>
            <p className="text-xl text-white/90">Recommended reads for HR Professionals.</p>
         </div>
       </section>

       <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {books.map(book => (
                <div key={book.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg text-center border border-slate-100 dark:border-slate-800 w-full">
                   <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6 flex items-center justify-center text-slate-400 font-bold relative overflow-hidden">
                      {/* Placeholder for Book Cover if available, or text */}
                      Book Cover
                   </div>
                   <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{book.title}</h3>
                   <a href={book.fileUrl} className="inline-flex items-center gap-2 text-primary font-bold hover:underline"><Download size={16}/> Download/Read</a>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
