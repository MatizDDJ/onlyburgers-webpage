"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"
import { Plus, Check } from "lucide-react"
import { useState } from "react"

export const menuItems = {
  hamburguesas: [
    {
      id: "classic-cheeseburger",
      name: "Hamburguesa Clásica con Queso",
      description: "Carne Angus, queso cheddar añejo, lechuga, tomate, salsa especial",
      price: 450,
      image: "/classic-cheeseburger-with-melted-cheese.jpg",
      popular: true,
    },
    {
      id: "bbq-bacon-burger",
      name: "Hamburguesa BBQ con Tocino Doble",
      description: "Doble carne, tocino crujiente, salsa BBQ, aros de cebolla, queso pepper jack",
      price: 590,
      image: "/bbq-bacon-burger.jpg",
      popular: true,
      includesFries: true,
    },
    {
      id: "mushroom-swiss",
      name: "Hamburguesa Suiza con Champiñones",
      description: "Champiñones salteados, queso suizo, cebollas caramelizadas, aioli de trufa",
      price: 520,
      image: "/mushroom-swiss-burger-gourmet.jpg",
      popular: false,
    },
    {
      id: "spicy-jalapeno",
      name: "Hamburguesa Picante Jalapeño",
      description: "Queso pepper jack, jalapeños, mayonesa chipotle, cebollas crujientes",
      price: 480,
      image: "/spicy-jalapeno-burger-with-peppers.jpg",
      popular: false,
    },
    {
      id: "veggie-delight",
      name: "Delicia Vegetariana",
      description: "Hamburguesa vegetal casera, aguacate, brotes, hummus, pan integral",
      price: 420,
      image: "/gourmet-veggie-burger-with-avocado.jpg",
      popular: false,
    },
    {
      id: "the-ultimate",
      name: "La Suprema Triple",
      description: "Triple carne, tocino, tres quesos, huevo frito, todos los complementos",
      price: 720,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: true,
      includesFries: true,
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
      price: 150,
      image: "/fanta-orange-bottle-1-5-liter.jpg",
    },
  ],
  milanesas: [
    {
      id: "milanesa-clasica",
      name: "Milanesa Clásica",
      description: "Milanesa de carne empanizada, servida con papas fritas",
      price: 380,
      image: "/breaded-beef-milanesa-with-fries.jpg",
    },
    {
      id: "milanesa-napolitana",
      name: "Milanesa Napolitana",
      description: "Milanesa con jamón, queso y salsa de tomate",
      price: 450,
      image: "/milanesa-napolitana-with-cheese-and-ham.jpg",
    },
    {
      id: "milanesa-pollo",
      name: "Milanesa de Pollo",
      description: "Pechuga de pollo empanizada, servida con papas fritas",
      price: 360,
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
}

export function MenuSection() {
  const { addItem } = useCart()
  const [addedItemId, setAddedItemId] = useState<string | null>(null)

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
  }

  const renderMenuItems = (items: any[], showFreeFries = false) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 flex flex-col h-full"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
            />
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
    <section id="menu" className="py-12 md:py-20 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance font-[family-name:var(--font-display)]">
            NUESTRO MENÚ
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Descubre nuestra selección de hamburguesas gourmet, bebidas refrescantes y acompañamientos deliciosos
          </p>
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 max-w-3xl mx-auto mt-6">
            <p className="text-base font-semibold text-primary">
              🍟 ¡PROMO ESPECIAL! Todas las hamburguesas dobles y triples incluyen porción de papas fritas GRATIS
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

          <TabsContent value="hamburguesas" className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS HAMBURGUESAS
            </h3>
            {renderMenuItems(menuItems.hamburguesas)}
          </TabsContent>

          <TabsContent value="bebidas" className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS BEBIDAS
            </h3>
            {renderMenuItems(menuItems.bebidas)}
          </TabsContent>

          <TabsContent value="milanesas" className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS MILANESAS
            </h3>
            {renderMenuItems(menuItems.milanesas)}
          </TabsContent>

          <TabsContent value="papas" className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS PAPAS FRITAS
            </h3>
            {renderMenuItems(menuItems.papas)}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
