"use client";
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-stone-900/95 py-4 shadow-md' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
        
        {/* Logo - Ab Grandpa ke liye */}
        <div className="flex items-center gap-2">
          <Heart className="text-amber-400 fill-amber-400" size={24} />
          <span className="font-serif text-xl tracking-[0.15em] uppercase font-bold">Grandpa & Me</span>
        </div>
        
        <div className="hidden md:flex gap-8 font-sans text-xs tracking-[0.2em] uppercase font-bold text-white/90">
          <Link href="/" className="hover:text-amber-400 transition">Home</Link>
          <Link href="#stories" className="hover:text-amber-400 transition">Our Stories</Link>
          <Link href="#tribute" className="hover:text-amber-400 transition">Tribute</Link>
        </div>

        <button className="hidden md:block border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-stone-900 transition text-xs font-bold uppercase tracking-widest">
          Add Memory
        </button>
      </div>
    </nav>
  );
}