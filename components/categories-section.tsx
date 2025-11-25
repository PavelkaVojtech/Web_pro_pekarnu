import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Croissant, Cookie, Wheat } from "lucide-react"

export function CategoriesSection() {
  const categories = [
    { 
      title: 'Chléb', 
      link: '/produkty/chleby', 
      icon: <Wheat className="h-16 w-16 text-gray-700 group-hover:text-amber-500/50 transition-colors duration-500" />,
    },
    { 
      title: 'Běžné pečivo', 
      link: '/produkty/bezne-pecivo', 
      icon: <Croissant className="h-16 w-16 text-gray-700 group-hover:text-amber-500/50 transition-colors duration-500" />,
    },
    { 
      title: 'Jemné pečivo', 
      link: '/produkty/jemne-pecivo', 
      icon: <Cookie className="h-16 w-16 text-gray-700 group-hover:text-amber-500/50 transition-colors duration-500" />,
    },
  ]

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase font-serif tracking-wider text-white">
          Náš sortiment
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.link} className="group block">
              <Card className="overflow-hidden border-none shadow-lg bg-gray-900 hover:shadow-amber-900/10 transition-all duration-300">
                
                {/* Tady je ten trik: aspect-[4/3] drží místo pro budoucí fotku */}
                <CardContent className="p-0 relative aspect-[4/3] flex items-center justify-center bg-gray-900 border border-gray-800 group-hover:border-amber-500/30 transition-colors">
                  
                  {/* --- PLACEHOLDER (Až budou fotky, toto smažte) --- */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Ikona v pozadí */}
                    {cat.icon}
                  </div>
                  
                  {/* --- BUDOUCÍ FOTKA (Zatím zakomentováno) ---
                  <Image 
                    src="/cesta/k/fotce.jpg" 
                    alt={cat.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-100" 
                  />
                  ------------------------------------------------ */}

                  {/* Text přes "fotku" (overlay) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                    <h3 className="text-white text-2xl font-serif font-bold uppercase tracking-widest drop-shadow-md border-b-2 border-transparent group-hover:border-amber-400 pb-1 transition-all">
                      {cat.title}
                    </h3>
                  </div>

                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}