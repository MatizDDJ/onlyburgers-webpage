import { NextResponse } from 'next/server'
import { redis, MENU_KEY } from '@/lib/redis'
import { verifyToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    // Verificar token de autenticación
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autenticación requerido' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remover "Bearer "
    const payload = await verifyToken(token)

    if (!payload || !payload.admin) {
      return NextResponse.json(
        { error: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' },
        { status: 401 }
      )
    }

    // Obtener datos del menú
    const { menuData } = await request.json()
    
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
