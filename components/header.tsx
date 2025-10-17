"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ShoppingCart, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-[9999] w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm"
      style={{
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    >
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex-1">
          <div className="text-2xl font-bold text-primary tracking-tight font-[family-name:var(--font-display)]">
            ONLY BURGUERS
          </div>
        </Link>

        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="text-sm font-medium hover:text-primary transition-colors">
              Menú
            </Link>
            <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <Link href="/order">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/order">
            <Button className="hidden md:inline-flex">Ordenar Ahora</Button>
          </Link>
          
          {/* Menú móvil */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                {/* Header del menú */}
                <SheetHeader className="p-6 pb-4 border-b">
                  <SheetTitle className="text-2xl font-bold text-primary font-[family-name:var(--font-display)] text-left">
                    ONLY BURGUERS
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground text-left">
                    Las mejores hamburguesas artesanales
                  </p>
                </SheetHeader>

                {/* Navegación */}
                <nav className="flex-1 px-6 py-6">
                  <div className="flex flex-col gap-2">
                    <Link 
                      href="/menu" 
                      className="text-base font-medium hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Menú Completo
                    </Link>
                    <Link 
                      href="/#about" 
                      className="text-base font-medium hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Nosotros
                    </Link>
                    <Link 
                      href="/#contact" 
                      className="text-base font-medium hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contacto
                    </Link>
                  </div>
                </nav>

                {/* Footer del menú con botón de ordenar - sobresale */}
                <div className="p-6 pt-4 border-t bg-primary/5 mt-auto">
                  <Link 
                    href="/order" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Ordenar Ahora
                      {itemCount > 0 && (
                        <Badge className="ml-2 bg-white text-primary hover:bg-white">
                          {itemCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Delivery disponible 🚚
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}