"use client";

import { useEffect, useState } from "react";

export default function ChristmasSpirit() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* 1. CHRISTMAS LIGHTS (Top of screen) */}
      <div className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden h-6">
        <ul className="flex space-x-6 md:space-x-12">
           {Array.from({ length: 20 }).map((_, i) => (
             <li 
               key={i} 
               className={`
                 relative w-3 h-3 md:w-4 md:h-4 rounded-full animate-pulse
                 ${i % 3 === 0 ? "bg-red-500 shadow-[0_0_10px_3px_rgba(239,68,68,0.6)]" : 
                   i % 3 === 1 ? "bg-green-500 shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]" : 
                   "bg-yellow-400 shadow-[0_0_10px_3px_rgba(250,204,21,0.6)]"}
               `}
               style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.5s' }}
             />
           ))}
        </ul>
        {/* Wire for lights */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/50 rounded-b-full translate-y-[-2px]"></div>
      </div>

      {/* 2. FALLING SNOW (CSS Generated) */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-80"
          style={{
            top: `-${Math.random() * 20}px`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            animation: `snowfall ${Math.random() * 5 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(20px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
