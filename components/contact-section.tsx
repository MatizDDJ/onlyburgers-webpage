import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, MessageCircle } from "lucide-react"

export function ContactSection() {
  const whatsappNumber = "598098190425" // Replace with actual number
  const whatsappMessage = encodeURIComponent(
    "¡Hola ONLY BURGUERS! Me gustaría hacer una consulta sobre sus hamburguesas.",
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/50">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance font-[family-name:var(--font-display)]">
            CONTÁCTANOS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Hacé tu pedido directamente por WhatsApp. ¡Estamos listos para atenderte!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-12">
          <Card>
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

          <Card>
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

          <Card>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Horario</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lun-Dom
                <br />
                11:00 AM - 10:00 PM
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
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
