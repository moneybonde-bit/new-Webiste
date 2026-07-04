import React from 'react';
import { cn } from "@/src/lib/utils";
import { siteConfig } from "../../config/site";

interface LogoProps {
  className?: string;
}

export function LogoIcon({ className }: LogoProps) {
  return (
    <picture>
      <source srcSet="/logos/luxavian-logo-48.webp" type="image/webp" />
      <img
        src="/logos/luxavian-logo-48.png"
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        className={cn("w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]", className)}
      />
    </picture>
  );
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center justify-center w-10 h-10 rounded-xl relative shrink-0" aria-hidden="true">
        <div className="w-8 h-8">
          <LogoIcon />
        </div>
      </div>
      <div className="flex flex-col leading-none justify-center">
        <span className="text-xl font-bold tracking-tight text-white mb-0.5">{siteConfig.name}</span>
        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">Digital Studio</span>
      </div>
    </div>
  );
}
