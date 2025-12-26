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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
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
  TrendingUp,
  PieChart,
  Landmark,
  BarChart3,
  ShieldCheck,
  Coins,
  FileText,
  Calendar,
  Building2,
  Plus,
  X,
  Wallet,
  ArrowUpRight,
  Trash2, // Delete Icon
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- INTERFACES ---------------- */

interface InvestmentForm {
  id: string
  investmentType: string
  institution: string
  investedAmount: string
  currentValue: string
  startDate: string
  maturityDate: string
  expectedReturns: string
  referenceNumber: string
}

export default function InvestmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [investments, setInvestments] = useState<InvestmentForm[]>([])
  const [loading, setLoading] = useState(true)

  // 1. LOAD DATA ON MOUNT
  useEffect(() => {
    const savedData = localStorage.getItem("investments_data")
    if (savedData) {
      setInvestments(JSON.parse(savedData))
    }
    setLoading(false)
  }, [])

  // 2. SAVE DATA HELPER
  const updateLocalStorage = (updatedList: InvestmentForm[]) => {
    localStorage.setItem("investments_data", JSON.stringify(updatedList))
    setInvestments(updatedList)
  }

  const [investment, setInvestment] = useState<Omit<InvestmentForm, "id">>({
    investmentType: "",
    institution: "",
    investedAmount: "",
    currentValue: "",
    startDate: "",
    maturityDate: "",
    expectedReturns: "",
    referenceNumber: "",
  })

  const handleChange = (field: keyof Omit<InvestmentForm, "id">, value: string) => {
    setInvestment({ ...investment, [field]: value })
  }

  const resetForm = () => {
    setInvestment({
      investmentType: "",
      institution: "",
      investedAmount: "",
      currentValue: "",
      startDate: "",
      maturityDate: "",
      expectedReturns: "",
      referenceNumber: "",
    })
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newInvestment = { ...investment, id: Date.now().toString() }
    const updatedList = [...investments, newInvestment]
    updateLocalStorage(updatedList)
    resetForm()
  }

  const handleDelete = (id: string) => {
    const updatedList = investments.filter(inv => inv.id !== id)
    updateLocalStorage(updatedList)
  }

  // Helper: Get Icon based on Type
  const getIcon = (type: string) => {
    switch (type) {
      case "mutual_fund": return <PieChart className="h-4 w-4" />
      case "stocks": return <BarChart3 className="h-4 w-4" />
      case "fd":
      case "rd": return <Landmark className="h-4 w-4" />
      case "insurance": return <ShieldCheck className="h-4 w-4" />
      case "crypto": return <Coins className="h-4 w-4" />
      default: return <Wallet className="h-4 w-4" />
    }
  }

  // Helper: Get Color Class based on Type
  const getColorClass = (type: string) => {
    switch (type) {
      case "mutual_fund": return "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300"
      case "stocks": return "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
      case "fd":
      case "rd": return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300"
      case "insurance": return "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300"
      case "crypto": return "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300"
      default: return "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300"
    }
  }

  if (loading) return null

  return (
    <ClientLayout activeTab="/client/data_entry/investments">
      <div className="space-y-8 max-w-6xl mx-auto pb-10 px-4 md:px-0">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Investments
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Track your portfolio, deposits, and market investments.
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
                <Plus className="mr-2 h-4 w-4" /> Add Investment
              </>
            )}
          </Button>
        </motion.div>

        {/* ================= ADD FORM ================= */}
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
                    <TrendingUp className="h-5 w-5" />
                    New Investment Entry
                  </CardTitle>
                  <CardDescription>
                    Enter the details of your investment to track performance.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      
                      {/* Type */}
                      <div className="space-y-2">
                        <Label>Investment Type</Label>
                        <Select onValueChange={(v) => handleChange("investmentType", v)}>
                          <SelectTrigger className="bg-white dark:bg-slate-900">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Market Linked</SelectLabel>
                              <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                              <SelectItem value="stocks">Stocks / Shares</SelectItem>
                              <SelectItem value="crypto">Cryptocurrency</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Fixed Income</SelectLabel>
                              <SelectItem value="fd">Fixed Deposit (FD)</SelectItem>
                              <SelectItem value="rd">Recurring Deposit (RD)</SelectItem>
                              <SelectItem value="bonds">Bonds / Debentures</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Long Term</SelectLabel>
                              <SelectItem value="epf">Provident Fund (EPF)</SelectItem>
                              <SelectItem value="ppf">Public Provident Fund (PPF)</SelectItem>
                              <SelectItem value="insurance">Insurance (Life/ULIP)</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Institution */}
                      <div className="space-y-2">
                        <Label>Institution / Fund Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="e.g. SBI, HDFC, LIC"
                            value={investment.institution}
                            onChange={(e) => handleChange("institution", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      {/* Reference No */}
                      <div className="space-y-2">
                        <Label>Folio / Policy No.</Label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="Reference Number"
                            value={investment.referenceNumber}
                            onChange={(e) => handleChange("referenceNumber", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Invested Amount */}
                      <div className="space-y-2">
                        <Label>Invested Amount (₹)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                          <Input 
                            type="number"
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="0.00"
                            value={investment.investedAmount}
                            onChange={(e) => handleChange("investedAmount", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      {/* Current Value */}
                      <div className="space-y-2">
                        <Label>Current Value (₹)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-blue-500 font-bold text-sm">₹</span>
                          <Input 
                            type="number"
                            className="pl-9 bg-white dark:bg-slate-900 border-blue-200" 
                            placeholder="0.00"
                            value={investment.currentValue}
                            onChange={(e) => handleChange("currentValue", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Returns % */}
                      <div className="space-y-2">
                        <Label>Expected Returns (%)</Label>
                        <div className="relative">
                           <ArrowUpRight className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            type="number"
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="e.g. 12"
                            value={investment.expectedReturns}
                            onChange={(e) => handleChange("expectedReturns", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            type="date"
                            className="pl-9 bg-white dark:bg-slate-900" 
                            value={investment.startDate}
                            onChange={(e) => handleChange("startDate", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Maturity Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            type="date"
                            className="pl-9 bg-white dark:bg-slate-900" 
                            value={investment.maturityDate}
                            onChange={(e) => handleChange("maturityDate", e.target.value)}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                        Save Investment
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

        {/* ================= TABLE LIST ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {investments.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 dark:border-slate-800">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <PieChart className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                No Investments Found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 mb-6">
                Add your mutual funds, FDs, or stocks to get a consolidated view of your wealth.
              </p>
              <Button onClick={() => setShowForm(true)} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Create First Entry
              </Button>
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#0f172a] overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="w-[200px] font-semibold text-slate-700 dark:text-slate-200">Type</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Institution & Ref</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Tenure</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Financials</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Returns</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((inv) => (
                    <TableRow key={inv.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                      
                      {/* Type */}
                      <TableCell className="align-top py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2 rounded-lg", getColorClass(inv.investmentType))}>
                            {getIcon(inv.investmentType)}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-slate-100 capitalize">
                            {inv.investmentType.replace("_", " ")}
                          </span>
                        </div>
                      </TableCell>

                      {/* Institution */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{inv.institution}</p>
                          {inv.referenceNumber && (
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <FileText className="h-3 w-3" /> {inv.referenceNumber}
                            </p>
                          )}
                        </div>
                      </TableCell>

                      {/* Tenure */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          {inv.startDate && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-slate-400 w-8">Start:</span>
                              <span>{inv.startDate}</span>
                            </div>
                          )}
                          {inv.maturityDate && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-slate-400 w-8">End:</span>
                              <span>{inv.maturityDate}</span>
                            </div>
                          )}
                          {!inv.startDate && !inv.maturityDate && <span className="text-slate-400">-</span>}
                        </div>
                      </TableCell>

                      {/* Financials */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1">
                          <div className="flex justify-between gap-4 text-sm">
                            <span className="text-slate-500">Inv:</span>
                            <span className="font-medium">₹{inv.investedAmount}</span>
                          </div>
                          <div className="flex justify-between gap-4 text-sm">
                            <span className="text-blue-600 dark:text-blue-400 font-medium">Cur:</span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              ₹{inv.currentValue || inv.investedAmount}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Returns */}
                      <TableCell className="align-top py-4">
                        {inv.expectedReturns ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            {inv.expectedReturns}%
                          </Badge>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </TableCell>

                      {/* Action */}
                      <TableCell className="align-top py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(inv.id)}
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