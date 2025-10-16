import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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
    
    const filePath = path.join(process.cwd(), 'data', 'menu.json')
    fs.writeFileSync(filePath, JSON.stringify(menuData, null, 2), 'utf8')
    
    return NextResponse.json({ success: true, message: 'Menú actualizado correctamente' })
  } catch (error) {
    console.error('Error al actualizar los datos del menú:', error)
    return NextResponse.json(
      { error: 'Error al actualizar los datos del menú' },
      { status: 500 }
    )
  }
}
