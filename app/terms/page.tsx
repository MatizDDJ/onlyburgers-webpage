"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="pt-16">
        <div className="py-12 md:py-20 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-[family-name:var(--font-display)]">
              TÉRMINOS Y CONDICIONES
            </h1>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Aceptación de Términos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Al realizar un pedido en ONLY BURGERS, aceptás estos términos y condiciones. 
                    Si no estás de acuerdo con alguno de estos términos, por favor no realices pedidos en nuestro sitio.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Pedidos y Pagos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Todos los pedidos deben realizarse a través de WhatsApp al +598 98 190 425.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Métodos de pago aceptados:</strong> Efectivo y transferencia bancaria</li>
                    <li><strong>Confirmación:</strong> Tu pedido se confirma una vez que recibís nuestra respuesta por WhatsApp</li>
                    <li><strong>Precios:</strong> Todos los precios están en pesos uruguayos (UYU) e incluyen IVA</li>
                    <li><strong>Cambios de precio:</strong> Nos reservamos el derecho de modificar precios sin previo aviso</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Horarios de Atención</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    <strong>Horario de pedidos y entregas:</strong> Lunes a Domingo de 20:00 a 01:00 hs
                  </p>
                  <p className="mt-4">
                    Los pedidos realizados fuera de este horario serán procesados al día siguiente en nuestro próximo horario de apertura.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Entregas</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Zona de entrega:</strong> Colonia, Uruguay - Zona Centro</li>
                    <li><strong>Tiempo estimado:</strong> 30-45 minutos (puede variar según demanda)</li>
                    <li><strong>Costo de envío:</strong> Se informa al momento del pedido según tu ubicación</li>
                    <li><strong>Dirección correcta:</strong> Es responsabilidad del cliente proporcionar una dirección de entrega completa y correcta</li>
                  </ul>
                  <p className="mt-4">
                    No nos hacemos responsables por entregas fallidas debido a direcciones incorrectas o incompletas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Cancelaciones y Reembolsos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    <strong>Cancelaciones:</strong> Podés cancelar tu pedido contactándonos por WhatsApp antes de que 
                    comencemos a prepararlo. Una vez iniciada la preparación, no se aceptan cancelaciones.
                  </p>
                  <p className="mt-4">
                    <strong>Reembolsos:</strong> Solo se realizan reembolsos en caso de:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Error en el pedido por nuestra parte</li>
                    <li>Productos en mal estado (notificar inmediatamente)</li>
                    <li>No disponibilidad de productos después de confirmar el pedido</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Calidad y Seguridad Alimentaria</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Nos comprometemos a preparar todos nuestros productos con ingredientes frescos y de primera calidad, 
                    siguiendo todas las normas de higiene y seguridad alimentaria.
                  </p>
                  <p className="mt-4">
                    Si tenés alergias alimentarias o restricciones dietéticas, por favor informanos al momento de realizar tu pedido.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Información de Alérgenos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Nuestros productos pueden contener o haber estado en contacto con:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Gluten (pan)</li>
                    <li>Lácteos (queso, salsas)</li>
                    <li>Huevos (salsas, pan)</li>
                    <li>Mostaza y condimentos</li>
                  </ul>
                  <p className="mt-4">
                    Si tenés alguna alergia, consultanos sobre los ingredientes específicos de cada producto.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Propiedad Intelectual</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Todo el contenido de este sitio web, incluyendo textos, imágenes, logos y diseño, 
                    es propiedad de ONLY BURGERS y está protegido por las leyes de propiedad intelectual.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Limitación de Responsabilidad</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    ONLY BURGERS no se hace responsable por:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Retrasos en la entrega debido a circunstancias fuera de nuestro control (clima, tráfico, etc.)</li>
                    <li>Problemas técnicos con el sitio web o WhatsApp</li>
                    <li>Uso indebido de nuestros servicios</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Modificaciones de Términos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                    Las modificaciones entrarán en vigencia inmediatamente después de su publicación en este sitio.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Contacto</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Para cualquier consulta sobre estos términos y condiciones:
                  </p>
                  <ul className="list-none space-y-2 mt-4">
                    <li><strong>WhatsApp:</strong> +598 98 190 425</li>
                    <li><strong>Ubicación:</strong> Colonia, Uruguay - Zona Centro</li>
                    <li><strong>Horario de atención:</strong> Lunes a Domingo, 20:00 - 01:00 hs</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-sm text-muted-foreground mt-8">
                <p>Última actualización: Octubre 2025</p>
                <p className="mt-2">Al realizar un pedido, confirmas que has leído y aceptado estos términos y condiciones.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
