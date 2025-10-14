import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-accent to-accent/90 text-accent-foreground">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
      <div className="container px-4 py-24 md:py-32 lg:py-40 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-lg animate-pulse">
              Entregas Disponibles
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance font-[family-name:var(--font-display)]">
              LA PERFECCIÓN EN CADA HAMBURGUESA
            </h1>
            <p className="text-lg text-accent-foreground/90 max-w-xl text-pretty leading-relaxed">
              Carne premium seleccionada, ingredientes frescos de primera calidad y técnicas de cocción perfectas. Cada
              hamburguesa es una obra maestra culinaria diseñada para los verdaderos amantes del sabor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#menu">
                <Button size="lg" className="text-base shadow-xl hover:shadow-2xl transition-shadow w-full sm:w-auto">
                  Ver Menú
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative burger-overflow">
            <div className="aspect-square rounded-2xl overflow-visible bg-transparent">
              <img
                src="/delicious-gourmet-burger-with-melted-cheese-and-fr.jpg"
                alt="Hamburguesa Signature"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl z-10">
              <div className="text-3xl font-bold">4.7★</div>
              <div className="text-sm opacity-90">+300 Reseñas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
