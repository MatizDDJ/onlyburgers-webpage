"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuSection } from "@/components/menu-section"

export default function MenuPage() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="py-8">
        <MenuSection />
      </div>
      <Footer />
    </main>
  )
}
