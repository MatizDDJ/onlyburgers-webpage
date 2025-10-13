import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-accent text-accent-foreground">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="text-2xl font-bold tracking-tight font-[family-name:var(--font-display)]">ONLY BURGERS</div>
            <p className="text-sm text-accent-foreground/80 leading-relaxed">
              Maestría en hamburguesas gourmet desde 2015.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#menu" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                Menú
              </Link>
              <Link href="#about" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                Nosotros
              </Link>
              <Link
                href="#testimonials"
                className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
              >
                Reseñas
              </Link>
              <Link
                href="#contact"
                className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                Términos de Servicio
              </Link>
              <Link href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                Info de Alérgenos
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Síguenos</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="https://www.instagram.com/onlyburguers_ff/" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                Instagram
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-accent-foreground/10 text-center text-sm text-accent-foreground/60">
          <p>© 2025 ONLY BURGERS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
