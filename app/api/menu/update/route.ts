import { NextResponse } from 'next/server'
import { redis, MENU_KEY } from '@/lib/redis'

export async function POST(request: Request) {
  try {
    const { password, menuData } = await request.json()
    
    // Contraseña simple (en producción deberías usar variables de entorno)
    const ADMIN_PASSWORD = 'onlyburgers2025'
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }
    
    // Guardar en Redis (Upstash) - funciona en Vercel
    await redis.set(MENU_KEY, menuData)
    
    return NextResponse.json({ success: true, message: 'Menú actualizado correctamente' })
  } catch (error) {
    console.error('Error al actualizar los datos del menú:', error)
    return NextResponse.json(
      { error: 'Error al actualizar los datos del menú' },
      { status: 500 }
    )
  }
}
