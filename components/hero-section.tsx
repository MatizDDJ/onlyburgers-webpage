"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [visibleWords, setVisibleWords] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const words = ["LA", "PERFECCIÓN", "EN", "CADA", "HAMBURGUESA"]

  // Verificar si el restaurante está abierto (20:00 a 01:00)
  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date()
      const hour = now.getHours()
      // Abierto de 20:00 (8 PM) a 01:00 (1 AM)
      // Si es entre 20:00 y 23:59 O entre 00:00 y 01:00
      const open = hour >= 20 || hour < 1
      setIsOpen(open)
    }

    checkIfOpen()
    // Verificar cada minuto si cambió el estado
    const interval = setInterval(checkIfOpen, 60000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev < words.length) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 200) // Cada palabra aparece cada 200ms

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-accent to-accent/90 text-accent-foreground w-full min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
      
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4 py-32 md:py-40 lg:py-48 relative max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="space-y-10">
            {isOpen ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-2xl animate-bounce-slow relative">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full" />
                </div>
                Entregas Disponibles
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-muted px-5 py-2 text-sm font-semibold text-muted-foreground shadow-2xl relative">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </div>
                Estamos Cerrados
              </div>
            )}
            
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-display)] leading-tight">
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mr-4 transition-all duration-700 ${
                    index < visibleWords
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            
            <p className="text-xl text-accent-foreground/90 max-w-xl leading-relaxed animate-fadeIn animation-delay-1800 opacity-0">
              Carne premium seleccionada, ingredientes frescos de primera calidad y técnicas de cocción perfectas. Cada
              hamburguesa es una obra maestra culinaria diseñada para los verdaderos amantes del sabor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-2500 opacity-0">
              <Link href="/menu">
                <Button size="lg" className="text-lg px-8 py-6 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  Ver Menú
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative burger-overflow animate-fadeIn animation-delay-500">
            <div className="aspect-square rounded-3xl overflow-visible bg-transparent relative">
              <img
                src="/delicious-gourmet-burger-with-melted-cheese-and-fr.jpg"
                alt="Hamburguesa Signature"
                className="object-cover w-full h-full rounded-3xl hover:scale-105 transition-transform duration-500 shadow-2xl"
              />
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 to-transparent animate-pulse-slow" />
            </div>
            
            {/* Enhanced rating card with animations */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-3xl p-8 shadow-2xl z-10 animate-float border-4 border-white/20 backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-8 w-8 fill-yellow-300 text-yellow-300 animate-spin-slow" />
                <div className="text-5xl font-bold">4.7</div>
              </div>
              <div className="text-base font-semibold opacity-95">+300 Reseñas</div>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce-slow">🚀</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
