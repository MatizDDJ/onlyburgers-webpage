"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useCart } from "@/lib/cart-context"
import { Plus, Check, X, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

export const menuItems = {
  hamburguesas: [
    {
      id: "burguer-classic",
      name: "Burguer Classic",
      description: "Una carne smash, dos fetas de queso cheddar, panceta ahumada",
      price: 180,
      image: "/classic-cheeseburger-with-melted-cheese.jpg",
      popular: true,
    },
    {
      id: "special-burguer",
      name: "Special Burguer",
      description: "Doble carne smash, tres fetas de queso cheddar, panceta ahumada",
      price: 250,
      image: "/bbq-bacon-burger.jpg",
      popular: true,
      includesFries: true,
    },
    {
      id: "burguer-only",
      name: "Burguer Only",
      description: "Triple carnes smash, cuatro fetas de cheddar, panceta ahumada",
      price: 290,
      image: "/mushroom-swiss-burger-gourmet.jpg",
      popular: false,
      includesFries: true,
    },
    {
      id: "burguer-bunker",
      name: "Burguer Bunker",
      description: "Doble carne smash, cuatro fetas de queso cheddar, panceta ahumada, cebolla caramelizada",
      price: 290,
      image: "/spicy-jalapeno-burger-with-peppers.jpg",
      popular: false,
      includesFries: true,
    },
    {
      id: "burguer-simple",
      name: "Burguer Simple",
      description: "Doble carne smash, dos fetas de muzzarella, lechuga, tomate",
      price: 280,
      image: "/gourmet-veggie-burger-with-avocado.jpg",
      popular: false,
      includesFries: true,
    },
    {
      id: "burguer-new",
      name: "Burguer New",
      description: "Doble carne smash, jamon, muzarrella, papitas pay, cheddar",
      price: 290,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: true,
      includesFries: true,
    },
      {
      id: "burguer-especialidad",
      name: "Burguer Especialidad de la Casa",
      description: "Triple carne smash, tres fetas de queso cheddar, muzzarella, panceta ahumada, lechuga, tomate",
      price: 320,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: true,
      includesFries: true,
    },
             {
      id: "burguer-quintuple",
      name: "Burguer Super Quintuple",
      description: "Cinco carnes smash, cinco fetas de queso cheddar, extra panceta, lechuga, tomate, cebolla blanca",
      price: 550,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: false,
      includesFries: true,
    },
         {
      id: "burguer-veggie1",
      name: "Burguer Veggie boniato y zanahoria",
      description: "Una burguer de boniato y zanahoria, queso cheddar, lechuga, tomate",
      price: 320,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: false,
      includesFries: false,
    },
           {
      id: "burguer-veggie2",
      name: "Burguer Veggie espinaca y puerro",
      description: "Una burguer de espinaca y puerro, muzzarella, lechuga, tomate",
      price: 320,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: false,
      includesFries: false,
    },
  ],
  bebidas: [
    {
      id: "coca-cola-600",
      name: "Coca-Cola 600ml",
      description: "Bebida refrescante",
      price: 80,
      image: "/coca-cola-bottle-600ml.jpg",
    },
    {
      id: "coca-cola-zero-600",
      name: "Coca-Cola Zero 600ml",
      description: "Sin azúcar",
      price: 80,
      image: "/coca-cola-zero-bottle-600ml.jpg",
    },
    {
      id: "sprite-600",
      name: "Sprite 600ml",
      description: "Bebida de lima-limón",
      price: 80,
      image: "/sprite-bottle-600ml.jpg",
    },
    {
      id: "fanta-600",
      name: "Fanta 600ml",
      description: "Sabor naranja",
      price: 80,
      image: "/fanta-orange-bottle-600ml.jpg",
    },
    {
      id: "coca-cola-1500",
      name: "Coca-Cola 1.5L",
      description: "Tamaño familiar",
      price: 150,
      image: "/coca-cola-bottle-1-5-liter.jpg",
    },
    {
      id: "coca-cola-zero-1500",
      name: "Coca-Cola Zero 1.5L",
      description: "Sin azúcar, tamaño familiar",
      price: 150,
      image: "/coca-cola-zero-bottle-1-5-liter.jpg",
    },
    {
      id: "sprite-1500",
      name: "Sprite 1.5L",
      description: "Tamaño familiar",
      price: 150,
      image: "/sprite-bottle-1-5-liter.jpg",
    },
    {
      id: "fanta-1500",
      name: "Fanta 1.5L",
      description: "Tamaño familiar",
      price: 180,
      image: "/fanta-orange-bottle-1-5-liter.jpg",
    },
  ],
  milanesas: [
    {
      id: "milanesa-bunker",
      name: "Milanesa Bunker",
      description: "una supermila de carne o pollo, cuatro fetas de queso cheddar, cebolla caramelizada, extra panceta ahumada",
      price: 380,
      image: "/breaded-beef-milanesa-with-fries.jpg",
    },
    {
      id: "milanesa-simple",
      name: "Milanesa Simple",
      description: "Una supermila de carne o pollo, extra muzzarella, lechuga, tomate",
      price: 380,
      image: "/milanesa-napolitana-with-cheese-and-ham.jpg",
    },
    {
      id: "milanesa-new",
      name: "Milanesa New",
      description: "Una super mila de carne o pollo, cuatro fetas de queso cheddar, jamon, muzzarella, lluvia de papitas pay",
      price: 380,
      image: "/breaded-chicken-milanesa-with-fries.jpg",
    },
       {
      id: "milanesa-especialidad",
      name: "Milanesa Especialidad de la Casa",
      description: "Una supermila de carne o pollo, seis fetas de queso cheddar, extra muzzarella, panceta ahumada sofritada, lechuga, tomate",
      price: 420,
      image: "/breaded-chicken-milanesa-with-fries.jpg",
    },
  ],
  papas: [
    {
      id: "papas-clasicas",
      name: "Papas Fritas Clásicas",
      description: "Porción grande de papas fritas crujientes",
      price: 180,
      image: "/crispy-french-fries-portion.jpg",
    },
    {
      id: "papas-cheddar",
      name: "Papas con Cheddar y Bacon",
      description: "Papas fritas con queso cheddar derretido y bacon",
      price: 250,
      image: "/loaded-fries-with-cheddar-and-bacon.jpg",
    },
    {
      id: "papas-rusticas",
      name: "Papas Rústicas",
      description: "Papas con piel, especias y hierbas",
      price: 200,
      image: "/rustic-potato-wedges-with-herbs.jpg",
    },
  ],
  promos: [
    {
      id: "promo-familiar",
      name: "Papas Fritas Clásicas",
      description: "Porción grande de papas fritas crujientes",
      price: 180,
      image: "/crispy-french-fries-portion.jpg",
    },
    {
      id: "papas-cheddar",
      name: "Papas con Cheddar y Bacon",
      description: "Papas fritas con queso cheddar derretido y bacon",
      price: 250,
      image: "/loaded-fries-with-cheddar-and-bacon.jpg",
    },
    {
      id: "papas-rusticas",
      name: "Papas Rústicas",
      description: "Papas con piel, especias y hierbas",
      price: 200,
      image: "/rustic-potato-wedges-with-herbs.jpg",
    },
  ],
}

export function MenuSection() {
  const { addItem } = useCart()
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [menuData, setMenuData] = useState<typeof menuItems>(menuItems)

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch('/api/menu')
        const data = await response.json()
        setMenuData(data)
      } catch (error) {
        console.error('Error fetching menu:', error)
        // Mantener datos locales si falla la API
      }
    }
    fetchMenu()
  }, [])

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })

    setAddedItemId(item.id)
    setTimeout(() => {
      setAddedItemId(null)
    }, 2000)
    
    // Cerrar el modal si está abierto
    setSelectedItem(null)
  }

  const renderMenuItems = (items: any[], showFreeFries = false) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 flex flex-col h-full"
        >
          <div 
            className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer group"
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver detalles
              </span>
            </div>
            {item.popular && (
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg z-10">
                Popular
              </Badge>
            )}
            {item.includesFries && (
              <Badge className="absolute top-4 left-4 bg-green-600 text-white shadow-lg z-10">
                🍟 Incluye Papas Gratis
              </Badge>
            )}
            {addedItemId === item.id && (
              <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg z-10 cart-notification flex items-center gap-2">
                <Check className="h-4 w-4 checkmark" />
                <span className="text-sm font-semibold">Agregado</span>
              </div>
            )}
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{item.name}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
          </CardHeader>

          <CardFooter className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary">$U {item.price}</span>
            <Button onClick={() => handleAddToCart(item)} className="shadow-md">
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <section id="menu" className="py-12 md:py-20 bg-secondary/30 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance font-[family-name:var(--font-display)]">
            NUESTRO MENÚ
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Descubre nuestra selección de hamburguesas, milanesas, bebidas refrescantes y acompañamientos deliciosos
          </p>
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 max-w-3xl mx-auto mt-6">
            <p className="text-base font-semibold text-primary">
              🍟 ¡PROMO ESPECIAL! Todas las hamburguesas de mas de dos carnes y milanesas incluyen porción de papas fritas GRATIS
            </p>
          </div>
        </div>

        <Tabs defaultValue="hamburguesas" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="hamburguesas" className="text-sm md:text-base py-3">
              Hamburguesas
            </TabsTrigger>
            <TabsTrigger value="bebidas" className="text-sm md:text-base py-3">
              Bebidas
            </TabsTrigger>
            <TabsTrigger value="milanesas" className="text-sm md:text-base py-3">
              Milanesas
            </TabsTrigger>
            <TabsTrigger value="papas" className="text-sm md:text-base py-3">
              Papas Fritas
            </TabsTrigger>
          </TabsList>

          <TabsContent 
            value="hamburguesas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS HAMBURGUESAS
            </h3>
            {renderMenuItems(menuData.hamburguesas)}
          </TabsContent>

          <TabsContent 
            value="bebidas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS BEBIDAS
            </h3>
            {renderMenuItems(menuData.bebidas)}
          </TabsContent>

          <TabsContent 
            value="milanesas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS MILANESAS
            </h3>
            {renderMenuItems(menuData.milanesas)}
          </TabsContent>

          <TabsContent 
            value="papas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS PAPAS FRITAS
            </h3>
            {renderMenuItems(menuData.papas)}
          </TabsContent>
        </Tabs>

        {/* Modal de detalles del producto */}
        <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-md md:max-w-2xl max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl md:text-3xl font-bold font-[family-name:var(--font-display)]">
                    {selectedItem.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm md:text-lg">
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="object-cover w-full h-full"
                  />
                  {selectedItem.popular && (
                    <Badge className="absolute top-2 right-2 md:top-4 md:right-4 bg-primary text-primary-foreground shadow-lg text-xs md:text-sm">
                      Popular
                    </Badge>
                  )}
                  {selectedItem.includesFries && (
                    <Badge className="absolute top-2 left-2 md:top-4 md:left-4 bg-green-600 text-white shadow-lg text-xs md:text-sm">
                      🍟 Incluye Papas Gratis
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-center py-2 md:py-4">
                  <span className="text-3xl md:text-4xl font-bold text-primary">$U {selectedItem.price}</span>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 text-sm md:text-base py-4 md:py-6"
                  >
                    <X className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(selectedItem)}
                    className="flex-1 text-sm md:text-base py-4 md:py-6 shadow-md"
                  >
                    <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Agregar al Carrito
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
