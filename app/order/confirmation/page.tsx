"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface OrderData {
  name: string
  email: string
  phone: string
  address: string
  notes: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
}

export default function ConfirmationPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000))
  const router = useRouter()

  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder")
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
      localStorage.removeItem("lastOrder")
    } else {
      router.push("/")
    }
  }, [router])

  if (!orderData) {
    return null
  }

  const estimatedTime = new Date(Date.now() + 35 * 60000).toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 py-12 md:py-16 bg-secondary/20">
        <div className="container px-4 max-w-3xl">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4 animate-float">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">¡Pedido Confirmado!</h1>
            <p className="text-lg text-muted-foreground">
              Gracias por tu pedido. ¡Estamos preparando tus deliciosas hamburguesas!
            </p>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pedido #{orderNumber}</CardTitle>
                <CardDescription>Tu pedido ha sido recibido y está siendo preparado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Estimated Time */}
                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                  <Clock className="h-5 w-5 text-accent-foreground mt-0.5" />
                  <div>
                    <p className="font-semibold text-accent-foreground">Entrega Estimada</p>
                    <p className="text-sm text-accent-foreground/80">
                      Tu pedido llegará aproximadamente a las {estimatedTime}
                    </p>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Información de Entrega</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{orderData.name}</p>
                        <p className="text-muted-foreground">{orderData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-muted-foreground">{orderData.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-muted-foreground">{orderData.email}</p>
                    </div>
                  </div>
                  {orderData.notes && (
                    <div className="pt-2">
                      <p className="text-sm font-medium">Instrucciones Especiales:</p>
                      <p className="text-sm text-muted-foreground">{orderData.notes}</p>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Artículos del Pedido</h3>
                  <div className="space-y-2">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm py-2 border-b last:border-0">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground"> × {item.quantity}</span>
                        </div>
                        <span className="font-medium">$U {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-3 border-t font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">$U {orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>¿Qué Sigue?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Confirmación del Pedido</p>
                    <p className="text-muted-foreground">Recibirás un correo de confirmación en breve</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Preparación</p>
                    <p className="text-muted-foreground">Nuestros chefs están preparando tu pedido con cuidado</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Entrega</p>
                    <p className="text-muted-foreground">Tu pedido será entregado caliente y fresco</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Volver al Inicio
                </Button>
              </Link>
              <Link href="/#menu" className="flex-1">
                <Button className="w-full" size="lg">
                  Ordenar de Nuevo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
