"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function AlbumCard({ story }: { story: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)} 
      className={`group relative bg-white p-3 shadow-md rounded-sm cursor-pointer transition-all duration-500 ease-in-out
        ${isExpanded ? 'shadow-2xl scale-[1.02] z-20' : 'hover:shadow-xl hover:-translate-y-2'}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <Image 
          src={story.imageUrl} 
          alt={story.title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Bottom - Expanding Part */}
      <div className={`pt-6 pb-4 px-4 text-center transition-colors duration-500 ${isExpanded ? 'bg-amber-50/80' : 'bg-white'}`}>
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em] mb-2 block">
          {story.category}
        </span>
        <h3 className="font-serif text-2xl text-[#292524] mb-3 capitalize group-hover:text-amber-700 transition-colors">
          {story.title}
        </h3>
        
        {/* Description with conditional line-clamp */}
        <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-[4.5em] opacity-80'}`}>
           <p className={`text-stone-600 text-sm font-sans leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
             {story.description}
           </p>
           {/* Blur fade effect when collapsed */}
           {!isExpanded && (
             <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
           )}
        </div>

        {/* Expand/Collapse Hint */}
        <p className="text-amber-700 text-[10px] uppercase tracking-widest mt-4 font-bold opacity-60 group-hover:opacity-100 transition-opacity">
          {isExpanded ? 'Tap to Close' : 'Tap to Read Story'}
        </p>
      </div>
    </div>
  );
}