import { NextResponse } from 'next/server'
import { redis, MENU_KEY } from '@/lib/redis'
import fs from 'fs'
import path from 'path'

// Este endpoint sincroniza el menu.json local con Redis
export async function GET() {
  try {
    // Leer el archivo menu.json
    const filePath = path.join(process.cwd(), 'data', 'menu.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const menuData = JSON.parse(fileContents)
    
    // Actualizar Redis con los datos del archivo
    await redis.set(MENU_KEY, menuData)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Menú sincronizado correctamente desde menu.json a Redis',
      categories: Object.keys(menuData)
    })
  } catch (error) {
    console.error('Error al sincronizar el menú:', error)
    return NextResponse.json(
      { error: 'Error al sincronizar el menú', details: String(error) },
      { status: 500 }
    )
  }
}
