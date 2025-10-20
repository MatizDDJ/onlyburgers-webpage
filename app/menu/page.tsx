"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuSection } from "@/components/menu-section"
import { BusinessHoursBanner } from "@/components/business-hours-banner"

export default function MenuPage() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <BusinessHoursBanner />
        </div>
        <MenuSection />
        <Footer />
      </div>
    </main>
  )
}
