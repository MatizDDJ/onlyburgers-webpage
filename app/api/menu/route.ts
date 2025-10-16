import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'menu.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const menuData = JSON.parse(fileContents)
    
    return NextResponse.json(menuData)
  } catch (error) {
    console.error('Error reading menu data:', error)
    return NextResponse.json(
      { error: 'Failed to load menu data' },
      { status: 500 }
    )
  }
}
