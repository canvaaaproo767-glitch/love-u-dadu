import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#292524] text-stone-400 py-16 px-6 font-sans border-t border-stone-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        
        <div>
          <h3 className="text-white font-serif text-2xl mb-2">Legacy of Love</h3>
          <p className="text-sm tracking-wider uppercase opacity-60">Forever in our hearts</p>
        </div>

        <div className="flex flex-col items-center">
          <Heart className="text-amber-700 mb-4 fill-amber-900/20" size={30} />
          <p className="text-sm italic">"To the man who held my hand and taught me to walk."</p>
        </div>

        <div className="text-sm opacity-50">
          &copy; {new Date().getFullYear()} A Granddaughter's Tribute.
        </div>
      </div>
    </footer>
  );
}