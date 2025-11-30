"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { User, Package, MapPin, Settings, LogOut, Building2, Save, Plus, Trash2, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/toast"

// Typ pro adresu
type Address = {
    id: string;
    street: string;
    city: string;
    zipCode: string;
}

export default function ProfilePage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  
  // Stavy pro formuláře
  const [loading, setLoading] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  
  // Data uživatele
  const [formData, setFormData] = useState({
      name: "",
      phone: "",
      companyName: "",
      ico: "",
      dic: ""
  })

  // Adresy
  const [addresses, setAddresses] = useState<Address[]>([])
  const [newAddress, setNewAddress] = useState({ street: "", city: "", zipCode: "" })
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const { toast } = useToast()

  // 1. Načtení aktuálních dat při startu
  useEffect(() => {
    if (session?.user) {
        // Zkusíme načíst rozšířená data (telefon, firma) z našeho API nebo session
        // Pro jednoduchost teď bereme jméno ze session, zbytek fetch
        setFormData(prev => ({ ...prev, name: session.user.name || "" }))
        // Poznámka: V ideálním světě bychom zde volali endpoint /api/profile/me pro získání čerstvých dat z DB
        // Pro MP zatím necháme uživatele vyplnit prázdná pole, nebo si je můžeš dotáhnout.
        fetchAddresses();
    }
  }, [session])

  const fetchAddresses = async () => {
      const res = await fetch("/api/adress");
      if (res.ok) {
          const data = await res.json();
          setAddresses(data);
      }
  }

  // --- ULOŽENÍ PROFILU ---
  const handleSaveProfile = async () => {
    setLoading(true)
    try {
        const res = await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                isCompany
            })
        });

        if (res.ok) {
            // Aktualizujeme také data v auth (Better Auth) aby se jméno okamžitě promítlo do session
            try {
              // Use Better Auth client's $fetch so the client-side session atom is notified
              await authClient.$fetch?.("/update-user", {
                method: "POST",
                body: JSON.stringify({ name: formData.name }),
                headers: { "Content-Type": "application/json" },
              });
              // Additionally trigger the client's session refetch/notify so UI updates immediately
              try {
                // toggle internal session signal (implementation may exist on the client)
                (authClient as any).notify?.("$sessionSignal");
              } catch (e) {
                console.debug('authClient.notify not available', e);
              }
              try {
                // fetch fresh session to update client's cache
                await authClient.$fetch?.("/get-session");
              } catch (e) {
                console.debug('authClient.$fetch(/get-session) failed', e);
              }
            } catch (e) {
              // Nekritická chyba — pokračujeme dál
              console.warn("Chyba při aktualizaci auth uživatele:", e);
            }

            // Optimisticky zobrazit nové jméno v UI a požádat Next o refresh server-rendered dat
            toast.success("Profil byl úspěšně aktualizován", "Změny byly uloženy")
            router.refresh(); // Obnoví server-side data
        } else {
            toast.error("Chyba při ukládání")
        }
    } catch (e) {
          toast.error("Nastala chyba.")
    } finally {
        setLoading(false)
    }
  }

  // --- PŘIDÁNÍ ADRESY ---
  const handleAddAddress = async () => {
      if (!newAddress.street || !newAddress.city) return toast.error("Vyplňte ulici a město.")

      // Validace PSČ (12345 nebo 123 45)
      const zipRegex = /^\d{3}\s?\d{2}$/
      if (!zipRegex.test(String(newAddress.zipCode))) {
        return toast.error("PSČ musí být 5 číslic (12345 nebo 123 45)")
      }

      // Normalizovat PSČ před odesláním (odstraníme mezery)
      const normalized = String(newAddress.zipCode).replace(/\s+/g, "")
      const payload = { ...newAddress, zipCode: normalized }

      if (editingAddress) {
        const res = await fetch(`/api/adress?id=${editingAddress.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        if (res.ok) {
          toast.success("Adresa upravena")
          setEditingAddress(null)
          setIsAddressDialogOpen(false)
          fetchAddresses()
        } else {
          toast.error("Chyba při ukládání adresy")
        }
        return
      }

      const res = await fetch("/api/adress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
          toast.success("Adresa přidána")
          fetchAddresses(); // Znovu načíst seznam
          setNewAddress({ street: "", city: "", zipCode: "" });
          setIsAddressDialogOpen(false);
      } else {
          toast.error("Chyba při přidání adresy")
      }
  }

  // --- SMAZÁNÍ ADRESY ---
  const handleDeleteAddress = async (id: string) => {
      setDeleteTargetId(id)
      setIsDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteTargetId) return
    const res = await fetch(`/api/adress?id=${deleteTargetId}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Adresa smazána")
      fetchAddresses()
    } else {
      toast.error("Chyba při mazání adresy")
    }
    setIsDeleteConfirmOpen(false)
    setDeleteTargetId(null)
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }

  if (!session) return <div className="min-h-screen flex items-center justify-center">Načítám...</div>

  return (
    <div className="min-h-screen bg-muted/30 py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* --- LEVÝ SIDEBAR --- */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-6">
            <Card>
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-2">
                        {(formData.name || session.user.name)?.charAt(0).toUpperCase()}
                    </div>
                    <CardTitle className="text-lg">{formData.name || session.user.name}</CardTitle>
                    <CardDescription className="truncate">{session.user.email}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Odhlásit se
                    </Button>
                </CardFooter>
            </Card>
          </div>

          {/* --- PRAVÁ ČÁST (OBSAH) --- */}
          <div className="flex-1">
            <Tabs defaultValue="info" className="w-full space-y-6">
              
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-card border border-border">
                <TabsTrigger value="info">Údaje</TabsTrigger>
                <TabsTrigger value="orders">Objednávky</TabsTrigger>
                <TabsTrigger value="settings">Nastavení</TabsTrigger>
              </TabsList>

              {/* 1. ZÁLOŽKA: ÚDAJE */}
              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Osobní údaje</CardTitle>
                    <CardDescription>Kontaktní informace pro vaše objednávky.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Celé jméno</Label>
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={session.user.email} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input 
                                id="phone" 
                                placeholder="+420 777 888 999" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sekce pro firmu */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-primary" /> Firemní údaje
                                </CardTitle>
                                <CardDescription>Vyplňte pouze pokud nakupujete na firmu.</CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="company-mode" 
                                    checked={isCompany} 
                                    onCheckedChange={(c) => setIsCompany(c as boolean)} 
                                />
                                <Label htmlFor="company-mode">Nakupuji na IČO</Label>
                            </div>
                        </div>
                    </CardHeader>
                    
                    {/* Zobrazit pouze pokud je zaškrtnuto */}
                    {isCompany && (
                        <CardContent className="space-y-4 animate-in slide-in-from-top-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Název firmy</Label>
                                    <Input 
                                        id="companyName" 
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ico">IČO</Label>
                                    <Input 
                                        id="ico" 
                                        value={formData.ico}
                                        onChange={(e) => setFormData({...formData, ico: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dic">DIČ</Label>
                                    <Input 
                                        id="dic" 
                                        value={formData.dic}
                                        onChange={(e) => setFormData({...formData, dic: e.target.value})}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    )}
                    
                    <CardFooter className="border-t pt-6 flex justify-end">
                        <Button onClick={handleSaveProfile} disabled={loading}>
                            <Save className="mr-2 h-4 w-4" /> 
                            {loading ? "Ukládám..." : "Uložit změny"}
                        </Button>
                    </CardFooter>
                </Card>
              </TabsContent>

              {/* 2. ZÁLOŽKA: OBJEDNÁVKY */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Historie objednávek</CardTitle>
                    <CardDescription>Zde uvidíte své minulé nákupy.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 text-muted-foreground">
                        <Package className="h-16 w-16 opacity-20" />
                        <p>Zatím zde nemáte žádné objednávky.</p>
                        <Button variant="outline" onClick={() => router.push("/produkty")}>
                            Jít nakupovat
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 3. ZÁLOŽKA: NASTAVENÍ (ADRESY) */}
              <TabsContent value="settings" className="space-y-6">
                
                {/* MOJE ADRESY */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> Moje adresy
                            </CardTitle>
                            <CardDescription>Uložená místa pro doručení.</CardDescription>
                        </div>
                        
                        {/* Tlačítko pro přidání adresy (Otevírá Dialog) */}
                        <Dialog open={isAddressDialogOpen} onOpenChange={(open) => {
                          if (!open) {
                            setEditingAddress(null)
                            setNewAddress({ street: "", city: "", zipCode: "" })
                          }
                          setIsAddressDialogOpen(open)
                        }}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => { setEditingAddress(null); setNewAddress({ street: "", city: "", zipCode: "" }) }}><Plus className="h-4 w-4 mr-2"/> Přidat adresu</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{editingAddress ? 'Upravit adresu' : 'Nová adresa'}</DialogTitle>
                              <DialogDescription>Zadejte adresu pro doručování pečiva.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="street">Ulice a číslo popisné</Label>
                                <Input id="street" value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="city">Město / Obec</Label>
                                  <Input id="city" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="zip">PSČ</Label>
                                  <Input id="zip" value={newAddress.zipCode} onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})} />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleAddAddress}>{editingAddress ? 'Uložit změny' : 'Uložit adresu'}</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                    </CardHeader>
                    <CardContent className="space-y-4">
                        {addresses.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">Nemáte uloženou žádnou adresu.</p>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className="flex items-start justify-between p-4 border rounded-lg bg-background">
                                        <div className="flex gap-3">
                                            <div className="mt-1"><Home className="h-4 w-4 text-muted-foreground" /></div>
                                            <div>
                                                <p className="font-medium">{addr.street}</p>
                                                <p className="text-sm text-muted-foreground">{addr.zipCode} {addr.city}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button variant="ghost" size="icon" onClick={() => {
                                            setEditingAddress(addr)
                                            setNewAddress({ street: addr.street, city: addr.city, zipCode: addr.zipCode })
                                            setIsAddressDialogOpen(true)
                                          }}>
                                            <Save className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteAddress(addr.id)}>
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Potvrdit smazání</DialogTitle>
                      <DialogDescription>Opravdu chcete smazat tuto adresu? Tuto akci nelze vrátit.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="ghost" onClick={() => setIsDeleteConfirmOpen(false)}>Zrušit</Button>
                      <Button className="ml-2" variant="destructive" onClick={confirmDelete}>Smazat</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* ZMĚNA HESLA */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-primary" /> Zabezpečení
                        </CardTitle>
                        <CardDescription>Změna hesla k vašemu účtu.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="new-pass">Nové heslo</Label>
                            <Input id="new-pass" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-end">
                        <Button variant="secondary">Aktualizovat heslo</Button>
                    </CardFooter>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}