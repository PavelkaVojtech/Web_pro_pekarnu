import Link from "next/link"
import Image from "next/image" // Import Image, i když ho teď nepoužijeme aktivně
import { Button } from "@/components/ui/button"
import { FaBreadSlice } from "react-icons/fa"

export function HeroSection() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center text-center bg-gray-950">
      
      {/* --- ZÁSTUPNÝ OBSAH (PLACEHOLDER) --- */}
      {/* Toto dělá to hezké tmavé pozadí s gradientem. Až budete mít fotku, tento div můžete smazat nebo nechat jako fallback. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-gray-950 to-gray-950 pointer-events-none" />

      {/* --- MÍSTO PRO BUDOUCÍ FOTKU --- */}
      {/* Až budete mít fotku, odkomentujte tento blok a smažte ten div nahoře.
      <div className="absolute inset-0 z-0">
        <Image
          src="/cesta/k/vasi/novej/fotce.jpg"
          alt="Pekařství interiér"
          fill
          className="object-cover filter brightness-[0.3]" // Ztmavení, aby byl text čitelný
          priority
        />
      </div>
      */}

      {/* Obsah */}
      <div className="relative z-10 container px-4 space-y-8 animate-in fade-in zoom-in duration-1000">
        <div className="flex justify-center mb-6">
            <FaBreadSlice className="h-16 w-16 text-amber-500/20" />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight uppercase drop-shadow-xl font-serif">
          Pečeme s láskou
        </h1>
        <p className="text-lg md:text-2xl text-amber-400 font-light tracking-widest uppercase">
          Chléb &bull; Rohlíky &bull; Tradice
        </p>
        
        <div className="pt-8">
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-lg px-10 py-7 rounded-full">
            <Link href="/produkty">
              Naše nabídka
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}