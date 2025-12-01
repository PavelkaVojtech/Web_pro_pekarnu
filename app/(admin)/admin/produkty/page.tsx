import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-serif">Produkty</h2>
            <p className="text-muted-foreground">Správa vašeho sortimentu pečiva.</p>
        </div>
        <Button asChild>
            <Link href="/admin/produkty/novy">
                <Plus className="mr-2 h-4 w-4" /> Přidat produkt
            </Link>
        </Button>
      </div>

      {/* Zde bude tabulka produktů */}
      <Card>
        <CardHeader>
            <CardTitle>Seznam produktů</CardTitle>
            <CardDescription>Přehled všech aktivních i neaktivních produktů.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground text-sm">
                Zatím zde nejsou žádné produkty. Klikněte na "Přidat produkt".
            </div>
        </CardContent>
      </Card>
    </div>
  )
}