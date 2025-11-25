import Link from "next/link"
import { FaFacebookF, FaInstagram, FaBreadSlice, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8 text-gray-400 font-sans">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        
        {/* Horní část - 4 sloupce */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Sloupec: Značka */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group w-fit">
                <FaBreadSlice className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                <span className="text-xl font-bold tracking-wider font-serif text-gray-100">
                  PEKAŘSTVÍ BÁNOV
                </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs">
              Poctivé řemeslo, které voní. Každý den pro vás pečeme z těch nejlepších lokálních surovin.
            </p>
            <div className="flex gap-3 pt-2">
              <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-md bg-gray-900 border border-gray-800 hover:border-primary hover:text-primary transition-all">
                <FaFacebookF />
              </Link>
              <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-md bg-gray-900 border border-gray-800 hover:border-primary hover:text-primary transition-all">
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* 2. Sloupec: Rychlé menu */}
          <div>
            <h3 className="text-white font-serif tracking-wider uppercase mb-6 font-semibold">Menu</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/produkty" className="hover:text-primary transition-colors">Naše produkty</Link></li>
              <li><Link href="/onas" className="hover:text-primary transition-colors">O nás</Link></li>
              <li><Link href="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
              <li><Link href="/prihlaseni" className="hover:text-primary transition-colors">Zaměstnanecká sekce</Link></li>
            </ul>
          </div>

          {/* 3. Sloupec: Kontakt */}
          <div>
            <h3 className="text-white font-serif tracking-wider uppercase mb-6 font-semibold">Kontaktujte nás</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <span>Bánov 52, 687 54<br/>Česká republika</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary" />
                <a href="tel:+420735290268" className="hover:text-white transition-colors">+420 735 290 268</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@pekarnabanov.cz" className="hover:text-white transition-colors">info@pekarnabanov.cz</a>
              </li>
            </ul>
          </div>

          {/* 4. Sloupec: Otevírací doba (Kompaktní) */}
          <div>
            <h3 className="text-white font-serif tracking-wider uppercase mb-6 font-semibold">Otevíráme</h3>
            
            {/* Zde je ta oprava - max-width zajistí, že to nebude roztažené */}
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-900 max-w-[260px]">
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Po – Pá</span>
                        <span className="text-white font-medium">7:00 – 15:30</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Sobota</span>
                        <span className="text-white font-medium">7:00 – 10:00</span>
                    </li>
                    <li className="flex justify-between items-center pt-1">
                        <span className="text-gray-500">Neděle</span>
                        <span className="text-primary/80 text-xs uppercase font-bold tracking-wider">Zavřeno</span>
                    </li>
                </ul>
            </div>
          </div>

        </div>

        <Separator className="bg-gray-900 mb-8" />

        {/* Spodní lišta */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Pekařství Bánov. Všechna práva vyhrazena.</p>
          <div className="flex gap-6">
            <Link href="/podminky" className="hover:text-gray-400 transition-colors">Obchodní podmínky</Link>
            <Link href="/gdpr" className="hover:text-gray-400 transition-colors">Ochrana osobních údajů</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}