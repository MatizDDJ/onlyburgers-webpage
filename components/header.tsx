"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary tracking-tight font-[family-name:var(--font-display)]">
            ONLY BURGUERS
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#menu" className="text-sm font-medium hover:text-primary transition-colors">
            Menú
          </Link>
          <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
            Nosotros
          </Link>
          <Link href="/#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Reseñas
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-4">
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
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
