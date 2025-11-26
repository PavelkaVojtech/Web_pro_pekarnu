import Image from "next/image"
import Link from "next/link"
import { FaBreadSlice } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthenticationPage() {
  return (
    // POUŽITO bg-background místo bg-gray-950
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen bg-background transition-colors duration-300">
      
      {/* Levá část - Formulář */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          
          {/* Hlavička formuláře */}
          <div className="grid gap-2 text-center">
            <div className="flex justify-center mb-2">
               <FaBreadSlice className="text-3xl text-primary" />
            </div>
            {/* Použito text-foreground místo text-white */}
            <h1 className="text-3xl font-bold text-foreground">Přihlášení</h1>
            <p className="text-balance text-muted-foreground">
              Zadejte svůj email pro přihlášení do pekárny
            </p>
          </div>

          {/* Samotný formulář */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@priklad.cz"
                required
                // Input se přizpůsobí tématu (světlý v light mode, tmavý v dark mode)
                className="bg-background border-input text-foreground focus-visible:ring-primary"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-foreground">Heslo</Label>
                <Link
                  href="/zapomenute-heslo"
                  className="ml-auto inline-block text-sm underline text-muted-foreground hover:text-primary"
                >
                  Zapomněli jste?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-background border-input text-foreground focus-visible:ring-primary"
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
              Přihlásit se
            </Button>
            
            <Button variant="outline" className="w-full border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground">
              Přihlásit přes Google
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Ještě nemáte účet?{" "}
            <Link href="/registrace" className="underline hover:text-primary">
              Zaregistrujte se
            </Link>
          </div>
        </div>
      </div>

      {/* Pravá část - Obrázek */}
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/images/HeroSection.webp" 
          alt="Obrázek pekárny"
          width="1920"
          height="1080"
          className="h-full w-full object-cover brightness-[0.4] dark:brightness-[0.3] dark:grayscale"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white z-10">
            <blockquote className="space-y-2">
                <p className="text-lg font-serif italic drop-shadow-lg">
                &ldquo;Není nic lepšího než vůně čerstvě upečeného chleba po ránu. To je to, co nás spojuje.&rdquo;
                </p>
                <footer className="text-sm font-bold text-primary">Pekařství Bánov</footer>
            </blockquote>
        </div>
      </div>

    </div>
  )
}