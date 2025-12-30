import { prisma } from '@/lib/prisma';
import { Download } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BooksPage() {
  const books = await prisma.resource.findMany({ where: { type: 'Book' }, orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       <section className="pt-48 pb-20 px-6 bg-primary text-center text-white">
          <h1 className="text-4xl font-bold mb-6">Book of the Month</h1>
          <p className="text-xl opacity-90">Recommended reads for HR Professionals.</p>
       </section>

       <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {books.map(book => (
                <div key={book.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg text-center border border-slate-100 dark:border-slate-800">
                   <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6 flex items-center justify-center text-slate-400 font-bold">Book Cover</div>
                   <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{book.title}</h3>
                   <a href={book.fileUrl} className="inline-flex items-center gap-2 text-primary font-bold hover:underline"><Download size={16}/> Download/Read</a>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
