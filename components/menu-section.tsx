"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart, type CartItemOptions } from "@/lib/cart-context"
import { isOpen, getNextOpenTime } from "@/lib/business-hours"
import { Plus, Check, X, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

export const menuItems = {
  hamburguesas: [
    {
      id: "burguer-classic",
      name: "Burguer Classic",
      description: "Una carne smash, dos fetas de queso cheddar, panceta ahumada",
      price: 180,
      image: "/classic-cheeseburger-with-melted-cheese.jpg",
      popular: true,
    },
    {
      id: "special-burguer",
      name: "Special Burguer",
      description: "Doble carne smash, tres fetas de queso cheddar, panceta ahumada",
      price: 250,
      image: "/bbq-bacon-burger.jpg",
      popular: true,
      includesFries: true,
    },
    {
      id: "burguer-only",
      name: "Burguer Only",
      description: "Triple carnes smash, cuatro fetas de cheddar, panceta ahumada",
      price: 290,
      image: "/mushroom-swiss-burger-gourmet.jpg",
      popular: false,
      includesFries: true,
    },
    {
      id: "burguer-bunker",
      name: "Burguer Bunker",
      description: "Doble carne smash, cuatro fetas de queso cheddar, panceta ahumada, cebolla caramelizada",
      price: 290,
      image: "/spicy-jalapeno-burger-with-peppers.jpg",
      popular: false,
      includesFries: true,
    },
    {
      id: "burguer-simple",
      name: "Burguer Simple",
      description: "Doble carne smash, dos fetas de muzzarella, lechuga, tomate",
      price: 280,
      image: "/gourmet-veggie-burger-with-avocado.jpg",
      popular: false,
      includesFries: true,
    },
    {
      id: "burguer-new",
      name: "Burguer New",
      description: "Doble carne smash, jamon, muzarrella, papitas pay, cheddar",
      price: 290,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: true,
      includesFries: true,
    },
      {
      id: "burguer-especialidad",
      name: "Burguer Especialidad de la Casa",
      description: "Triple carne smash, tres fetas de queso cheddar, muzzarella, panceta ahumada, lechuga, tomate",
      price: 320,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: true,
      includesFries: true,
    },
             {
      id: "burguer-quintuple",
      name: "Burguer Super Quintuple",
      description: "Cinco carnes smash, cinco fetas de queso cheddar, extra panceta, lechuga, tomate, cebolla blanca",
      price: 550,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: false,
      includesFries: true,
    },
         {
      id: "burguer-veggie1",
      name: "Burguer Veggie boniato y zanahoria",
      description: "Una burguer de boniato y zanahoria, queso cheddar, lechuga, tomate",
      price: 320,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: false,
      includesFries: false,
    },
           {
      id: "burguer-veggie2",
      name: "Burguer Veggie espinaca y puerro",
      description: "Una burguer de espinaca y puerro, muzzarella, lechuga, tomate",
      price: 320,
      image: "/ultimate-triple-burger-stacked-high.jpg",
      popular: false,
      includesFries: false,
    },
  ],
  bebidas: [
    {
      id: "coca-cola-600",
      name: "Coca-Cola 600ml",
      description: "Bebida refrescante",
      price: 80,
      image: "/coca-cola-bottle-600ml.jpg",
    },
    {
      id: "coca-cola-zero-600",
      name: "Coca-Cola Zero 600ml",
      description: "Sin azúcar",
      price: 80,
      image: "/coca-cola-zero-bottle-600ml.jpg",
    },
    {
      id: "sprite-600",
      name: "Sprite 600ml",
      description: "Bebida de lima-limón",
      price: 80,
      image: "/sprite-bottle-600ml.jpg",
    },
    {
      id: "fanta-600",
      name: "Fanta 600ml",
      description: "Sabor naranja",
      price: 80,
      image: "/fanta-orange-bottle-600ml.jpg",
    },
    {
      id: "coca-cola-1500",
      name: "Coca-Cola 1.5L",
      description: "Tamaño familiar",
      price: 150,
      image: "/coca-cola-bottle-1-5-liter.jpg",
    },
    {
      id: "coca-cola-zero-1500",
      name: "Coca-Cola Zero 1.5L",
      description: "Sin azúcar, tamaño familiar",
      price: 150,
      image: "/coca-cola-zero-bottle-1-5-liter.jpg",
    },
    {
      id: "sprite-1500",
      name: "Sprite 1.5L",
      description: "Tamaño familiar",
      price: 150,
      image: "/sprite-bottle-1-5-liter.jpg",
    },
    {
      id: "fanta-1500",
      name: "Fanta 1.5L",
      description: "Tamaño familiar",
      price: 180,
      image: "/fanta-orange-bottle-1-5-liter.jpg",
    },
  ],
  milanesas: [
    {
      id: "milanesa-bunker",
      name: "Milanesa Bunker",
      description: "una supermila de carne o pollo, cuatro fetas de queso cheddar, cebolla caramelizada, extra panceta ahumada",
      price: 380,
      image: "/breaded-beef-milanesa-with-fries.jpg",
    },
    {
      id: "milanesa-simple",
      name: "Milanesa Simple",
      description: "Una supermila de carne o pollo, extra muzzarella, lechuga, tomate",
      price: 380,
      image: "/milanesa-napolitana-with-cheese-and-ham.jpg",
    },
    {
      id: "milanesa-new",
      name: "Milanesa New",
      description: "Una super mila de carne o pollo, cuatro fetas de queso cheddar, jamon, muzzarella, lluvia de papitas pay",
      price: 380,
      image: "/breaded-chicken-milanesa-with-fries.jpg",
    },
       {
      id: "milanesa-especialidad",
      name: "Milanesa Especialidad de la Casa",
      description: "Una supermila de carne o pollo, seis fetas de queso cheddar, extra muzzarella, panceta ahumada sofritada, lechuga, tomate",
      price: 420,
      image: "/breaded-chicken-milanesa-with-fries.jpg",
    },
  ],
  papas: [
    {
      id: "papas-clasicas",
      name: "Papas Fritas Clásicas",
      description: "Porción grande de papas fritas crujientes",
      price: 180,
      image: "/crispy-french-fries-portion.jpg",
    },
    {
      id: "papas-cheddar",
      name: "Papas con Cheddar y Bacon",
      description: "Papas fritas con queso cheddar derretido y bacon",
      price: 250,
      image: "/loaded-fries-with-cheddar-and-bacon.jpg",
    },
    {
      id: "papas-rusticas",
      name: "Papas Rústicas",
      description: "Papas con piel, especias y hierbas",
      price: 200,
      image: "/rustic-potato-wedges-with-herbs.jpg",
    },
  ],
  promos: [
    {
      id: "combo-clasico",
      name: "Combo Clásico",
      description: "Burguer Classic + Papas Fritas + Coca-Cola 600ml",
      price: 400,
      image: "/classic-cheeseburger-with-melted-cheese.jpg",
      popular: true,
      includesFries: true,
    },
    {
      id: "combo-especial",
      name: "Combo Especial",
      description: "Special Burguer + Papas Fritas + Bebida 600ml a elección",
      price: 480,
      image: "/bbq-bacon-burger.jpg",
      popular: true,
      includesFries: true,
    },
    {
      id: "combo-duo",
      name: "Combo Dúo",
      description: "2 Burguer Classic + 2 Papas Fritas + Coca-Cola 1.5L",
      price: 750,
      image: "/delicious-gourmet-burger-with-melted-cheese-and-fr.jpg",
      popular: true,
      includesFries: true,
    },
  ],
}

const MENU_CACHE_KEY = 'onlyburgers_menu_cache'

export function MenuSection() {
  const { addItem } = useCart()
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [showOptionsModal, setShowOptionsModal] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isPromo, setIsPromo] = useState(false)
  const [itemOptions, setItemOptions] = useState<CartItemOptions>({
    meatType: "carne",
    mayo: true,
    comments: "",
    selectedBurger: "",
    selectedDrink: "",
  })
  const [menuData, setMenuData] = useState<typeof menuItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>("hamburguesas")

  // Cargar tab activa desde localStorage al montar
  useEffect(() => {
    const savedTab = localStorage.getItem('menu_active_tab')
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  // Establecer valores por defecto cuando se abre el modal de promo
  useEffect(() => {
    if (showOptionsModal && isPromo && menuData) {
      setItemOptions(prev => ({
        ...prev,
        selectedBurger: prev.selectedBurger || menuData.hamburguesas?.[0]?.id || "",
        selectedDrink: prev.selectedDrink || menuData.bebidas?.[0]?.id || "",
      }))
    }
  }, [showOptionsModal, isPromo, menuData])

  // Guardar tab activa en localStorage cuando cambie
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    localStorage.setItem('menu_active_tab', value)
  }

  useEffect(() => {
    async function loadMenu() {
      // 1. Intentar cargar desde localStorage primero (instantáneo)
      try {
        const cachedMenu = localStorage.getItem(MENU_CACHE_KEY)
        if (cachedMenu) {
          setMenuData(JSON.parse(cachedMenu))
          setLoading(false)
        }
      } catch (error) {
        console.error('Error loading cached menu:', error)
      }

      // 2. Fetch API en background (actualizar si hay cambios)
      try {
        const response = await fetch('/api/menu')
        const data = await response.json()
        
        // Guardar en localStorage para próxima vez
        localStorage.setItem(MENU_CACHE_KEY, JSON.stringify(data))
        
        // Actualizar estado (solo si cambió)
        setMenuData(data)
      } catch (error) {
        console.error('Error fetching menu:', error)
        // Si no había caché y falla API, usar datos locales
        if (!localStorage.getItem(MENU_CACHE_KEY)) {
          setMenuData(menuItems)
        }
      } finally {
        setLoading(false)
      }
    }
    
    loadMenu()
  }, [])

  const handleAddToCart = (item: any, skipOptions = false, forceAdd = false) => {
    // Prevenir clicks múltiples mientras hay animación en curso
    if (isAnimating) return
    
    // Determinar si el producto necesita opciones
    const isMilanesa = activeTab === "milanesas"
    const isHamburguesa = activeTab === "hamburguesas"
    const isPromoItem = activeTab === "promos"
    
    // Verificar si realmente necesita modal de opciones
    const milaneseNeedsOptions = isMilanesa && item.allowMeatType
    const promoNeedsOptions = isPromoItem && (item.allowBurgerChoice || item.allowDrinkChoice)
    const needsOptions = (milaneseNeedsOptions || isHamburguesa || promoNeedsOptions) && !skipOptions
    
    // Si necesita opciones y no las saltamos y no es una confirmación forzada, mostrar modal
    if (needsOptions && !forceAdd) {
      setSelectedItem(item)
      setShowOptionsModal(true)
      setIsPromo(isPromoItem)
      // Resetear opciones a valores por defecto
      setShowComments(false)
      setItemOptions({
        meatType: "carne",
        mayo: true,
        comments: "",
        selectedBurger: menuData?.hamburguesas?.[0]?.id || "",
        selectedDrink: menuData?.bebidas?.[0]?.id || "",
      })
      return
    }
    
    // Crear ID único basado en las opciones
    const optionsString = skipOptions 
      ? ""
      : `-${itemOptions.meatType || "default"}-${itemOptions.mayo ? "mayo" : "nomayo"}-${itemOptions.comments ? "comments" : "nocomments"}-${itemOptions.selectedBurger || ""}-${itemOptions.selectedDrink || ""}`
    const customId = `${item.id}${optionsString}`
    
    // Obtener nombres de hamburguesa y bebida seleccionadas
    const selectedBurgerName = itemOptions.selectedBurger 
      ? menuData?.hamburguesas?.find((b: any) => b.id === itemOptions.selectedBurger)?.name 
      : undefined
    const selectedDrinkName = itemOptions.selectedDrink
      ? menuData?.bebidas?.find((d: any) => d.id === itemOptions.selectedDrink)?.name
      : undefined
    
    // Determinar si realmente necesita opciones
    const milaneseNeedsOpts = isMilanesa && item.allowMeatType
    const promoNeedsOpts = isPromoItem && (item.allowBurgerChoice || item.allowDrinkChoice)
    const shouldIncludeOptions = !skipOptions && (milaneseNeedsOpts || isHamburguesa || promoNeedsOpts)
    
    // Preparar las opciones según el tipo de producto
    let productOptions = {}
    if (shouldIncludeOptions) {
      if (isPromoItem) {
        // Para promos, solo incluir hamburguesa, bebida y comentarios si están permitidos
        productOptions = {
          selectedBurger: item.allowBurgerChoice ? selectedBurgerName : undefined,
          selectedDrink: item.allowDrinkChoice ? selectedDrinkName : undefined,
          comments: itemOptions.comments || undefined,
          customId,
        }
      } else if (isMilanesa && item.allowMeatType) {
        // Para milanesas con opción de tipo: tipo de carne, mayonesa y comentarios
        productOptions = {
          meatType: itemOptions.meatType,
          mayo: itemOptions.mayo,
          comments: itemOptions.comments || undefined,
          customId,
        }
      } else if (isHamburguesa) {
        // Para hamburguesas: mayonesa y comentarios
        productOptions = {
          mayo: itemOptions.mayo,
          comments: itemOptions.comments || undefined,
          customId,
        }
      }
    }
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      options: shouldIncludeOptions ? productOptions : undefined,
    })

    setAddedItemId(item.id)
    setIsAnimating(true)
    
    setTimeout(() => {
      setAddedItemId(null)
      setIsAnimating(false)
    }, 1500)
    
    // Cerrar modales
    setSelectedItem(null)
    setShowOptionsModal(false)
  }
  
  const confirmAddToCart = () => {
    if (selectedItem) {
      // Verificar si el restaurante está abierto
      if (!isOpen()) {
        const nextOpen = getNextOpenTime()
        const message = nextOpen 
          ? `😴 Lo sentimos, estamos cerrados. Volvemos ${nextOpen.day} a las ${nextOpen.time}`
          : "😴 Lo sentimos, estamos cerrados temporalmente"
        alert(message)
        setShowOptionsModal(false)
        return
      }

      const isBebidaOrPapa = activeTab === "bebidas" || activeTab === "papas"
      
      // Si es bebida o papas, agregar directamente sin opciones
      if (isBebidaOrPapa) {
        handleAddToCart(selectedItem, true, true)
        setShowOptionsModal(false)
        return
      }
      
      // Si es una promo, validar que tenga hamburguesa y bebida seleccionadas
      if (isPromo) {
        const needsBurger = selectedItem.allowBurgerChoice
        const needsDrink = selectedItem.allowDrinkChoice
        
        if (needsBurger && !itemOptions.selectedBurger) {
          alert('Por favor selecciona una hamburguesa')
          return
        }
        if (needsDrink && !itemOptions.selectedDrink) {
          alert('Por favor selecciona una bebida')
          return
        }
      }
      
      handleAddToCart(selectedItem, false, true)
      setShowOptionsModal(false)
    }
  }

  const renderMenuItems = (items: any[], showFreeFries = false) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items?.map((item) => {
        // Determinar si este item necesita opciones
        const itemNeedsOptions = activeTab === "hamburguesas" || activeTab === "milanesas" || activeTab === "promos"
        
        return (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 flex flex-col h-full"
        >
          <div 
            className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer group"
            onClick={() => {
              setSelectedItem(item)
              setShowOptionsModal(true)
              setShowComments(false)
              setIsPromo(activeTab === "promos")
              setItemOptions({ 
                meatType: "carne", 
                mayo: true, 
                comments: "",
                selectedBurger: menuData?.hamburguesas?.[0]?.id || "",
                selectedDrink: menuData?.bebidas?.[0]?.id || "",
              })
            }}
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver detalles
              </span>
            </div>
            {/* Badges container */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 z-10">
              {item.popular && (
                <Badge className="bg-primary text-primary-foreground shadow-lg">
                  Popular
                </Badge>
              )}
              {item.includesFries && (
                <Badge className="bg-green-600 text-white shadow-lg">
                  🍟 Incluye Papas Gratis
                </Badge>
              )}
            </div>
            {addedItemId === item.id && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 cart-notification">
                <div className="bg-green-600 rounded-full p-4 shadow-2xl checkmark-container">
                  <Check className="h-12 w-12 md:h-16 md:w-16 text-white checkmark" strokeWidth={3} />
                </div>
              </div>
            )}
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{item.name}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
          </CardHeader>

          <CardFooter className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary">$U {item.price}</span>
            <Button onClick={() => handleAddToCart(item, !itemNeedsOptions)} className="shadow-md">
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </CardFooter>
        </Card>
      )})}
    </div>
  )

  if (loading || !menuData) {
    return (
      <section id="menu" className="py-12 md:py-20 bg-secondary/30 w-full">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Cargando menú...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" className="py-12 md:py-20 bg-secondary/30 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance font-[family-name:var(--font-display)]">
            NUESTRO MENÚ
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Descubre nuestra selección de hamburguesas, milanesas, bebidas refrescantes y acompañamientos deliciosos
          </p>
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 max-w-3xl mx-auto mt-6">
            <p className="text-base font-semibold text-primary">
              🍟 ¡PROMO ESPECIAL! Todas las hamburguesas de mas de dos carnes y milanesas incluyen porción de papas fritas GRATIS
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="hamburguesas" className="text-sm md:text-base py-3 order-1">
              Hamburguesas
            </TabsTrigger>
            <TabsTrigger value="bebidas" className="text-sm md:text-base py-3 order-2">
              Bebidas
            </TabsTrigger>
            <TabsTrigger value="milanesas" className="text-sm md:text-base py-3 order-3">
              Milanesas
            </TabsTrigger>
            <TabsTrigger value="promos" className="text-sm md:text-base py-3 order-5 lg:order-5">
              Promos
            </TabsTrigger>
            <TabsTrigger value="papas" className="text-sm md:text-base py-3 order-4 lg:order-4">
              Papas Fritas
            </TabsTrigger>
          </TabsList>

          <TabsContent 
            value="hamburguesas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS HAMBURGUESAS
            </h3>
            {renderMenuItems(menuData.hamburguesas)}
          </TabsContent>

          <TabsContent 
            value="bebidas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS BEBIDAS
            </h3>
            {renderMenuItems(menuData.bebidas)}
          </TabsContent>

          <TabsContent 
            value="milanesas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS MILANESAS
            </h3>
            {renderMenuItems(menuData.milanesas)}
          </TabsContent>

          <TabsContent 
            value="papas" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS PAPAS FRITAS
            </h3>
            {renderMenuItems(menuData.papas)}
          </TabsContent>

          <TabsContent 
            value="promos" 
            className="space-y-6 animate-in fade-in-0 duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 font-[family-name:var(--font-display)]">
              NUESTRAS PROMOS
            </h3>
            {menuData.promos && menuData.promos.length > 0 ? (
              renderMenuItems(menuData.promos)
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay promos disponibles en este momento.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modal de opciones del producto */}
        <Dialog open={showOptionsModal} onOpenChange={(open) => !open && setShowOptionsModal(false)}>
          <DialogContent className="max-w-md md:max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300 p-4 md:p-6">
            {selectedItem && (
              <div className="flex flex-col gap-3 md:gap-4 overflow-y-auto">
                <DialogHeader className="space-y-1 md:space-y-2 flex-shrink-0">
                  <DialogTitle className="text-lg md:text-2xl font-bold font-[family-name:var(--font-display)]">
                    Personaliza tu pedido
                  </DialogTitle>
                  <DialogDescription className="text-xs md:text-base">
                    {selectedItem.name} - $U {selectedItem.price}
                  </DialogDescription>
                </DialogHeader>

                <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-muted flex-shrink-0">
                  <img
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="space-y-4">
                  {/* Opción de tipo de carne (solo para milanesas si allowMeatType está activado) */}
                  {activeTab === "milanesas" && (selectedItem?.allowMeatType === true) && (
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Tipo de Milanesa *</Label>
                      <RadioGroup
                        value={itemOptions.meatType}
                        onValueChange={(value: "carne" | "pollo") => 
                          setItemOptions({ ...itemOptions, meatType: value })
                        }
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors">
                          <RadioGroupItem value="carne" id="carne" />
                          <Label htmlFor="carne" className="flex-1 cursor-pointer text-sm md:text-base">
                            Milanesa de Carne
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors">
                          <RadioGroupItem value="pollo" id="pollo" />
                          <Label htmlFor="pollo" className="flex-1 cursor-pointer text-sm md:text-base">
                            Milanesa de Pollo
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Opción de mayonesa (para hamburguesas y milanesas) */}
                  {(activeTab === "hamburguesas" || activeTab === "milanesas") && (
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Extras</Label>
                      <div className="flex items-center space-x-3 border rounded-lg p-3">
                        <Checkbox
                          id="mayo"
                          checked={itemOptions.mayo}
                          onCheckedChange={(checked) => 
                            setItemOptions({ ...itemOptions, mayo: checked as boolean })
                          }
                        />
                        <Label htmlFor="mayo" className="flex-1 cursor-pointer text-sm md:text-base">
                          Agregar mayonesa
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Selección de hamburguesa y bebida para promos */}
                  {isPromo && (
                    <div className="space-y-4">
                      {(selectedItem?.allowBurgerChoice === true) && (
                        <div className="space-y-2">
                          <Label className="text-base font-semibold">Elegí tu Hamburguesa *</Label>
                          <Select
                            value={itemOptions.selectedBurger}
                            onValueChange={(value) => setItemOptions({ ...itemOptions, selectedBurger: value })}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona una hamburguesa" />
                            </SelectTrigger>
                            <SelectContent 
                              className="z-[10002] max-h-[200px]" 
                              position="popper"
                              sideOffset={4}
                              align="start"
                            >
                              {menuData?.hamburguesas?.map((burger: any) => (
                                <SelectItem 
                                  key={burger.id} 
                                  value={burger.id}
                                  className="cursor-pointer py-3 px-3 border-b border-gray-200 hover:bg-gray-100 focus:bg-gray-100 data-[state=checked]:bg-orange-100 data-[state=checked]:text-gray-900 data-[state=checked]:font-semibold"
                                >
                                  {burger.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {(selectedItem?.allowDrinkChoice === true) && (
                        <div className="space-y-2">
                          <Label className="text-base font-semibold">Elegí tu Bebida *</Label>
                          <Select
                            value={itemOptions.selectedDrink}
                            onValueChange={(value) => setItemOptions({ ...itemOptions, selectedDrink: value })}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona una bebida" />
                            </SelectTrigger>
                            <SelectContent 
                              className="z-[10002] max-h-[200px]" 
                              position="popper"
                              sideOffset={4}
                              align="start"
                            >
                              {menuData?.bebidas?.map((drink: any) => (
                                <SelectItem 
                                  key={drink.id} 
                                  value={drink.id}
                                  className="cursor-pointer py-3 px-3 border-b border-gray-200 hover:bg-gray-100 focus:bg-gray-100 data-[state=checked]:bg-orange-100 data-[state=checked]:text-gray-900 data-[state=checked]:font-semibold"
                                >
                                  {drink.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Opción de comentarios especiales */}
                  {(activeTab === "hamburguesas" || activeTab === "milanesas") && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => setShowComments(!showComments)}
                      >
                        <Checkbox
                          id="comments"
                          checked={showComments}
                          onCheckedChange={(checked) => setShowComments(checked as boolean)}
                          className="transition-transform duration-300 data-[state=checked]:scale-110"
                        />
                        <Label htmlFor="comments" className="flex-1 cursor-pointer text-sm md:text-base">
                          Agregar comentarios especiales
                        </Label>
                      </div>
                      
                      {/* Campo de comentarios con animación */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          showComments ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <textarea
                          value={itemOptions.comments || ""}
                          onChange={(e) => setItemOptions({ ...itemOptions, comments: e.target.value })}
                          placeholder="Ej: Sin cebolla, extra queso, sin tomate..."
                          className="w-full min-h-[80px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                          disabled={!showComments}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowOptionsModal(false)}
                    className="flex-1 text-sm md:text-base py-2 md:py-3"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button
                    onClick={confirmAddToCart}
                    className="flex-1 text-sm md:text-base py-2 md:py-3 shadow-md"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar al Carrito
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
