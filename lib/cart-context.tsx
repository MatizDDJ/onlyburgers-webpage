"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItemOptions {
  meatType?: "carne" | "pollo" // Para milanesas
  mayo?: boolean // Si lleva mayonesa
  comments?: string // Comentarios especiales del cliente
  customId?: string // ID único para items con diferentes opciones
  // Para promos
  selectedBurger?: string // ID de la hamburguesa elegida
  selectedDrink?: string // ID de la bebida elegida
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  options?: CartItemOptions
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'onlyburgers_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [items, isInitialized])

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      // Crear un ID único basado en el producto y sus opciones
      const itemCustomId = newItem.options?.customId || newItem.id
      
      const existingItem = currentItems.find((item) => {
        const existingCustomId = item.options?.customId || item.id
        return existingCustomId === itemCustomId
      })
      
      if (existingItem) {
        return currentItems.map((item) => {
          const existingCustomId = item.options?.customId || item.id
          return existingCustomId === itemCustomId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        })
      }
      return [...currentItems, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => {
      const itemId = item.options?.customId || item.id
      return itemId !== id
    }))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((currentItems) => currentItems.map((item) => {
      const itemId = item.options?.customId || item.id
      return itemId === id ? { ...item, quantity } : item
    }))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
