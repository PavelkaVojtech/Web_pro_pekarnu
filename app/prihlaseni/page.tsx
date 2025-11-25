import Image from "next/image"
import Link from "next/link"
import { FaBreadSlice } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Toto je vaše stránka
export default function AuthenticationPage() {
  return (
    // Kontejner pro celou stránku (rozdělení na dva sloupce na větších displejích)
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      
      {/* Levá část - Formulář */}
      <div className="flex items-center justify-center py-12 bg-gray-950">
        <div className="mx-auto grid w-[350px] gap-6">
          
          {/* Hlavička formuláře */}
          <div className="grid gap-2 text-center">
            <div className="flex justify-center mb-2">
               <FaBreadSlice className="text-3xl text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Přihlášení</h1>
            <p className="text-balance text-muted-foreground text-gray-400">
              Zadejte svůj email pro přihlášení do pekárny
            </p>
          </div>

          {/* Samotný formulář */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@priklad.cz"
                required
                className="bg-gray-900 border-gray-800 text-white focus-visible:ring-amber-400"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-200">Heslo</Label>
                <Link
                  href="/zapomenute-heslo"
                  className="ml-auto inline-block text-sm underline text-gray-400 hover:text-amber-400"
                >
                  Zapomněli jste?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-gray-900 border-gray-800 text-white focus-visible:ring-amber-400"
              />
            </div>
            
            <Button type="submit" className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500 font-bold">
              Přihlásit se
            </Button>
            
            <Button variant="outline" className="w-full bg-transparent border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white">
              Přihlásit přes Google
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            Ještě nemáte účet?{" "}
            <Link href="/registrace" className="underline hover:text-amber-400">
              Zaregistrujte se
            </Link>
          </div>
        </div>
      </div>

      {/* Pravá část - Obrázek (na mobilu skrytá 'hidden', na desktopu 'block') */}
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/images/HeroSection.webp" // Používám váš existující obrázek z projektu
          alt="Obrázek pekárny"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        {/* Překryvná vrstva s textem */}
        <div className="absolute inset-0 bg-gray-900/40 flex flex-col justify-end p-10 text-white">
            <blockquote className="space-y-2">
                <p className="text-lg font-serif italic">
                &ldquo;Není nic lepšího než vůně čerstvě upečeného chleba po ránu. To je to, co nás spojuje.&rdquo;
                </p>
                <footer className="text-sm font-bold text-amber-400">Pekařství Bánov</footer>
            </blockquote>
        </div>
      </div>

    </div>
  )
}