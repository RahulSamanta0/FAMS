"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  Briefcase,
  PieChart,
  Download // Added Download Icon
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const investments = [
  { type: "SIP", name: "HDFC Balanced Advantage Fund", amount: 50000, returns: 12.5, status: "Active" },
  { type: "Mutual Fund", name: "SBI Blue Chip Fund", amount: 75000, returns: 15.2, status: "Active" },
  { type: "Fixed Deposit", name: "State Bank FD - 5 Year", amount: 100000, returns: 6.5, status: "Active" },
  { type: "Stocks", name: "TCS Limited", amount: 35000, returns: -2.3, status: "Hold" },
  { type: "Stocks", name: "Infosys Limited", amount: 40000, returns: 8.7, status: "Active" },
  { type: "PPF", name: "Public Provident Fund", amount: 150000, returns: 7.1, status: "Active" },
]

export default function ClientInvestments() {
  const totalInvestment = investments.reduce((acc, inv) => acc + inv.amount, 0)
  const avgReturns = (investments.reduce((acc, inv) => acc + inv.returns, 0) / investments.length).toFixed(2)

  // --- DYNAMIC DOWNLOAD FUNCTION ---
  const handleDownload = () => {
    // 1. Define Headers
    const headers = ["Type", "Investment Name", "Invested Amount", "Returns (%)", "Status"]
    
    // 2. Format Data Rows
    const rows = investments.map(inv => [
      inv.type,
      `"${inv.name}"`, // Quote strings to handle commas
      inv.amount,
      inv.returns,
      inv.status
    ])

    // 3. Construct CSV String
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")

    // 4. Create Blob and Trigger Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "investment_portfolio.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ClientLayout activeTab="/client/investments">
      <div className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Investment Portfolio
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Overview of your assets, performance, and growth.
          </p>
        </motion.div>

        {/* SUMMARY CARDS */}
        <div className="grid gap-4 md:grid-cols-3">
          
          {/* Total Value */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Wallet className="h-24 w-24 text-blue-600" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">₹{totalInvestment.toLocaleString()}</div>
                <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                  <Briefcase className="h-4 w-4" />
                  <span>Across 6 Instruments</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Average Returns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden border-blue-100 bg-gradient-to-br from-sky-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <TrendingUp className="h-24 w-24 text-sky-600" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider">Avg. Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">+{avgReturns}%</div>
                <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span>Annualized Growth</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Gains */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="relative overflow-hidden border-blue-100 bg-gradient-to-br from-indigo-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <PieChart className="h-24 w-24 text-indigo-600" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Total Gains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">₹32,450</div>
                <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                  <span>Since Inception</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* INVESTMENTS TABLE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* UPDATED: Added Gradient Background to Card */}
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-900 dark:to-slate-900">
            <CardHeader className="border-b border-blue-200/50 dark:border-slate-800 bg-white/40 dark:bg-slate-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-blue-900 dark:text-white">Holdings</CardTitle>
                  <CardDescription className="text-blue-600/80 dark:text-slate-400">Detailed breakdown of your current investments</CardDescription>
                </div>
                
                {/* DYNAMIC DOWNLOAD BUTTON */}
                <Button 
                  onClick={handleDownload}
                  variant="outline" 
                  className="text-blue-600 border-blue-200 bg-white hover:bg-blue-100 dark:bg-slate-900 dark:border-slate-700 dark:text-blue-400"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-white/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Instrument</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right h-12">Invested Value</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right h-12">Returns</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-center h-12 pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((investment, index) => (
                    <TableRow key={index} className="hover:bg-blue-100/40 dark:hover:bg-blue-900/10 transition-colors group border-b border-blue-100/50 dark:border-slate-800">
                      <TableCell className="pl-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-100 text-base">{investment.name}</p>
                          <Badge variant="outline" className="mt-1 text-xs border-blue-200 text-blue-600 bg-white/50 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                            {investment.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-700 dark:text-slate-300 text-base">
                        ₹{investment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={cn(
                          "inline-flex items-center gap-1 font-semibold px-2 py-1 rounded-md text-sm",
                          investment.returns >= 0 
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                            : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        )}>
                          {investment.returns >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {investment.returns >= 0 ? "+" : ""}{investment.returns}%
                        </div>
                      </TableCell>
                      <TableCell className="text-center pr-6">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                          investment.status === "Active" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                            : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                        )}>
                          {investment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </ClientLayout>
  )
}