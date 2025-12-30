import { prisma } from '@/lib/prisma';
import { Download } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BooksPage() {
  const books = await prisma.resource.findMany({ where: { type: 'Book' }, orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 pt-32 px-6">
       <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">Book of the Month</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {books.map(book => (
                <div key={book.id} className="bg-white p-6 rounded-xl shadow-lg text-center">
                   <div className="h-64 bg-slate-200 rounded-lg mb-6 flex items-center justify-center text-slate-400 font-bold">Book Cover</div>
                   <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                   <a href={book.fileUrl} className="inline-flex items-center gap-2 text-primary font-bold hover:underline"><Download size={16}/> Download/Read</a>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
