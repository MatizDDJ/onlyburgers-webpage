"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Save, Loader2, CheckCircle, XCircle, Shield, Plus, Trash2, Edit, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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

type AdminView = "menu" | "add" | "delete" | "edit"

export default function ModificarMenuPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [currentView, setCurrentView] = useState<AdminView>("menu")
  
  // Estados para añadir producto
  const [newProduct, setNewProduct] = useState<{
    category: keyof MenuData | ""
    name: string
    description: string
    price: string
    image: string
    popular: boolean
    includesFries: boolean
  }>({
    category: "",
    name: "",
    description: "",
    price: "",
    image: "",
    popular: false,
    includesFries: false,
  })
  
  // Estados para eliminar producto
  const [deleteCategory, setDeleteCategory] = useState<keyof MenuData | "">("")
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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
    
    // Permitir string vacío para poder borrar todo el precio
    if (newPrice === "") {
      setMenuData({
        ...menuData,
        [category]: menuData[category].map((item) =>
          item.id === itemId ? { ...item, price: 0 } : item
        ),
      })
      return
    }
    
    const price = parseFloat(newPrice)
    if (isNaN(price)) return

    setMenuData({
      ...menuData,
      [category]: menuData[category].map((item) =>
        item.id === itemId ? { ...item, price } : item
      ),
    })
  }
  
  const handleAddProduct = async () => {
    if (!menuData || !newProduct.category || !newProduct.name || !newProduct.price) {
      setErrorMessage("Por favor completa todos los campos obligatorios")
      return
    }
    
    const id = newProduct.name.toLowerCase().replace(/\s+/g, "-")
    const price = parseFloat(newProduct.price)
    
    if (isNaN(price) || price <= 0) {
      setErrorMessage("El precio debe ser un número válido mayor a 0")
      return
    }
    
    const newItem: MenuItem = {
      id,
      name: newProduct.name,
      description: newProduct.description,
      price,
      image: newProduct.image || "/placeholder.svg",
      popular: newProduct.popular,
      includesFries: newProduct.includesFries,
    }
    
    const updatedMenuData = {
      ...menuData,
      [newProduct.category]: [...menuData[newProduct.category], newItem],
    }
    
    setMenuData(updatedMenuData)
    
    // Guardar en la base de datos
    setLoading(true)
    try {
      const response = await fetch("/api/menu/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ menuData: updatedMenuData }),
      })

      const result = await response.json()

      if (response.ok) {
        // Limpiar caché del menú
        localStorage.removeItem('onlyburgers_menu_cache')
        
        // Mostrar mensaje de éxito
        setErrorMessage("")
        setSaveStatus("success")
        
        // Esperar 3 segundos antes de volver
        setTimeout(() => {
          setNewProduct({
            category: "",
            name: "",
            description: "",
            price: "",
            image: "",
            popular: false,
            includesFries: false,
          })
          setSaveStatus("idle")
          setCurrentView("menu")
        }, 3000)
      } else {
        if (response.status === 401) {
          setErrorMessage("Sesión expirada. Por favor, inicia sesión nuevamente.")
          handleLogout()
        } else {
          setErrorMessage(result.error || "Error al guardar el producto")
        }
      }
    } catch (error) {
      console.error("Error saving product:", error)
      setErrorMessage("Error al guardar el producto")
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteProduct = async () => {
    if (!menuData || !deleteCategory || !itemToDelete) return
    
    const updatedMenuData = {
      ...menuData,
      [deleteCategory]: menuData[deleteCategory].filter(
        (item) => item.id !== itemToDelete
      ),
    }
    
    setMenuData(updatedMenuData)
    setShowDeleteConfirm(false)
    
    // Guardar en la base de datos
    setLoading(true)
    try {
      const response = await fetch("/api/menu/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ menuData: updatedMenuData }),
      })

      const result = await response.json()

      if (response.ok) {
        // Limpiar caché del menú
        localStorage.removeItem('onlyburgers_menu_cache')
        
        setItemToDelete(null)
        setDeleteCategory("")
        setSaveStatus("success")
        setErrorMessage("")
        
        // Esperar 3 segundos antes de volver
        setTimeout(() => {
          setSaveStatus("idle")
          setCurrentView("menu")
        }, 3000)
      } else {
        if (response.status === 401) {
          setErrorMessage("Sesión expirada. Por favor, inicia sesión nuevamente.")
          handleLogout()
        } else {
          setErrorMessage(result.error || "Error al eliminar el producto")
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      setErrorMessage("Error al eliminar el producto")
    } finally {
      setLoading(false)
    }
  }
  
  const confirmDelete = (category: keyof MenuData, itemId: string) => {
    setDeleteCategory(category)
    setItemToDelete(itemId)
    setShowDeleteConfirm(true)
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

  // Vista de menú principal
  if (currentView === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-display)]">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground">
                Selecciona una opción para gestionar el menú
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

          <div className="grid gap-4 md:grid-cols-3">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentView("add")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Añadir al Menú</CardTitle>
                <CardDescription>
                  Agregar nuevos productos (hamburguesas, bebidas, etc.)
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentView("delete")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center mb-4">
                  <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-xl">Eliminar del Menú</CardTitle>
                <CardDescription>
                  Quitar productos existentes del menú
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentView("edit")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mb-4">
                  <Edit className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Modificar Precios</CardTitle>
                <CardDescription>
                  Editar precios de productos existentes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Vista de añadir producto
  if (currentView === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("menu")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Añadir Producto al Menú</CardTitle>
              <CardDescription>
                Completa los datos del nuevo producto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {saveStatus === "success" && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">
                    ✅ ¡Producto agregado al menú! Volviendo al menú principal...
                  </AlertDescription>
                </Alert>
              )}

              {errorMessage && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>Categoría *</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) =>
                    setNewProduct({ ...newProduct, category: value as keyof MenuData })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hamburguesas">Hamburguesas</SelectItem>
                    <SelectItem value="bebidas">Bebidas</SelectItem>
                    <SelectItem value="milanesas">Milanesas</SelectItem>
                    <SelectItem value="papas">Papas Fritas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="Ej: Burguer Clásica"
                />
              </div>

              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  placeholder="Describe el producto..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Precio ($U) *</Label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="180"
                  step="1"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label>URL de la Imagen (opcional)</Label>
                <Input
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  placeholder="https://i.imgur.com/tu-imagen.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  💡 Deja vacío para usar imagen por defecto. Puedes subir tu imagen a{" "}
                  <a 
                    href="https://imgur.com/upload" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-medium"
                  >
                    Imgur
                  </a>
                  {" "}y pegar el link aquí.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={newProduct.popular}
                  onCheckedChange={(checked) =>
                    setNewProduct({ ...newProduct, popular: checked as boolean })
                  }
                />
                <Label htmlFor="popular" className="cursor-pointer">
                  Marcar como producto popular
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includesFries"
                  checked={newProduct.includesFries}
                  onCheckedChange={(checked) =>
                    setNewProduct({ ...newProduct, includesFries: checked as boolean })
                  }
                />
                <Label htmlFor="includesFries" className="cursor-pointer">
                  Incluye papas fritas
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentView("menu")}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Producto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Vista de eliminar producto
  if (currentView === "delete") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("menu")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Eliminar Producto del Menú</CardTitle>
              <CardDescription>
                Selecciona el producto que deseas eliminar
              </CardDescription>
            </CardHeader>
          </Card>

          {saveStatus === "success" && (
            <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                ✅ ¡Producto eliminado del menú! Volviendo al menú principal...
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="hamburguesas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="hamburguesas">Hamburguesas</TabsTrigger>
              <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
              <TabsTrigger value="milanesas">Milanesas</TabsTrigger>
              <TabsTrigger value="papas">Papas Fritas</TabsTrigger>
            </TabsList>

            {(["hamburguesas", "bebidas", "milanesas", "papas"] as const).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-4 md:grid-cols-2">
                  {menuData[category].map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                              ${item.price}
                            </CardDescription>
                          </div>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg ml-4"
                            />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => confirmDelete(category, item.id)}
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. El producto será eliminado permanentemente
                  del menú cuando guardes los cambios.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteProduct}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    )
  }

  // Vista de modificar precios
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
                  type="text"
                  inputMode="numeric"
                  value={item.price || ""}
                  onChange={(e) => {
                    const value = e.target.value
                    // Permitir solo números y vacío
                    if (value === "" || /^\d+$/.test(value)) {
                      handlePriceChange(category, item.id, value)
                    }
                  }}
                  onKeyDown={(e) => {
                    // Permitir: backspace, delete, tab, escape, enter, números
                    if (
                      e.key === "Backspace" ||
                      e.key === "Delete" ||
                      e.key === "Tab" ||
                      e.key === "Escape" ||
                      e.key === "Enter" ||
                      /^\d$/.test(e.key)
                    ) {
                      return
                    }
                    e.preventDefault()
                  }}
                  className="mt-1"
                  placeholder="0"
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
        <Button
          variant="ghost"
          onClick={() => setCurrentView("menu")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-display)]">
            Modificar Precios del Menú
          </h1>
          <p className="text-muted-foreground">
            Edita los precios de los productos. Los cambios se guardarán al hacer click en
            &quot;Guardar Cambios&quot;.
          </p>
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
