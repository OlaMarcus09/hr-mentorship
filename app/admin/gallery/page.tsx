"use client"

import { Button } from "@/components/ui/button";
import { Upload, Trash2, Maximize2 } from "lucide-react";

// Mock Gallery Data for Admin
const ADMIN_GALLERY = [
  "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80"
];

export default function AdminGalleryPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Gallery Manager</h1>
          <p className="text-muted-foreground">Upload photos from past events.</p>
        </div>
        <Button className="bg-primary">
          <Upload className="mr-2 h-4 w-4" /> Upload Photo
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ADMIN_GALLERY.map((src, i) => (
          <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100">
             <img src={src} alt="Gallery item" className="w-full h-full object-cover" />
             
             {/* Overlay Actions */}
             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="outline" className="h-8 w-8 border-white text-white hover:bg-white hover:text-black">
                   <Maximize2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" className="h-8 w-8">
                   <Trash2 className="h-4 w-4" />
                </Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
