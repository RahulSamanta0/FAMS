"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ClientLayout } from "@/components/client-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AssetForm {
  category: string
  assetType: string
  propertyType: string
  vehicleType: string
  model: string
  purchaseYear: string
  purchaseValue: string
  currentValue: string
  ownership: string
  location: string
  description: string
}

export default function AssetDeclarationPage() {
  const [showForm, setShowForm] = useState(false)
  const [assets, setAssets] = useState<AssetForm[]>([])
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string>("")

  const [asset, setAsset] = useState<AssetForm>({
    category: "",
    assetType: "",
    propertyType: "",
    vehicleType: "",
    model: "",
    purchaseYear: "",
    purchaseValue: "",
    currentValue: "",
    ownership: "",
    location: "",
    description: "",
  })

  const handleChange = (field: keyof AssetForm, value: string) => {
    setAsset({ ...asset, [field]: value })
  }

  const handleCategorySelect = (category: string, assetType: string) => {
    setAsset({ ...asset, category, assetType })
    setShowCategoryMenu(false)
    setHoveredCategory("")
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
      ownership: "",
      location: "",
      description: "",
    })
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAssets([...assets, asset])
    resetForm()
  }

  return (
    <ClientLayout activeTab="/client/data_entry/asset_declaration">
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Asset Declaration
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              View and manage your declared assets
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            + Add Asset
          </Button>
        </div>

        {/* Add Asset Form (Dynamic) */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Asset</CardTitle>
              <CardDescription>Enter your asset details</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Category & Asset Type - Cascading Menu */}
                  <div className="space-y-2 md:col-span-2">
                    <Label>Select Asset Category & Type</Label>
                    <div className="relative">
                      <div
                        onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white cursor-pointer hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950"
                      >
                        <span className={asset.category ? "text-slate-900 dark:text-white" : "text-slate-500"}>
                          {asset.category && asset.assetType
                            ? `${asset.category === "physical" ? "🏠 Physical Asset" : "💎 Other Asset"} - ${
                                asset.assetType === "real_estate" ? "Real Estate" :
                                asset.assetType === "vehicle" ? "Vehicle" :
                                asset.assetType === "gold" ? "Gold / Silver" :
                                asset.assetType === "jewelry" ? "Jewelry" :
                                asset.assetType === "cash" ? "Cash in Hand" :
                                asset.assetType === "collectible" ? "Collectible" : ""
                              }`
                            : "Select category and type"}
                        </span>
                        <svg
                          className="h-4 w-4 opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Cascading Dropdown Menu */}
                      {showCategoryMenu && (
                        <div className="absolute z-50 mt-1 flex rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950">
                          {/* Categories Column */}
                          <div className="w-48 border-r border-slate-200 dark:border-slate-800">
                            <div
                              className="relative px-4 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              onMouseEnter={() => setHoveredCategory("physical")}
                            >
                              <div className="flex items-center justify-between">
                                <span>🏠 Physical Asset</span>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                            <div
                              className="relative px-4 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              onMouseEnter={() => setHoveredCategory("other")}
                            >
                              <div className="flex items-center justify-between">
                                <span>💎 Other Asset</span>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Asset Types Column */}
                          <div className="w-48">
                            {hoveredCategory === "physical" && (
                              <>
                                <div
                                  className="px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                                  onClick={() => handleCategorySelect("physical", "real_estate")}
                                >
                                  Real Estate
                                </div>
                                <div
                                  className="px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                                  onClick={() => handleCategorySelect("physical", "vehicle")}
                                >
                                  Vehicle
                                </div>
                              </>
                            )}
                            {hoveredCategory === "other" && (
                              <>
                                <div
                                  className="px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                                  onClick={() => handleCategorySelect("other", "gold")}
                                >
                                  Gold / Silver
                                </div>
                                <div
                                  className="px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                                  onClick={() => handleCategorySelect("other", "jewelry")}
                                >
                                  Jewelry
                                </div>
                                <div
                                  className="px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                                  onClick={() => handleCategorySelect("other", "cash")}
                                >
                                  Cash in Hand
                                </div>
                                <div
                                  className="px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                                  onClick={() => handleCategorySelect("other", "collectible")}
                                >
                                  Collectible
                                </div>
                              </>
                            )}
                            {!hoveredCategory && (
                              <div className="px-4 py-3 text-sm text-slate-400 text-center">
                                Hover over a category
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Real Estate Fields */}
                  {asset.assetType === "real_estate" && (
                    <>
                      <div className="space-y-2">
                        <Label>Property Type</Label>
                        <Input
                          placeholder="House / Plot / Land"
                          value={asset.propertyType}
                          onChange={(e) =>
                            handleChange("propertyType", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={asset.location}
                          onChange={(e) =>
                            handleChange("location", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Purchase Value (₹)</Label>
                        <Input
                          type="number"
                          value={asset.purchaseValue}
                          onChange={(e) =>
                            handleChange("purchaseValue", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Current Market Value (₹)</Label>
                        <Input
                          type="number"
                          value={asset.currentValue}
                          onChange={(e) =>
                            handleChange("currentValue", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {/* Vehicle Fields */}
                  {asset.assetType === "vehicle" && (
                    <>
                      <div className="space-y-2">
                        <Label>Vehicle Type</Label>
                        <Input
                          placeholder="Car / Bike"
                          value={asset.vehicleType}
                          onChange={(e) =>
                            handleChange("vehicleType", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Model</Label>
                        <Input
                          value={asset.model}
                          onChange={(e) =>
                            handleChange("model", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Purchase Year</Label>
                        <Input
                          type="number"
                          value={asset.purchaseYear}
                          onChange={(e) =>
                            handleChange("purchaseYear", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Current Value (₹)</Label>
                        <Input
                          type="number"
                          value={asset.currentValue}
                          onChange={(e) =>
                            handleChange("currentValue", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {/* Other Asset */}
                  {asset.category === "other" && (
                    <div className="space-y-2">
                      <Label>Estimated Value (₹)</Label>
                      <Input
                        type="number"
                        value={asset.currentValue}
                        onChange={(e) =>
                          handleChange("currentValue", e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={asset.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-blue-600">
                    Save Asset
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Assets List */}
        <Card>
          <CardHeader>
            <CardTitle>Assets List</CardTitle>
            <CardDescription>Declared assets</CardDescription>
          </CardHeader>
          <CardContent>
            {assets.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                No assets declared yet
              </p>
            ) : (
              <div className="space-y-4">
                {assets.map((a, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-4 flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">
                        {a.assetType} ({a.category})
                      </p>
                      <p className="text-sm text-slate-500">
                        ₹ {a.currentValue || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
