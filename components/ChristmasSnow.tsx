"use client";
import { useEffect, useState } from "react";

export default function ChristmasSnow() {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Create 50 snowflakes
    setSnowflakes(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {snowflakes.map((i) => (
        <div
          key={i}
          className="absolute text-white/40 animate-fall text-xl"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            top: -20
          }}
        >
          ❄
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
