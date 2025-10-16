import { NextResponse } from 'next/server'
import { createToken, verifyPassword } from '@/lib/auth'

// Rate limiting simple en memoria (en producción usar Redis)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const attempt = loginAttempts.get(ip)

  if (!attempt || now > attempt.resetTime) {
    // Primer intento o tiempo expirado, resetear
    loginAttempts.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minuto
    return true
  }

  if (attempt.count >= 5) {
    // Más de 5 intentos en 1 minuto
    return false
  }

  // Incrementar contador
  attempt.count++
  return true
}

export async function POST(request: Request) {
  try {
    // Obtener IP del cliente para rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Verificar rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Espera 1 minuto e intenta de nuevo.' },
        { status: 429 }
      )
    }

    const { password } = await request.json()

    // Verificar contraseña
    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }

    // Crear token JWT válido por 24 horas
    const token = await createToken({ admin: true, timestamp: Date.now() })

    // Limpiar intentos fallidos para esta IP
    loginAttempts.delete(ip)

    return NextResponse.json({ 
      success: true, 
      token,
      message: 'Acceso concedido por 24 horas' 
    })
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
