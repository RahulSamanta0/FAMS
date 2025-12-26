"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Home,
  Car,
  Gem,
  Banknote,
  Archive,
  Plus,
  X,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Briefcase,
  Layers,
  Trash2, // Delete Icon
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- INTERFACES ---------------- */

interface AssetForm {
  id: string
  category: "physical" | "other" | ""
  assetType: string
  propertyType: string
  vehicleType: string
  model: string
  purchaseYear: string
  purchaseValue: string
  currentValue: string
  location: string
  description: string
}

export default function AssetDeclarationPage() {
  const [showForm, setShowForm] = useState(false)
  const [assets, setAssets] = useState<AssetForm[]>([])
  const [loading, setLoading] = useState(true)

  // 1. LOAD DATA ON MOUNT
  useEffect(() => {
    const savedData = localStorage.getItem("asset_declaration_data")
    if (savedData) {
      setAssets(JSON.parse(savedData))
    }
    setLoading(false)
  }, [])

  // 2. SAVE DATA HELPER
  const updateLocalStorage = (updatedList: AssetForm[]) => {
    localStorage.setItem("asset_declaration_data", JSON.stringify(updatedList))
    setAssets(updatedList)
  }

  const [asset, setAsset] = useState<Omit<AssetForm, "id">>({
    category: "",
    assetType: "",
    propertyType: "",
    vehicleType: "",
    model: "",
    purchaseYear: "",
    purchaseValue: "",
    currentValue: "",
    location: "",
    description: "",
  })

  const handleChange = (field: keyof Omit<AssetForm, "id">, value: string) => {
    setAsset({ ...asset, [field]: value })
  }

  const handleTypeSelect = (value: string) => {
    let category: "physical" | "other" = "other"
    if (["real_estate", "vehicle"].includes(value)) {
      category = "physical"
    }
    setAsset({ ...asset, assetType: value, category })
  }

  const resetForm = () => {
    setAsset({
      category: "",
      assetType: "",
      propertyType: "",
      vehicleType: "",
      model: "",
      purchaseYear: "",
      purchaseValue: "",
      currentValue: "",
      location: "",
      description: "",
    })
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAsset = { ...asset, id: Date.now().toString() }
    const updatedList = [...assets, newAsset]
    updateLocalStorage(updatedList)
    resetForm()
  }

  const handleDelete = (id: string) => {
    const updatedList = assets.filter(a => a.id !== id)
    updateLocalStorage(updatedList)
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "real_estate": return <Home className="h-4 w-4" />
      case "vehicle": return <Car className="h-4 w-4" />
      case "gold":
      case "jewelry": return <Gem className="h-4 w-4" />
      case "cash": return <Banknote className="h-4 w-4" />
      default: return <Archive className="h-4 w-4" />
    }
  }

  if (loading) return null

  return (
    <ClientLayout activeTab="/client/data_entry/asset_declaration">
      <div className="space-y-8 max-w-6xl mx-auto pb-10 px-4 md:px-0">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Asset Declaration
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Declare your physical and financial assets for transparency.
            </p>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className={cn(
              "shadow-lg transition-all duration-300",
              showForm 
                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400" 
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
            )}
          >
            {showForm ? (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel Adding
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Asset
              </>
            )}
          </Button>
        </motion.div>

        {/* ================= ADD ASSET FORM ================= */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Card className="border-blue-100 shadow-md bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-950 dark:to-slate-900 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Briefcase className="h-5 w-5" />
                    New Asset Details
                  </CardTitle>
                  <CardDescription>
                    Fill in the details regarding your property, vehicle, or valuables.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Primary Selection */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Asset Type</Label>
                        <Select onValueChange={handleTypeSelect}>
                          <SelectTrigger className="bg-white dark:bg-slate-900 h-11">
                            <SelectValue placeholder="Select Category & Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Physical Assets</SelectLabel>
                              <SelectItem value="real_estate">🏠 Real Estate (Land/Building)</SelectItem>
                              <SelectItem value="vehicle">🚗 Vehicle (Car/Bike)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Other Assets</SelectLabel>
                              <SelectItem value="gold">🏆 Gold / Silver</SelectItem>
                              <SelectItem value="jewelry">💎 Jewelry</SelectItem>
                              <SelectItem value="cash">💵 Cash in Hand</SelectItem>
                              <SelectItem value="collectible">🖼️ Collectibles</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Conditional Fields */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      
                      {/* --- REAL ESTATE FIELDS --- */}
                      {asset.assetType === "real_estate" && (
                        <>
                          <div className="space-y-2">
                            <Label>Property Type</Label>
                            <Input 
                              placeholder="e.g. Apartment, Agricultural Land" 
                              className="bg-white dark:bg-slate-900"
                              value={asset.propertyType}
                              onChange={(e) => handleChange("propertyType", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <Input 
                                className="pl-9 bg-white dark:bg-slate-900" 
                                placeholder="City / Address"
                                value={asset.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Purchase Value (₹)</Label>
                            <Input 
                              type="number" 
                              className="bg-white dark:bg-slate-900" 
                              value={asset.purchaseValue}
                              onChange={(e) => handleChange("purchaseValue", e.target.value)}
                            />
                          </div>
                        </>
                      )}

                      {/* --- VEHICLE FIELDS --- */}
                      {asset.assetType === "vehicle" && (
                        <>
                          <div className="space-y-2">
                            <Label>Vehicle Type</Label>
                            <Input 
                              placeholder="e.g. SUV, Sedan, Bike" 
                              className="bg-white dark:bg-slate-900"
                              value={asset.vehicleType}
                              onChange={(e) => handleChange("vehicleType", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Model Name</Label>
                            <Input 
                              placeholder="e.g. Honda City" 
                              className="bg-white dark:bg-slate-900"
                              value={asset.model}
                              onChange={(e) => handleChange("model", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Purchase Year</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <Input 
                                type="number"
                                className="pl-9 bg-white dark:bg-slate-900" 
                                placeholder="YYYY"
                                value={asset.purchaseYear}
                                onChange={(e) => handleChange("purchaseYear", e.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- UNIVERSAL: CURRENT VALUE --- */}
                      {asset.assetType && (
                        <div className="space-y-2">
                          <Label className="text-blue-600 dark:text-blue-400">Current Market Value (₹)</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                            <Input 
                              type="number" 
                              className="pl-9 bg-white dark:bg-slate-900 border-blue-200 focus-visible:ring-blue-500" 
                              placeholder="0.00"
                              value={asset.currentValue}
                              onChange={(e) => handleChange("currentValue", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* --- DESCRIPTION (Universal) --- */}
                    {asset.assetType && (
                      <div className="space-y-2">
                        <Label>Description / Notes</Label>
                        <Textarea 
                          placeholder="Add any extra details..." 
                          className="bg-white dark:bg-slate-900"
                          value={asset.description}
                          onChange={(e) => handleChange("description", e.target.value)}
                        />
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto" disabled={!asset.assetType}>
                        Save Asset
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="w-full md:w-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= DATA TABLE VIEW ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {assets.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 dark:border-slate-800">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <Layers className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                No Assets Declared
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 mb-6">
                Add your real estate, vehicles, or other valuable assets to maintain a complete profile.
              </p>
              <Button onClick={() => setShowForm(true)} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Declare First Asset
              </Button>
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#0f172a] overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="w-[200px] font-semibold text-slate-700 dark:text-slate-200">Asset Type</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Details</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Values (₹)</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Location / Description</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((a) => (
                    <TableRow key={a.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                      
                      {/* Asset & Category */}
                      <TableCell className="align-top py-4">
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2 rounded-lg mt-1", 
                             a.category === "physical" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20" : "bg-amber-50 text-amber-600 dark:bg-amber-900/20"
                          )}>
                            {getAssetIcon(a.assetType)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100 capitalize">{a.assetType.replace("_", " ")}</p>
                            <Badge variant="outline" className="mt-1 text-xs border-slate-200 text-slate-500 dark:border-slate-700">
                              {a.category}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>

                      {/* Specific Details */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          {a.assetType === "real_estate" && (
                            <>
                              <p className="font-medium text-slate-700 dark:text-slate-300">{a.propertyType}</p>
                              {/* Add more real estate specific text if needed */}
                            </>
                          )}
                          {a.assetType === "vehicle" && (
                            <>
                              <p className="font-medium text-slate-700 dark:text-slate-300">{a.model}</p>
                              <p className="text-xs">Type: {a.vehicleType}</p>
                              {a.purchaseYear && <p className="text-xs">Year: {a.purchaseYear}</p>}
                            </>
                          )}
                          {!["real_estate", "vehicle"].includes(a.assetType) && (
                             <span className="text-slate-400 italic text-xs">General Asset</span>
                          )}
                        </div>
                      </TableCell>

                      {/* Values */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1">
                          <div>
                            <span className="text-xs text-slate-400 block">Current</span>
                            <span className="font-bold text-slate-900 dark:text-white">₹ {a.currentValue || "0"}</span>
                          </div>
                          {a.purchaseValue && (
                            <div>
                              <span className="text-xs text-slate-400 block">Purchase</span>
                              <span className="text-sm text-slate-600 dark:text-slate-400">₹ {a.purchaseValue}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Location / Desc */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 max-w-[200px]">
                          {a.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3 w-3 text-slate-400" />
                              <span className="truncate">{a.location}</span>
                            </div>
                          )}
                          {a.description && (
                            <p className="text-xs italic text-slate-500 line-clamp-2 mt-1">"{a.description}"</p>
                          )}
                          {!a.location && !a.description && <span className="text-slate-400">-</span>}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="align-top py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(a.id)}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>
    </ClientLayout>
  )
}