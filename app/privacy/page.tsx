"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="pt-16">
        <div className="py-12 md:py-20 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-[family-name:var(--font-display)]">
              POLÍTICA DE PRIVACIDAD
            </h1>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Información que Recopilamos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    En ONLY BURGERS, respetamos tu privacidad. Recopilamos la siguiente información cuando realizás un pedido:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nombre completo</li>
                    <li>Número de teléfono</li>
                    <li>Dirección de entrega</li>
                    <li>Información del pedido (productos, cantidades, método de pago)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Uso de la Información</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Utilizamos tu información únicamente para:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Procesar y entregar tus pedidos</li>
                    <li>Comunicarnos contigo sobre el estado de tu pedido</li>
                    <li>Mejorar nuestros servicios y productos</li>
                    <li>Responder a tus consultas y comentarios</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Protección de Datos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Tu información personal está protegida y no será compartida con terceros sin tu consentimiento, 
                    excepto cuando sea necesario para completar tu pedido (por ejemplo, servicios de entrega).
                  </p>
                  <p className="mt-4">
                    No almacenamos información de tarjetas de crédito ni datos bancarios en nuestros sistemas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Utilizamos cookies para mejorar tu experiencia en nuestro sitio web, recordar tus preferencias 
                    y analizar el tráfico del sitio. Podés desactivar las cookies en la configuración de tu navegador.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Tus Derechos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Tenés derecho a:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Acceder a tu información personal</li>
                    <li>Solicitar la corrección de datos inexactos</li>
                    <li>Solicitar la eliminación de tus datos</li>
                    <li>Oponerte al procesamiento de tus datos</li>
                  </ul>
                  <p className="mt-4">
                    Para ejercer estos derechos, contactanos a través de WhatsApp: +598 98 190 425
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Cambios en la Política</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
                    Los cambios entrarán en vigencia inmediatamente después de su publicación en este sitio web.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Contacto</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Si tenés preguntas sobre nuestra política de privacidad, podés contactarnos:
                  </p>
                  <ul className="list-none space-y-2 mt-4">
                    <li><strong>WhatsApp:</strong> +598 98 190 425</li>
                    <li><strong>Ubicación:</strong> Colonia, Uruguay - Zona Centro</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-sm text-muted-foreground mt-8">
                <p>Última actualización: Octubre 2025</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
