"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MessageCircle, CreditCard, Banknote } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function OrderPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "transferencia">("efectivo")

  const deliveryFee = 150
  const tax = total * 0.22
  const grandTotal = total + deliveryFee + tax

  const generateWhatsAppMessage = () => {
    let message = "🍔 *PEDIDO ONLY BURGERS*\n\n"

    message += `👤 *DATOS DEL CLIENTE*\n`
    message += `Nombre: ${customerInfo.name}\n`
    message += `Teléfono: ${customerInfo.phone}\n`
    message += `Dirección: ${customerInfo.address}\n\n`

    message += `🛒 *PRODUCTOS*\n`
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio: $U ${(item.price * item.quantity).toFixed(2)}\n\n`
    })

    message += `📦 *RESUMEN*\n`
    message += `Subtotal: $U ${total.toFixed(2)}\n`
    message += `Envío: $U ${deliveryFee}\n`
    message += `IVA (22%): $U ${Math.round(tax)}\n`
    message += `*TOTAL: $U ${Math.round(grandTotal)}*\n\n`

    message += `💳 *MÉTODO DE PAGO*\n`
    if (paymentMethod === "transferencia") {
      message += `Transferencia Bancaria\n\n`
      message += `⚠️ *IMPORTANTE:* Adjuntar comprobante de transferencia a este chat.\n`
    } else {
      message += `Efectivo al recibir\n`
    }

    return encodeURIComponent(message)
  }

  const whatsappNumber = "59899123456"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`

  const isFormValid = customerInfo.name && customerInfo.phone && customerInfo.address

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>Tu carrito está vacío</CardTitle>
              <CardDescription>¡Agrega algunas hamburguesas deliciosas para comenzar!</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/#menu" className="w-full">
                <Button className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ver Menú
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 py-8 md:py-12 bg-secondary/20">
        <div className="container px-4">
          <div className="mb-6">
            <Link
              href="/#menu"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar Comprando
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 md:mb-8 font-[family-name:var(--font-display)]">
            TU PEDIDO
          </h1>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Carrito</CardTitle>
                  <CardDescription>{items.length} artículo(s) en tu carrito</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 md:gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">{item.name}</h3>
                        <p className="text-primary font-bold mt-1">$U {item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2 md:mt-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right font-semibold text-sm md:text-base">
                        $U {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de Entrega</CardTitle>
                  <CardDescription>Completa tus datos para recibir el pedido</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      placeholder="099 123 456"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección de Entrega *</Label>
                    <Input
                      id="address"
                      placeholder="Calle, número, esquina, apartamento"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Método de Pago</CardTitle>
                  <CardDescription>Selecciona cómo deseas pagar tu pedido</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="efectivo" id="efectivo" />
                      <Label htmlFor="efectivo" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Efectivo</div>
                          <div className="text-sm text-muted-foreground">Paga al recibir tu pedido</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="transferencia" id="transferencia" />
                      <Label htmlFor="transferencia" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Transferencia Bancaria</div>
                          <div className="text-sm text-muted-foreground">Transferir antes de la entrega</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "transferencia" && (
                    <div className="mt-4 p-4 bg-primary/10 border-2 border-primary rounded-lg space-y-3">
                      <h4 className="font-semibold text-primary">Datos para Transferencia:</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold">Banco:</span> Banco República (BROU)
                        </div>
                        <div>
                          <span className="font-semibold">Cuenta:</span> 001234567-00001
                        </div>
                        <div>
                          <span className="font-semibold">Titular:</span> ONLY BURGERS S.A.
                        </div>
                        <div>
                          <span className="font-semibold">Monto a transferir:</span> $U {Math.round(grandTotal)}
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500 rounded text-sm">
                        <p className="font-semibold text-yellow-800 dark:text-yellow-200">⚠️ IMPORTANTE:</p>
                        <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                          Debes adjuntar el comprobante de transferencia al chat de WhatsApp para confirmar tu pedido.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-20">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">$U {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Costo de Envío</span>
                      <span className="font-medium">$U {deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IVA (22%)</span>
                      <span className="font-medium">$U {Math.round(tax)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">$U {Math.round(grandTotal)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  {!isFormValid && (
                    <p className="text-sm text-muted-foreground text-center">
                      Completa todos los campos para continuar
                    </p>
                  )}
                  <a
                    href={isFormValid ? whatsappLink : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                    onClick={(e) => {
                      if (!isFormValid) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <Button className="w-full" size="lg" disabled={!isFormValid}>
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Enviar Pedido por WhatsApp
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
