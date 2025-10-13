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
              MAESTRÍA EN EL ARTE DE LA HAMBURGUESA
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                Desde 2015, ONLY BURGERS ha redefinido el concepto de hamburguesa gourmet en Uruguay. Seleccionamos
                cuidadosamente cada ingrediente, trabajando con productores locales para garantizar la máxima calidad y
                frescura en cada preparación.
              </p>
              <p className="text-pretty">
                Nuestra carne se muele diariamente, nuestros panes se hornean en casa cada mañana, y cada elemento se
                selecciona con precisión para crear una experiencia gastronómica excepcional. Creemos que una gran
                hamburguesa es el resultado de la pasión, la técnica y los mejores ingredientes.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Carne Premium</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Años de Experiencia</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfechos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
