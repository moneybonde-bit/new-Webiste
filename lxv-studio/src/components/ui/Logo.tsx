import React from 'react';
import { cn } from "@/src/lib/utils";

interface LogoProps {
  className?: string;
}

export function LogoIcon({ className }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="Luxavian Logo"
      className={cn("w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]", className)} 
    />
  );
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center justify-center w-10 h-10 rounded-xl relative">
        <div className="w-8 h-8">
          <LogoIcon />
        </div>
      </div>
      <div className="flex flex-col leading-none justify-center">
        <span className="text-xl font-bold tracking-tight text-white mb-0.5">Luxavian</span>
        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">Digital Studio</span>
      </div>
    </div>
  );
}
