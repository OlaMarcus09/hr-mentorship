"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

export default function VideoCard({ url, title }: { url: string, title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube ID
  const getYoutubeId = (link: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(url);

  if (!videoId) {
    return (
      <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
        Invalid Video Link
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full group">
      {/* Video Area */}
      <div className="relative aspect-video bg-black">
        {!isPlaying ? (
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full relative block group-hover:opacity-90 transition"
          >
            {/* High Quality Thumbnail */}
            <Image 
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
              alt={title} 
              fill 
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
              <PlayCircle size={64} className="text-white drop-shadow-lg scale-100 group-hover:scale-110 transition duration-300" />
            </div>
          </button>
        ) : (
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
            className="absolute inset-0 w-full h-full" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            title={title}
          />
        )}
      </div>

      {/* Text Area */}
      <div className="p-6 flex flex-col flex-1">
         <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{title}</h3>
         <div className="mt-auto pt-4">
           <a 
             href={url} 
             target="_blank" 
             className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
           >
             Watch on YouTube
           </a>
         </div>
      </div>
    </div>
  );
}
