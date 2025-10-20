export interface BusinessHours {
  day: number // 0 = Domingo, 1 = Lunes, ... 6 = Sábado
  open: string // HH:MM formato 24h
  close: string // HH:MM formato 24h
  closed: boolean
}

export interface BusinessHoursObject {
  [key: string]: { open: string; close: string; closed: boolean }
}

export const defaultBusinessHours: BusinessHours[] = [
  { day: 0, open: "11:00", close: "23:00", closed: false }, // Domingo
  { day: 1, open: "11:00", close: "23:00", closed: false }, // Lunes
  { day: 2, open: "11:00", close: "23:00", closed: false }, // Martes
  { day: 3, open: "11:00", close: "23:00", closed: false }, // Miércoles
  { day: 4, open: "11:00", close: "23:00", closed: false }, // Jueves
  { day: 5, open: "11:00", close: "00:00", closed: false }, // Viernes
  { day: 6, open: "11:00", close: "00:00", closed: false }, // Sábado
]

export const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
]

const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

function convertObjectToArray(hoursObject: BusinessHoursObject): BusinessHours[] {
  return [
    { day: 0, ...hoursObject.sunday },
    { day: 1, ...hoursObject.monday },
    { day: 2, ...hoursObject.tuesday },
    { day: 3, ...hoursObject.wednesday },
    { day: 4, ...hoursObject.thursday },
    { day: 5, ...hoursObject.friday },
    { day: 6, ...hoursObject.saturday },
  ]
}

function getBusinessHours(): BusinessHours[] {
  const storedHours = localStorage.getItem('business_hours')
  if (!storedHours) {
    return defaultBusinessHours
  }
  
  try {
    const parsed = JSON.parse(storedHours)
    // Si es un objeto con claves (monday, tuesday, etc.), convertir a array
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return convertObjectToArray(parsed as BusinessHoursObject)
    }
    // Si ya es un array, devolverlo
    if (Array.isArray(parsed)) {
      return parsed
    }
  } catch (error) {
    console.error('Error parsing business hours:', error)
  }
  
  return defaultBusinessHours
}

export function isOpen(): boolean {
  const now = new Date()
  const currentDay = now.getDay()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  
  const hours = getBusinessHours()
  const todayHours = hours.find(h => h.day === currentDay)
  
  if (!todayHours || todayHours.closed) {
    return false
  }
  
  // Manejar caso de cierre después de medianoche (ej: 00:00)
  if (todayHours.close < todayHours.open) {
    return currentTime >= todayHours.open || currentTime < todayHours.close
  }
  
  return currentTime >= todayHours.open && currentTime < todayHours.close
}

export function getNextOpenTime(): { day: string; time: string } | null {
  const now = new Date()
  const currentDay = now.getDay()
  
  const hours = getBusinessHours()
  
  // Buscar próxima apertura en los próximos 7 días
  for (let i = 0; i < 7; i++) {
    const checkDay = (currentDay + i) % 7
    const dayHours = hours.find(h => h.day === checkDay)
    
    if (dayHours && !dayHours.closed) {
      if (i === 0) {
        // Hoy - verificar si ya pasó la hora de apertura
        const now = new Date()
        const [openHour, openMin] = dayHours.open.split(':').map(Number)
        const openTime = new Date()
        openTime.setHours(openHour, openMin, 0, 0)
        
        if (now < openTime) {
          return {
            day: 'hoy',
            time: dayHours.open
          }
        }
      } else {
        return {
          day: i === 1 ? 'mañana' : dayNames[checkDay],
          time: dayHours.open
        }
      }
    }
  }
  
  return null
}

export function getTimeUntilOpen(): number | null {
  const nextOpen = getNextOpenTime()
  if (!nextOpen) return null
  
  const now = new Date()
  const [hours, minutes] = nextOpen.time.split(':').map(Number)
  const openTime = new Date()
  
  if (nextOpen.day === 'hoy') {
    openTime.setHours(hours, minutes, 0, 0)
  } else if (nextOpen.day === 'mañana') {
    openTime.setDate(openTime.getDate() + 1)
    openTime.setHours(hours, minutes, 0, 0)
  } else {
    // Calcular días hasta ese día de la semana
    const targetDay = dayNames.indexOf(nextOpen.day)
    const currentDay = now.getDay()
    const daysUntil = (targetDay - currentDay + 7) % 7
    openTime.setDate(openTime.getDate() + daysUntil)
    openTime.setHours(hours, minutes, 0, 0)
  }
  
  return openTime.getTime() - now.getTime()
}

export function formatTimeRemaining(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return `${days} día${days > 1 ? 's' : ''}`
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  
  return `${minutes} minutos`
}
