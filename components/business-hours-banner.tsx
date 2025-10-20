"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { isOpen, getNextOpenTime, getTimeUntilOpen, formatTimeRemaining } from "@/lib/business-hours"

export function BusinessHoursBanner() {
  const [open, setOpen] = useState<boolean>(true)
  const [nextOpen, setNextOpen] = useState<{ day: string; time: string } | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  useEffect(() => {
    const checkStatus = () => {
      const isCurrentlyOpen = isOpen()
      setOpen(isCurrentlyOpen)
      
      if (!isCurrentlyOpen) {
        const next = getNextOpenTime()
        setNextOpen(next)
        
        const timeUntil = getTimeUntilOpen()
        if (timeUntil) {
          setTimeRemaining(formatTimeRemaining(timeUntil))
        }
      }
    }

    checkStatus()
    
    // Actualizar cada minuto
    const interval = setInterval(checkStatus, 60000)
    
    return () => clearInterval(interval)
  }, [])

  if (open) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950 mb-6">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-600 font-medium">
          🍔 ¡Estamos abiertos! Hacé tu pedido ahora
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950 mb-6">
      <Clock className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-600 font-medium">
        {nextOpen ? (
          <>
            😴 Estamos cerrados. Volvemos {nextOpen.day} a las {nextOpen.time}
            {timeRemaining && (
              <span className="block text-sm mt-1">
                Abrimos en {timeRemaining}
              </span>
            )}
          </>
        ) : (
          " Estamos cerrados temporalmente"
        )}
      </AlertDescription>
    </Alert>
  )
}
