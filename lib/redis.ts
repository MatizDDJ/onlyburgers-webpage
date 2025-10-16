import { Redis } from '@upstash/redis'

// Crear instancia de Redis con las variables de entorno de Vercel
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
})

// Clave para almacenar el menú en Redis
export const MENU_KEY = 'menu:data'
