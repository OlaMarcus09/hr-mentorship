"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

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
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full hover:shadow-lg transition duration-300">
      
      {/* VIDEO AREA */}
      <div className="relative aspect-video bg-black group cursor-pointer">
        {!isPlaying ? (
          <div onClick={() => setIsPlaying(true)} className="absolute inset-0 w-full h-full relative">
            {/* 1. FAST LOADING THUMBNAIL (The Preview) */}
            <Image 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
              alt={title} 
              fill 
              className="object-cover opacity-90 group-hover:opacity-100 transition"
            />
            
            {/* 2. CUSTOM PLAY BUTTON OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-300">
                <Play fill="white" className="text-white ml-1" size={32} />
              </div>
            </div>
            
            {/* Badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
              YOUTUBE
            </div>
          </div>
        ) : (
          /* 3. ACTUAL PLAYER (Loads only when clicked) */
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
            className="absolute inset-0 w-full h-full" 
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
         <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 text-sm md:text-base">{title}</h3>
      </div>
    </div>
  );
}
