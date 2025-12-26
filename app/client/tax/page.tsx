"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress" // Assuming you have shadcn progress, or I will use a simple div
import { 
  Calculator, 
  FileText, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle, 
  Wallet, 
  PiggyBank, 
  Receipt, 
  Coins,
  Download
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const tdsBreakdown = [
  { month: "April 2024", tdsAmount: 3800, salary: 75000 },
  { month: "May 2024", tdsAmount: 3800, salary: 80000 },
  { month: "June 2024", tdsAmount: 3800, salary: 75000 },
  { month: "July 2024", tdsAmount: 3800, salary: 75000 },
  { month: "August 2024", tdsAmount: 3800, salary: 75000 },
]

const deductions = [
  { section: "80C", description: "PPF, ELSS, Insurance Premium", amount: 150000, utilized: 150000 },
  { section: "80D", description: "Health Insurance Premium", amount: 25000, utilized: 18000 },
  { section: "80CCD(1B)", description: "NPS Contribution", amount: 50000, utilized: 0 },
  { section: "HRA", description: "House Rent Allowance", amount: 120000, utilized: 120000 },
]

/* ---------------- CALCULATIONS ---------------- */

const grossIncome = 900000
const totalDeductions = deductions.reduce((acc, d) => acc + d.utilized, 0)
const taxableIncome = grossIncome - totalDeductions
const estimatedTax = 45600

const totalTdsDeducted = tdsBreakdown.reduce((acc, t) => acc + t.tdsAmount, 0)
const tdsStatus = totalTdsDeducted >= estimatedTax ? "On Track" : "Shortfall"

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

export default function ClientTax() {
  return (
    <ClientLayout activeTab="/client/tax">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >

      

        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
          
          {/* Gross Income */}
          <Card className="relative overflow-hidden border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Wallet className="h-16 w-16 text-blue-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Gross Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{grossIncome.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Annual Projected</p>
            </CardContent>
          </Card>

          {/* Deductions */}
          <Card className="relative overflow-hidden border-emerald-100 bg-gradient-to-br from-emerald-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <PiggyBank className="h-16 w-16 text-emerald-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Deductions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                ₹{totalDeductions.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Total Exemptions</p>
            </CardContent>
          </Card>

          {/* Taxable Income */}
          <Card className="relative overflow-hidden border-indigo-100 bg-gradient-to-br from-indigo-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Coins className="h-16 w-16 text-indigo-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Taxable Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                ₹{taxableIncome.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">After Deductions</p>
            </CardContent>
          </Card>

          {/* Estimated Tax */}
          <Card className="relative overflow-hidden border-red-100 bg-gradient-to-br from-red-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Receipt className="h-16 w-16 text-red-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">Est. Tax</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                ₹{estimatedTax.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">FY 2024-25</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* TABS */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="estimate" className="space-y-6">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-xl">
              <TabsTrigger value="estimate" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                <Calculator className="mr-2 h-4 w-4" />
                Estimated Tax
              </TabsTrigger>
              <TabsTrigger value="deductions" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                <TrendingDown className="mr-2 h-4 w-4" />
                Eligible Deductions
              </TabsTrigger>
              <TabsTrigger value="tds" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                <FileText className="mr-2 h-4 w-4" />
                TDS Status
              </TabsTrigger>
            </TabsList>

            {/* Estimated Tax Calculation */}
            <TabsContent value="estimate">
              <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-900 dark:to-slate-900">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100">Estimated Tax Calculation</CardTitle>
                  <CardDescription className="text-blue-600/80 dark:text-slate-400">
                    Tax estimation based on current income and deductions (Old Regime)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Income Card */}
                    <div className="bg-white/60 dark:bg-slate-800/50 p-6 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-blue-100 dark:border-slate-700 pb-3">
                        <span className="text-slate-600 dark:text-slate-400">Gross Income</span>
                        <span className="font-semibold text-lg">₹{grossIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-blue-100 dark:border-slate-700 pb-3">
                        <span className="text-slate-600 dark:text-slate-400">Total Deductions</span>
                        <span className="font-semibold text-lg text-green-600">- ₹{totalDeductions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-bold text-slate-800 dark:text-white">Taxable Income</span>
                        <span className="font-bold text-xl text-blue-700 dark:text-blue-300">₹{taxableIncome.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Tax Card */}
                    <div className="bg-white/60 dark:bg-slate-800/50 p-6 rounded-2xl border border-red-100 dark:border-slate-700 shadow-sm flex flex-col justify-center items-center text-center space-y-2">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full mb-2">
                        <Receipt className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Estimated Tax Payable</p>
                      <p className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                        ₹{estimatedTax.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">*Includes Cess & Surcharge</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Eligible Deductions */}
            <TabsContent value="deductions">
              <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                <CardHeader className="bg-blue-50/30 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <TrendingDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-800 dark:text-white">Eligible Deductions</CardTitle>
                      <CardDescription>Track utilized vs remaining deduction limits</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                      <TableRow>
                        <TableHead className="font-semibold h-12 pl-6">Section & Description</TableHead>
                        <TableHead className="text-right font-semibold h-12">Limit</TableHead>
                        <TableHead className="text-right font-semibold h-12">Utilized</TableHead>
                        <TableHead className="text-center font-semibold h-12">Progress</TableHead>
                        <TableHead className="text-center font-semibold h-12 pr-6">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deductions.map((d, i) => {
                        const remaining = d.amount - d.utilized
                        const progress = (d.utilized / d.amount) * 100
                        return (
                          <TableRow key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors border-b border-slate-100 dark:border-slate-800">
                            <TableCell className="pl-6 py-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-800 dark:text-slate-200">{d.section}</span>
                                <span className="text-xs text-slate-500">{d.description}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">₹{d.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-medium text-emerald-600 dark:text-emerald-400">
                              ₹{d.utilized.toLocaleString()}
                            </TableCell>
                            <TableCell className="w-[200px]">
                              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500 rounded-full" 
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-center mt-1 text-slate-400">
                                {progress.toFixed(0)}% Used
                              </p>
                            </TableCell>
                            <TableCell className="text-center pr-6">
                              {remaining === 0 ? (
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200">
                                  Maxed Out
                                </Badge>
                              ) : remaining === d.amount ? (
                                <Badge variant="outline" className="text-slate-500">Unused</Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">Partial</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TDS Status */}
            <TabsContent value="tds">
              <div className="grid gap-6">
                
                {/* Status Banner */}
                <Card className={cn(
                  "border-l-4 shadow-sm",
                  tdsStatus === "On Track" ? "border-l-green-500 border-y-green-100 border-r-green-100 bg-green-50/50" : "border-l-red-500 border-y-red-100 border-r-red-100 bg-red-50/50"
                )}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-3 rounded-full", tdsStatus === "On Track" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                        {tdsStatus === "On Track" ? <CheckCircle className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">TDS Deduction Status: {tdsStatus}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Total Deducted: <span className="font-semibold">₹{totalTdsDeducted.toLocaleString()}</span> vs Estimated: <span className="font-semibold">₹{estimatedTax.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                      <Download className="mr-2 h-4 w-4" /> Form 16
                    </Button>
                  </CardContent>
                </Card>

                {/* Breakdown Table */}
                <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-800 dark:text-white">Monthly Breakdown</CardTitle>
                        <CardDescription>Detailed record of TDS deducted from salary</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                        <TableRow>
                          <TableHead className="font-semibold pl-6 h-12">Month</TableHead>
                          <TableHead className="text-right font-semibold h-12">Gross Salary</TableHead>
                          <TableHead className="text-right font-semibold h-12">TDS Deducted</TableHead>
                          <TableHead className="text-right font-semibold pr-6 h-12">Net Pay</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tdsBreakdown.map((t, i) => (
                          <TableRow key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors border-b border-slate-100 dark:border-slate-800">
                            <TableCell className="pl-6 py-4 font-medium text-slate-700 dark:text-slate-300">{t.month}</TableCell>
                            <TableCell className="text-right text-slate-600 dark:text-slate-400">₹{t.salary.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-medium text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10 rounded-md">
                              - ₹{t.tdsAmount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right pr-6 font-bold text-slate-900 dark:text-white">
                              ₹{(t.salary - t.tdsAmount).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

      </motion.div>
    </ClientLayout>
  )
}