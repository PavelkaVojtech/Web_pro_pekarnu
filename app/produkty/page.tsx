import React from 'react'
import { CategoriesSection } from '@/components/categories-section'

const ProduktyPage = () => {
  return (
    // Layout (Navbar/Footer) už je v app/layout.tsx, zde ho nepoužíváme.
    // Nastavíme jen pozadí, aby stránka ladila se zbytkem webu.
    <div className="min-h-screen bg-gray-950 pt-10">
      {/* Volitelně: Můžeme přidat nadpis specifický pro stránku, pokud by CategoriesSection nestačila */}
      <div className="container mx-auto px-4 text-center mb-4">
        <h1 className="text-4xl font-bold text-white font-serif tracking-wider uppercase">
          Kompletní nabídka
        </h1>
        <p className="text-gray-400 mt-2">Vyberte si z našich čerstvých kategorií</p>
      </div>

      {/* Vložíme naši novou shadcn komponentu s kategoriemi */}
      <CategoriesSection />
    </div>
  )
}

export default ProduktyPage