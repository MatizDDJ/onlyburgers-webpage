"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, MessageCircle } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useEffect, useState } from "react"

export function ContactSection() {
  const whatsappNumber = "598098190425" // Replace with actual number
  const whatsappMessage = encodeURIComponent(
    "¡Hola ONLY BURGUERS! Me gustaría hacer una consulta sobre sus hamburguesas.",
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  
  const { elementRef: titleRef, isVisible: titleVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { elementRef: cardsRef, isVisible: cardsVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { elementRef: buttonRef, isVisible: buttonVisible } = useIntersectionObserver({ threshold: 0.2 })

  const [isOpen, setIsOpen] = useState(false)

  // Verificar si el restaurante está abierto (20:00 a 01:00)
  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date()
      const hour = now.getHours()
      const open = hour >= 20 || hour < 1
      setIsOpen(open)
    }

    checkIfOpen()
    const interval = setInterval(checkIfOpen, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/50 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div 
          ref={titleRef}
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance font-[family-name:var(--font-display)]">
            CONTÁCTANOS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Hacé tu pedido directamente por WhatsApp. ¡Estamos listos para atenderte!
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-12"
        >
          <Card className={`transition-all duration-700 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '0ms' }}>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Ubicación</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Colonia, Uruguay
                <br />
                Zona Centro
              </p>
            </CardContent>
          </Card>

          <Card className={`transition-all duration-700 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '150ms' }}>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">WhatsApp</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                +598 98 190 425
                <br />
                Pedidos y consultas
              </p>
            </CardContent>
          </Card>

          <Card className={`transition-all duration-700 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '300ms' }}>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Horario</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lun-Dom
                <br />
                20:00 PM - 01:00 AM
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-xs font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div 
          ref={buttonRef}
          className={`text-center transition-all duration-1000 ${
            buttonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="text-base">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hacer Pedido por WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
