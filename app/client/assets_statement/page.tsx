"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Home,
  Car,
  Gem,
  TrendingUp,
  Briefcase,
  MapPin,
  Calendar,
  Layers
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA (UNCHANGED) ---------------- */

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

/* ---------------- ANIMATION VARIANTS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ClientAssets() {
  const [documents, setDocuments] = useState<File[]>([])

  const totalImmovable = immovableAssets.reduce((acc, a) => acc + a.value, 0)
  const totalMovable = movableAssets.reduce((acc, a) => acc + a.value, 0)
  const totalAssets = totalImmovable + totalMovable

  return (
    <ClientLayout activeTab="/client/assets_statement">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >


        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
          
          {/* Total Net Worth */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-400 to-blue-600 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Briefcase className="h-24 w-24 text-white" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Total Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">₹{totalAssets.toLocaleString()}</div>
              <p className="text-xs text-white/90 mt-1">Combined Asset Value</p>
            </CardContent>
          </Card>

          {/* Immovable Total */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-400 to-teal-500 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Home className="h-24 w-24 text-white" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Immovable Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                ₹{totalImmovable.toLocaleString()}
              </div>
              <p className="text-xs text-white/90 mt-1">Real Estate & Land</p>
            </CardContent>
          </Card>

          {/* Movable Total */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-400 to-purple-600 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Car className="h-24 w-24 text-white" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Movable Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                ₹{totalMovable.toLocaleString()}
              </div>
              <p className="text-xs text-white/90 mt-1">Vehicles & Valuables</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* IMMOVABLE ASSETS SECTION */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
          
          {/* Asset Details Table */}
          <Card className="md:col-span-2 border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Home className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">Immovable Assets</CardTitle>
                  <CardDescription className="text-slate-500">Property details and valuation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Asset & Location</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Ownership</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Acquired</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right pr-6 h-12">Current Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {immovableAssets.map((asset, index) => (
                    <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                      <TableCell className="pl-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{asset.type}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                            <MapPin className="h-3 w-3" />
                            {asset.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-indigo-200 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800">
                          {asset.ownership}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="h-3.5 w-3.5" />
                          {asset.year}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6 font-bold text-slate-800 dark:text-white">
                        ₹{asset.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Appreciation Chart (Visualizing the data) */}
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Value Growth
              </CardTitle>
              <CardDescription>Property appreciation trend</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={immovableAssets[0].appreciation}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => [`₹${(value/100000).toFixed(1)} L`, 'Value']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* ASSET APPRECIATION TABLE (Existing Data Presentation) */}
        {/* Keeping this as a table per request to keep data same, styling it nicely */}
        <motion.div variants={itemVariants}>
           <Card className="border-blue-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
             <CardHeader className="bg-blue-50/30 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
               <CardTitle className="text-lg">Detailed Appreciation History</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
               <Table>
                 <TableHeader className="bg-blue-50/50">
                   <TableRow>
                     <TableHead className="pl-6 h-10">Year</TableHead>
                     <TableHead className="text-right h-10 pr-6">Estimated Value</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {immovableAssets[0].appreciation.map((item, i) => (
                     <TableRow key={i} className="border-b border-slate-50">
                       <TableCell className="pl-6 font-medium text-slate-600">{item.year}</TableCell>
                       <TableCell className="text-right pr-6 font-mono text-slate-700">₹{item.value.toLocaleString()}</TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
           </Card>
        </motion.div>

        {/* MOVABLE ASSETS SECTION */}
        <motion.div variants={itemVariants}>
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                  <Layers className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">Movable Assets</CardTitle>
                  <CardDescription className="text-slate-500">Vehicles, gold, and other valuables</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Asset Type</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Description</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Category</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right pr-6 h-12">Estimated Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movableAssets.map((asset, index) => (
                    <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                            {asset.type === "Car" ? <Car className="h-4 w-4 text-slate-600" /> : <Gem className="h-4 w-4 text-amber-500" />}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{asset.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {asset.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {asset.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 font-bold text-green-600 dark:text-green-400">
                        ₹{asset.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </ClientLayout>
  )
}