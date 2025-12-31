"use client";

export default function VideoCard({ url, title }: { url: string, title: string }) {
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
      {/* Standard YouTube Embed - Shows Actual Preview */}
      <div className="relative aspect-video bg-black">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}`} 
          className="absolute inset-0 w-full h-full" 
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          loading="lazy" // Optimization for speed
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
         <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 text-sm md:text-base">{title}</h3>
      </div>
    </div>
  );
}
