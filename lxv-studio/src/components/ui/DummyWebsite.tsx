import React from 'react';
import { motion } from 'motion/react';

export function DummyWebsite({ variant }: { variant: 'business' | 'dashboard' | 'organization' }) {
  if (variant === 'dashboard') {
    return (
      <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col p-4 md:p-8 font-sans">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <div className="font-bold text-xl flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-neon-purple" /> AdminPro
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/10" />
            <div className="w-8 h-8 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Metric {i}</div>
              <div className="text-3xl font-bold">12,34{i}</div>
              <div className="text-xs text-neon-pink mt-2">↑ +14% from last month</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="w-full h-full rounded bg-white/5 flex flex-col justify-end p-4 gap-2">
            {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ width: 0 }}
                animate={{ width: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-8 bg-neon-purple/50 rounded"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'organization') {
    return (
      <div className="w-full h-full bg-white text-gray-900 flex flex-col overflow-y-auto font-serif">
        <header className="bg-[#1a365d] text-white p-6 flex justify-between items-center shrink-0">
          <div className="font-bold text-2xl tracking-tight">Hope Foundation</div>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <span>About Us</span>
            <span>Programs</span>
            <span>Get Involved</span>
          </div>
          <button className="bg-white text-[#1a365d] px-4 py-2 rounded font-bold text-sm">Donate Now</button>
        </header>
        <div className="relative h-64 bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Charity" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Empowering Communities</h1>
            <p className="text-lg opacity-90 max-w-lg mx-auto">Join us in our mission to bring sustainable change to those who need it most.</p>
          </div>
        </div>
        <div className="p-8 md:p-12 flex gap-8 flex-col md:flex-row">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-[#1a365d]">Our Latest Impact</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Image Placeholder</div>
          </div>
          <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-4">Upcoming Events</h3>
            <ul className="space-y-4">
              {[1, 2].map((i) => (
                <li key={i} className="border-l-2 border-[#1a365d] pl-4">
                  <div className="text-xs font-bold text-gray-500">AUG 1{i}</div>
                  <div className="font-medium">Community Workshop {i}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Default: business
  return (
    <div className="w-full h-full bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm shrink-0">
        <div className="font-black text-xl tracking-tighter">STUDIO<span className="text-neon-pink">X</span></div>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium hidden md:block">Services</span>
          <span className="text-sm font-medium hidden md:block">Work</span>
          <div className="w-10 h-10 bg-slate-900 rounded-full text-white flex items-center justify-center">→</div>
        </div>
      </nav>
      <div className="flex-1 p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
            WE BUILD <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">DIGITAL</span> EXPERIENCES.
          </h1>
          <p className="text-slate-500 text-lg max-w-md">Transforming ideas into modern, scalable web applications that drive growth.</p>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">Get Started</button>
        </div>
        <div className="flex-1 relative w-full aspect-square md:aspect-auto h-full min-h-[300px]">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-48 h-64 bg-gradient-to-br from-neon-pink to-orange-400 rounded-2xl shadow-2xl"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 w-56 h-48 bg-gradient-to-tr from-neon-purple to-blue-500 rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
