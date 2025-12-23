import Image from 'next/image';
import AlbumCard from '@/components/AlbumCard';

// --- SMART URL SYSTEM ---
// Localhost par 'http://127.0.0.1:3000' lega, Netlify par jo set karoge wo lega.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

async function getStories() {
  try {
    const res = await fetch(`${API_BASE}/api/stories`, {  // <--- Dynamic URL
      cache: 'no-store',
      next: { tags: ['stories'] }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) { return []; }
}

export default async function Home() {
  const allStories: any[] = await getStories();

  const coverStory = allStories.find((s) => s.type === 'cover');
  const coverImage = coverStory ? coverStory.imageUrl : "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1780&auto=format&fit=crop";
  const featuredStory = allStories.find((s) => s.type === 'featured');
  const albumStories = allStories.filter((s) => (s.type === 'album' || !s.type) && s._id !== featuredStory?._id);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#292524] overflow-x-hidden">
      
      {/* === 1. HERO SECTION === */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image src={coverImage} alt="Cover" fill className="object-cover opacity-90" priority />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
        </div>

        <div className="relative z-20 text-white max-w-5xl mx-auto px-4 pt-20 animate-fade-in-up">
          <p className="font-serif italic text-amber-200 text-lg md:text-3xl mb-4 md:mb-6 tracking-widest uppercase opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            The Legacy of
          </p>
          <h1 className="font-serif text-5xl md:text-9xl leading-none mb-6 md:mb-8 drop-shadow-2xl opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            Grandpa
          </h1>
          <div className="h-1 w-16 md:w-24 bg-amber-500 mx-auto mb-6 md:mb-8 rounded-full opacity-0 animate-[growWidth_1s_ease-out_1.5s_forwards]"></div>
          <p className="text-base md:text-2xl font-light opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards] max-w-xl mx-auto text-stone-200 leading-relaxed font-sans px-2">
            "Your stories are the roots that hold us strong, and your love is the sunlight that helps us grow."
          </p>
        </div>
      </section>

      {/* === 2. FEATURED STORY === */}
      {featuredStory && (
        <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            
            <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 md:w-16 bg-amber-700"></span>
                <span className="text-amber-700 font-serif italic text-lg md:text-xl uppercase tracking-widest">Featured Memory</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-5">
                <h2 className="font-serif text-4xl md:text-6xl text-[#292524] leading-tight capitalize inline">
                  {featuredStory.title}
                </h2>
                {/* Fixed Typography: Same Style for Category */}
                <span className="font-serif text-4xl md:text-6xl text-[#292524] leading-tight capitalize inline">
                  {featuredStory.category}
                </span>
              </div>
              
              <div className="prose prose-lg md:prose-xl text-stone-600 font-serif leading-relaxed italic border-l-4 border-amber-200 pl-4 md:pl-6">
                <p>"{featuredStory.description}"</p>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center perspective-1000">
              <div className="relative group cursor-pointer transition-all duration-700 ease-out hover:scale-105">
                <div className="bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-2xl rotate-2 md:rotate-3 transition-transform duration-500 group-hover:rotate-0 border border-stone-100">
                  <div className="relative aspect-[4/5] w-[280px] md:w-[450px] overflow-hidden bg-stone-200">
                    <Image src={featuredStory.imageUrl} alt="feat" fill className="object-cover filter sepia-[0.2] group-hover:sepia-0 transition-all duration-700" />
                  </div>
                  <p className="absolute bottom-3 right-5 font-serif italic text-stone-400 text-lg md:text-2xl rotate-[-2deg]">
                    A moment in time...
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* === 3. ALBUM GRID === */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-[#F2F0E6] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-serif text-4xl md:text-7xl text-[#292524] mb-4">Memory Lane</h2>
            <p className="font-serif italic text-stone-500 text-lg">Tap to read full stories.</p>
          </div>
          
          {albumStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
              {albumStories.map((story) => (
                <AlbumCard key={story._id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-stone-300 rounded-xl">
              <p className="text-stone-400 font-serif text-xl italic">Waiting for memories...</p>
            </div>
          )}
        </div>
      </section>

      {/* === FOOTER === */}
      <section className="py-16 md:py-24 bg-neutral-900 text-[#FAF9F6] text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 text-amber-500 text-3xl">❦</div>
          <p className="font-serif text-2xl md:text-5xl italic leading-tight mb-8 opacity-90">
            "We didn't realize we were making memories, we just knew we were having fun."
          </p>
          <div className="h-px w-16 bg-stone-600 mx-auto mb-6"></div>
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60">Forever in our Hearts</p>
        </div>
      </section>
      
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } @keyframes growWidth { from { width: 0; opacity: 0; } to { width: 6rem; opacity: 1; } }`}</style>
    </main>
  );
}