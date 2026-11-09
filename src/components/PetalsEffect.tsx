"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
  color: string;
}

export default function PetalsEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Generate 20 floating petals
    const colors = [
      "rgba(212, 175, 55, 0.45)", // gold
      "rgba(251, 194, 235, 0.5)", // soft rose
      "rgba(244, 114, 182, 0.4)", // pink
      "rgba(254, 240, 138, 0.35)", // golden shimmer
    ];

    const generated: Petal[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 14,
      animationDelay: Math.random() * 8,
      size: 10 + Math.random() * 14,
      opacity: 0.2 + Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setPetals(generated);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: `${petal.left}%`,
            top: "-20px",
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            backgroundColor: petal.color,
            borderRadius: "50% 0 50% 50%",
            transform: "rotate(45deg)",
            filter: "blur(0.5px)",
            opacity: petal.opacity,
          }}
        />
      ))}
      <button
        onClick={() => setIsEnabled(false)}
        title="Hide floating petals"
        className="pointer-events-auto fixed bottom-5 left-5 z-40 p-2 text-xs text-[#d4af37]/60 hover:text-[#d4af37] bg-[#0b1411]/80 backdrop-blur-md rounded-full border border-[#d4af37]/20 transition-all"
      >
        🌸 Petals
      </button>
    </div>
  );
}
