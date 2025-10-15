"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function AllergensPage() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="pt-16">
        <div className="py-12 md:py-20 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-[family-name:var(--font-display)]">
              INFORMACIÓN DE ALÉRGENOS
            </h1>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
              <div className="flex gap-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    Aviso Importante sobre Alérgenos
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Si tenés alergias alimentarias o intolerancias, por favor informanos al momento de realizar tu pedido. 
                    Nuestro personal te asesorará sobre los ingredientes específicos de cada producto. No podemos garantizar 
                    la ausencia total de trazas de alérgenos debido al procesamiento compartido en nuestra cocina.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Hamburguesas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Ingredientes Comunes:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Gluten:</strong> Presente en el pan de hamburguesa</li>
                      <li><strong>Lácteos:</strong> Queso cheddar, mayonesa</li>
                      <li><strong>Huevo:</strong> Presente en algunas salsas y en el pan</li>
                      <li><strong>Soja:</strong> Posible presencia en aceites y salsas</li>
                      <li><strong>Mostaza:</strong> En salsas y aderezos</li>
                      <li><strong>Sulfitos:</strong> Pueden estar presentes en productos procesados</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Carne:</strong> Nuestra carne es 100% vacuna, sin conservantes ni aditivos. 
                      Puede haber estado en contacto con otros productos durante el procesamiento.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Milanesas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li><strong>Gluten:</strong> Pan rallado</li>
                    <li><strong>Huevo:</strong> Rebozado</li>
                    <li><strong>Lácteos:</strong> En las variedades napolitana (queso y jamón)</li>
                    <li><strong>Soja:</strong> Aceite de fritura</li>
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Las milanesas se fríen en aceite compartido con otros productos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Papas Fritas y Acompañamientos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li><strong>Papas Fritas:</strong> Pueden contener trazas de soja (aceite de fritura)</li>
                    <li><strong>Papas con Cheddar y Panceta:</strong> Contienen lácteos y pueden contener gluten</li>
                    <li><strong>Gajos de Papa:</strong> Pueden contener especias con trazas de gluten</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salsas y Aderezos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Mayonesa:</strong> Contiene huevo, puede contener mostaza
                    </div>
                    <div>
                      <strong>Ketchup:</strong> Generalmente libre de alérgenos principales
                    </div>
                    <div>
                      <strong>Mostaza:</strong> Alérgeno declarado
                    </div>
                    <div>
                      <strong>Salsa BBQ:</strong> Puede contener mostaza, soja y gluten
                    </div>
                    <div>
                      <strong>Alioli:</strong> Contiene huevo y ajo
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bebidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Todas nuestras bebidas son productos envasados de marcas reconocidas (Coca-Cola, Fanta, Sprite). 
                    Para información detallada sobre alérgenos en bebidas, consultá las etiquetas del fabricante.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contaminación Cruzada</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    En ONLY BURGERS trabajamos con múltiples ingredientes en una cocina compartida. 
                    A pesar de nuestros esfuerzos por prevenir la contaminación cruzada:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Los productos pueden contener trazas de todos los alérgenos mencionados</li>
                    <li>Utilizamos equipos y superficies compartidas</li>
                    <li>El aceite de fritura es compartido entre diferentes productos</li>
                    <li>Trabajamos en un ambiente donde se manipulan gluten, lácteos, huevo y otros alérgenos</li>
                  </ul>
                  <p className="text-sm font-semibold mt-4 text-yellow-700 dark:text-yellow-500">
                    Si tenés alergias severas, te recomendamos extrema precaución al consumir nuestros productos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Opciones para Alergias e Intolerancias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Sin gluten:</strong> Lamentablemente, no contamos con opciones certificadas sin gluten en este momento.
                    </p>
                    <p>
                      <strong>Intolerancia a la lactosa:</strong> Podemos preparar hamburguesas sin queso.
                    </p>
                    <p>
                      <strong>Sin huevo:</strong> Podemos evitar salsas con huevo según tu preferencia.
                    </p>
                    <p className="mt-4 font-semibold">
                      Consultanos por WhatsApp (+598 98 190 425) para personalizar tu pedido según tus necesidades.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Para obtener información detallada sobre ingredientes específicos de cualquier producto:
                  </p>
                  <ul className="list-none space-y-2 text-sm">
                    <li><strong>WhatsApp:</strong> +598 98 190 425</li>
                    <li><strong>Horario:</strong> Lunes a Domingo, 20:00 - 01:00 hs</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mt-8">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
                  Responsabilidad del Cliente
                </p>
                <p className="text-sm text-red-800 dark:text-red-200">
                  Es responsabilidad del cliente informar sobre cualquier alergia o intolerancia alimentaria al momento 
                  de realizar el pedido. ONLY BURGERS no se hace responsable por reacciones alérgicas si no se ha 
                  notificado previamente sobre la condición del cliente.
                </p>
              </div>

              <div className="text-sm text-muted-foreground mt-8">
                <p>Última actualización: Octubre 2025</p>
                <p className="mt-2">
                  Esta información puede cambiar. Siempre consultá con nosotros antes de realizar tu pedido 
                  si tenés alergias o intolerancias alimentarias.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
