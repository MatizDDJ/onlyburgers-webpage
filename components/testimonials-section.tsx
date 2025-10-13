import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Blogger de Comida",
    content:
      "¡Sin duda las mejores hamburguesas de la ciudad! La calidad de los ingredientes y la atención al detalle es incomparable. La Hamburguesa BBQ con Tocino es mi favorita absoluta.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Residente Local",
    content:
      "He venido aquí durante años y nunca decepcionan. Frescas, sabrosas y siempre cocinadas a la perfección. El personal es amable y el ambiente es genial.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Cliente Regular",
    content:
      "Como vegetariana, estoy encantada con su hamburguesa Delicia Vegetariana. No es solo una ocurrencia tardía, es genuinamente deliciosa y satisfactoria. ¡Muy recomendable!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            No solo confíes en nuestra palabra: escucha a nuestros clientes satisfechos que siguen regresando por más.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-pretty">"{testimonial.content}"</p>
                <div className="pt-4 border-t">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
