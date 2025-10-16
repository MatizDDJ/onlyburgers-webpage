"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Save, Loader2, CheckCircle, XCircle, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  popular: boolean
  includesFries: boolean
}

interface MenuData {
  hamburguesas: MenuItem[]
  bebidas: MenuItem[]
  milanesas: MenuItem[]
  papas: MenuItem[]
}

export default function ModificarMenuPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Verificar si hay token guardado en localStorage
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setAuthToken(savedToken)
      setIsAuthenticated(true)
      fetchMenu()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && !menuData) {
      fetchMenu()
    }
  }, [isAuthenticated])

  const fetchMenu = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/menu")
      const data = await response.json()
      setMenuData(data)
    } catch (error) {
      console.error("Error fetching menu:", error)
      setErrorMessage("Error al cargar el menú")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        setAuthToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem('admin_token', data.token)
        setPassword("")
      } else {
        setErrorMessage(data.error || "Error al iniciar sesión")
      }
    } catch (error) {
      console.error("Error logging in:", error)
      setErrorMessage("Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setAuthToken(null)
    setIsAuthenticated(false)
    setMenuData(null)
  }

  const handlePriceChange = (category: keyof MenuData, itemId: string, newPrice: string) => {
    if (!menuData) return
    
    const price = parseFloat(newPrice)
    if (isNaN(price)) return

    setMenuData({
      ...menuData,
      [category]: menuData[category].map((item) =>
        item.id === itemId ? { ...item, price } : item
      ),
    })
  }

  const handleSave = async () => {
    if (!menuData || !authToken) return

    setLoading(true)
    setSaveStatus("idle")

    try {
      const response = await fetch("/api/menu/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ menuData }),
      })

      const result = await response.json()

      if (response.ok) {
        // Limpiar caché del menú para que se actualice en la página principal
        localStorage.removeItem('onlyburgers_menu_cache')
        
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        if (response.status === 401) {
          // Token expirado, cerrar sesión
          setErrorMessage("Sesión expirada. Por favor, inicia sesión nuevamente.")
          handleLogout()
        } else {
          setSaveStatus("error")
          setErrorMessage(result.error || "Error al guardar")
        }
      }
    } catch (error) {
      console.error("Error saving menu:", error)
      setSaveStatus("error")
      setErrorMessage("Error al guardar el menú")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle>
            <CardDescription>Ingresa la contraseña para modificar el menú</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="w-full"
                  disabled={loading}
                />
              </div>
              {errorMessage && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Ingresar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading && !menuData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Cargando menú...</p>
        </div>
      </div>
    )
  }

  if (!menuData) return null

  const renderCategoryItems = (category: keyof MenuData) => (
    <div className="space-y-4">
      {menuData[category].map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {item.description}
                </CardDescription>
                <div className="flex gap-2 mt-2">
                  {item.popular && (
                    <Badge variant="default" className="text-xs">
                      Popular
                    </Badge>
                  )}
                  {item.includesFries && (
                    <Badge variant="secondary" className="text-xs">
                      🍟 Incluye Papas
                    </Badge>
                  )}
                </div>
              </div>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg ml-4"
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor={`price-${item.id}`} className="text-sm">
                  Precio ($U)
                </Label>
                <Input
                  id={`price-${item.id}`}
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handlePriceChange(category, item.id, e.target.value)
                  }
                  className="mt-1"
                  step="1"
                  min="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-display)]">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Modifica los precios del menú. Los cambios se guardarán permanentemente.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>

        {saveStatus === "success" && (
          <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              ¡Menú actualizado correctamente!
            </AlertDescription>
          </Alert>
        )}

        {saveStatus === "error" && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="hamburguesas" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="hamburguesas">Hamburguesas</TabsTrigger>
            <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
            <TabsTrigger value="milanesas">Milanesas</TabsTrigger>
            <TabsTrigger value="papas">Papas Fritas</TabsTrigger>
          </TabsList>

          <TabsContent value="hamburguesas">
            {renderCategoryItems("hamburguesas")}
          </TabsContent>

          <TabsContent value="bebidas">
            {renderCategoryItems("bebidas")}
          </TabsContent>

          <TabsContent value="milanesas">
            {renderCategoryItems("milanesas")}
          </TabsContent>

          <TabsContent value="papas">
            {renderCategoryItems("papas")}
          </TabsContent>
        </Tabs>

        <div className="sticky bottom-4 mt-8 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading}
            size="lg"
            className="shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
