import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MenuPreviewSection } from "@/components/menu-preview-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <HeroSection />
      <MenuPreviewSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
