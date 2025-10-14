export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-muted/50">
      <div className="container px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative burger-overflow">
            <div className="aspect-[4/3] rounded-2xl overflow-visible">
              <img
                src="/chef-preparing-gourmet-burgers-in-kitchen.jpg"
                alt="Nuestra Cocina"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance font-[family-name:var(--font-display)]">
              PASIÓN POR LA HAMBURGUESA PERFECTA
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="text-pretty">
              en ONLY BURGUERS transformamos lo simple en extraordinario. 
              Trabajamos con ingredientes frescos de productores locales, 
              elegidos uno por uno para garantizar sabor, calidad y autenticidad en cada bocado.
              </p>
              <p className="text-pretty">
                Nuestra carne se prepara cada día, 
                los panes se hornean en casa y cada detalle se cuida al milímetro. 
                No hacemos hamburguesas comunes: creamos experiencias que despiertan los sentidos y te hacen volver por más.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Carne Premium</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">Delivery</div>
                <div className="text-sm text-muted-foreground">Extra rápido</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">Muchisimos</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfechos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
