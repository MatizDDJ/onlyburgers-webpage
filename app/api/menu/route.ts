import { NextResponse } from 'next/server'
import { redis, MENU_KEY } from '@/lib/redis'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Intentar obtener datos desde Redis (Upstash)
    const menuData = await redis.get(MENU_KEY)
    
    if (menuData) {
      return NextResponse.json(menuData)
    }
    
    // Si no hay datos en Redis, cargar desde JSON local y guardar en Redis
    const filePath = path.join(process.cwd(), 'data', 'menu.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const localMenuData = JSON.parse(fileContents)
    
    // Guardar en Redis para la próxima vez
    await redis.set(MENU_KEY, localMenuData)
    
    return NextResponse.json(localMenuData)
  } catch (error) {
    console.error('Error reading menu data:', error)
    return NextResponse.json(
      { error: 'Failed to load menu data' },
      { status: 500 }
    )
  }
}
