"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, MessageCircle } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useEffect, useState } from "react"
import { isOpen as checkIsOpen, type BusinessHoursObject } from "@/lib/business-hours"

export function ContactSection() {
  const whatsappNumber = "598092469883" // Replace with actual number
  const whatsappMessage = encodeURIComponent(
    "¡Hola ONLY BURGUERS! Me gustaría hacer una consulta sobre sus hamburguesas.",
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  
  const { elementRef: titleRef, isVisible: titleVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { elementRef: cardsRef, isVisible: cardsVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { elementRef: buttonRef, isVisible: buttonVisible } = useIntersectionObserver({ threshold: 0.2 })

  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [scheduleText, setScheduleText] = useState<string>("Cargando...")

  // Verificar si el restaurante está abierto y obtener texto del horario
  useEffect(() => {
    const updateStatus = () => {
      setIsOpen(checkIsOpen())
      
      // Obtener horarios desde localStorage
      const storedHours = localStorage.getItem('business_hours')
      if (storedHours) {
        try {
          const hours: BusinessHoursObject = JSON.parse(storedHours)
          
          // Verificar si todos los días tienen el mismo horario
          const allSame = Object.values(hours).every((day, i, arr) => 
            i === 0 || (
              day.open === arr[0].open && 
              day.close === arr[0].close && 
              day.closed === arr[0].closed
            )
          )
          
          if (allSame && !Object.values(hours)[0].closed) {
            // Todos los días igual
            const firstDay = Object.values(hours)[0]
            setScheduleText(`Lun-Dom\n${firstDay.open} - ${firstDay.close}`)
          } else {
            // Horarios diferentes - mostrar rango general
            const openDays = Object.entries(hours).filter(([_, day]) => !day.closed)
            if (openDays.length > 0) {
              const dayNames: { [key: string]: string } = {
                monday: "Lun", tuesday: "Mar", wednesday: "Mié",
                thursday: "Jue", friday: "Vie", saturday: "Sáb", sunday: "Dom"
              }
              const firstOpen = openDays[0][1]
              setScheduleText(`Ver horarios\n${firstOpen.open} - ${firstOpen.close}`)
            } else {
              setScheduleText("Cerrado\ntodos los días")
            }
          }
        } catch (error) {
          console.error('Error parsing hours:', error)
          setScheduleText("Lun-Dom\n11:00 - 23:00")
        }
      } else {
        // Horarios por defecto
        setScheduleText("Lun-Dom\n11:00 - 23:00")
      }
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000)

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
                +598 92 469 883
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
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {scheduleText}
              </p>
              {isOpen !== null && (
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`text-xs font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
                  </span>
                </div>
              )}
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
