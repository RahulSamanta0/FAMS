"use client"

import { useState } from "react"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
  Plus,
  Home,
  Car,
  Gem,
  Upload,
  FileText,
  TrendingUp,
} from "lucide-react"

/* ---------------- MOCK DATA ---------------- */

const immovableAssets = [
  {
    type: "Residential House",
    location: "Bangalore, Karnataka",
    ownership: "Self",
    value: 8500000,
    year: 2018,
    appreciation: [
      { year: 2018, value: 6200000 },
      { year: 2020, value: 7000000 },
      { year: 2022, value: 7800000 },
      { year: 2024, value: 8500000 },
    ],
  },
]

const movableAssets = [
  {
    type: "Car",
    description: "Hyundai Creta",
    category: "Vehicle",
    value: 1200000,
  },
  {
    type: "Gold",
    description: "Gold Jewellery (250g)",
    category: "Precious Metal",
    value: 1600000,
  },
]

/* ---------------- COMPONENT ---------------- */

export default function ClientAssets() {
  const [documents, setDocuments] = useState<File[]>([])

  const totalImmovable = immovableAssets.reduce((acc, a) => acc + a.value, 0)
  const totalMovable = movableAssets.reduce((acc, a) => acc + a.value, 0)
  const totalAssets = totalImmovable + totalMovable

  return (
    <ClientLayout activeTab="/client/assets">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Assets</h1>
            <p className="text-muted-foreground">
              Property documents and asset growth tracking
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Asset Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{totalAssets.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Immovable Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ₹{totalImmovable.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Movable Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{totalMovable.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Immovable Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Immovable Assets
            </CardTitle>
            <CardDescription>
              Land and property owned by you
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Ownership</TableHead>
                  <TableHead>Acquired</TableHead>
                  <TableHead className="text-right">Current Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {immovableAssets.map((asset, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{asset.type}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{asset.ownership}</Badge>
                    </TableCell>
                    <TableCell>{asset.year}</TableCell>
                    <TableCell className="text-right">
                      ₹{asset.value.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Property Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Property Documents</CardTitle>
            <CardDescription>
              Upload sale deed, registration, or property papers (PDF)
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-muted-foreground hover:border-primary">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (!e.target.files) return
                  setDocuments((prev) => [
                    ...prev,
                    ...Array.from(e.target.files),
                  ])
                }}
              />
              <Upload className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">
                Upload Property Document (PDF)
              </span>
            </label>

            {documents.length > 0 && (
              <ul className="space-y-2">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    {doc.name}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Asset Appreciation Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Asset Appreciation Tracking
            </CardTitle>
            <CardDescription>
              Year-wise property value growth
            </CardDescription>
          </CardHeader>

          <CardContent>
            {immovableAssets.map((asset, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium">{asset.type}</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Estimated Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asset.appreciation.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.year}</TableCell>
                        <TableCell className="text-right">
                          ₹{item.value.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Movable Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Movable Assets
            </CardTitle>
            <CardDescription>
              Vehicles, gold, and other valuables
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movableAssets.map((asset, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{asset.type}</TableCell>
                    <TableCell>{asset.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{asset.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{asset.value.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </ClientLayout>
  )
}
