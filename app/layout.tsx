import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ONLY BURGUERS - Las Mejores Hamburguesas de Uruguay",
  description: "Hamburguesas gourmet premium con ingredientes de primera calidad",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
