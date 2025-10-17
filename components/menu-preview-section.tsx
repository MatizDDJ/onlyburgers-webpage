"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { Plus, Check, ArrowRight, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { menuItems } from "./menu-section"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const MENU_CACHE_KEY = 'onlyburgers_menu_cache'

export function MenuPreviewSection() {
  const { addItem } = useCart()
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [menuData, setMenuData] = useState<any>(menuItems) // Usar datos locales por defecto
  const { elementRef: titleRef, isVisible: titleVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { elementRef: cardsRef, isVisible: cardsVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { elementRef: buttonRef, isVisible: buttonVisible } = useIntersectionObserver({ threshold: 0.2 })

  useEffect(() => {
    async function loadMenu() {
      // 1. Intentar cargar desde localStorage primero (instantáneo)
      try {
        const cachedMenu = localStorage.getItem(MENU_CACHE_KEY)
        if (cachedMenu) {
          setMenuData(JSON.parse(cachedMenu))
        }
      } catch (error) {
        console.error('Error loading cached menu:', error)
      }

      // 2. Fetch API en background (actualizar si hay cambios)
      try {
        const response = await fetch('/api/menu')
        const data = await response.json()
        
        // Guardar en localStorage para próxima vez
        localStorage.setItem(MENU_CACHE_KEY, JSON.stringify(data))
        
        // Actualizar estado
        setMenuData(data)
      } catch (error) {
        console.error('Error fetching menu:', error)
        // Mantener datos actuales si falla la API
      }
    }
    
    loadMenu()
  }, [])

  // Mostrar solo las hamburguesas populares
  const featuredBurgers = menuData?.hamburguesas?.filter((item: any) => item.popular).slice(0, 3) || []

  const handleAddToCart = (item: any) => {
    // Prevenir clicks múltiples mientras hay animación en curso
    if (isAnimating) return
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })

    setAddedItemId(item.id)
    setIsAnimating(true)
    
    setTimeout(() => {
      setAddedItemId(null)
      setIsAnimating(false)
    }, 1500) // Duración total de la animación
  }

  return (
    <section id="menu" className="py-12 md:py-20 bg-secondary/30 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div 
          ref={titleRef}
          className={`text-center space-y-4 mb-12 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance font-[family-name:var(--font-display)]">
            NUESTRAS HAMBURGUESAS DESTACADAS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Las favoritas de nuestros clientes. Descubre el sabor que nos hace únicos.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12"
        >
          {featuredBurgers.map((item: any, index: number) => (
            <Card 
              key={item.id} 
              className={`overflow-hidden group hover:shadow-xl transition-all duration-700 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                {item.popular && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg">
                    Popular
                  </Badge>
                )}
                {item.includesFries && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-lg">
                    Con Papas
                  </Badge>
                )}
                {addedItemId === item.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 cart-notification">
                    <div className="bg-green-600 rounded-full p-4 shadow-2xl checkmark-container">
                      <Check className="h-12 w-12 md:h-16 md:w-16 text-white checkmark" strokeWidth={3} />
                    </div>
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

        <div 
          ref={buttonRef}
          className={`text-center transition-all duration-1000 ${
            buttonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <Link href="/menu">
            <Button size="lg" className="text-base shadow-xl hover:shadow-2xl transition-shadow">
              Ver Menú Completo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
