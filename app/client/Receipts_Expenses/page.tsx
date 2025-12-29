"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { 
  Plus, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Receipt,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const monthlyIncome = [
  { source: "Salary", amount: 90000, mode: "Bank" },
  { source: "Freelance", amount: 12000, mode: "Cash" },
]

const expenses = [
  { category: "Rent", description: "House Rent", amount: 25000, mode: "Bank" },
  { category: "Groceries", description: "Monthly groceries", amount: 8200, mode: "Cash" },
  { category: "Utilities", description: "Electricity & Internet", amount: 4300, mode: "Bank" },
  { category: "Transport", description: "Fuel & travel", amount: 3500, mode: "Cash" },
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

/* ---------------- COMPONENT ---------------- */

export default function ReceiptsAndExpenses() {
  // Manual entry state
  const [manualEntry, setManualEntry] = useState({
    type: "expense",
    category: "",
    description: "",
    amount: "",
    mode: "Cash"
  })

  const totalIncome = monthlyIncome.reduce((acc, i) => acc + i.amount, 0)
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0)
  const savings = totalIncome - totalExpenses

  return (
    <ClientLayout activeTab="/client/Receipts_Expenses">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >

        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
          
          {/* Total Income */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-400 to-teal-500 hover:shadow-xl transition-all duration-300 rounded-3xl p-4">
            <CardContent className="p-0 flex flex-col items-start justify-between h-full">
              <div className="mb-4 p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="w-full">
                <p className="text-white/80 text-xs font-medium mb-1 uppercase tracking-wider">Total Income</p>
                <p className="text-white text-xl font-bold mb-1">₹{totalIncome.toLocaleString()}</p>
                <p className="text-white/90 text-xs font-medium">This month</p>
              </div>
            </CardContent>
          </Card>

          {/* Total Expenses */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-400 to-amber-500 hover:shadow-xl transition-all duration-300 rounded-3xl p-4">
            <CardContent className="p-0 flex flex-col items-start justify-between h-full">
              <div className="mb-4 p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
                <TrendingDown className="h-5 w-5 text-white" />
              </div>
              <div className="w-full">
                <p className="text-white/80 text-xs font-medium mb-1 uppercase tracking-wider">Total Expenses</p>
                <p className="text-white text-xl font-bold mb-1">₹{totalExpenses.toLocaleString()}</p>
                <p className="text-white/90 text-xs font-medium">This month</p>
              </div>
            </CardContent>
          </Card>

          {/* Net Savings */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-400 to-purple-600 hover:shadow-xl transition-all duration-300 rounded-3xl p-4">
            <CardContent className="p-0 flex flex-col items-start justify-between h-full">
              <div className="mb-4 p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div className="w-full">
                <p className="text-white/80 text-xs font-medium mb-1 uppercase tracking-wider">Net Savings</p>
                <p className="text-white text-xl font-bold mb-1">
                  ₹{savings.toLocaleString()}
                </p>
                <p className="text-white/90 text-xs font-medium">
                  {savings >= 0 ? "Great savings!" : "Budget deficit"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* MONTHLY INCOME TABLE */}
        <motion.div variants={itemVariants}>
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">Monthly Income</CardTitle>
                  <CardDescription className="text-slate-500">Income received this month</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Source</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Mode</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right pr-6 h-12">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyIncome.map((income, index) => (
                    <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                      <TableCell className="pl-6 py-4">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{income.source}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                          {income.mode}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="inline-flex items-center gap-1 font-bold text-green-600 dark:text-green-400">
                          <ArrowUpRight className="h-3 w-3" />
                          +₹{income.amount.toLocaleString()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* EXPENSE CATEGORIZATION TABLE */}
        <motion.div variants={itemVariants}>
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Receipt className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">Expense Categorization</CardTitle>
                  <CardDescription className="text-slate-500">Categorized monthly expenses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Category</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Description</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Mode</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right pr-6 h-12">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense, index) => (
                    <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                      <TableCell className="pl-6 py-4">
                        <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 border-indigo-100 dark:border-indigo-800">
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {expense.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400">
                          {expense.mode}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="inline-flex items-center gap-1 font-bold text-red-600 dark:text-red-400">
                          <ArrowDownLeft className="h-3 w-3" />
                          -₹{expense.amount.toLocaleString()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* CASH & MANUAL ENTRIES */}
        <motion.div variants={itemVariants}>
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Wallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">Cash & Manual Entries</CardTitle>
                  <CardDescription className="text-slate-500">Add manual income or expense entries</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Transaction Type</Label>
                    <Select 
                      value={manualEntry.type} 
                      onValueChange={(value) => setManualEntry({...manualEntry, type: value})}
                    >
                      <SelectTrigger id="type" className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Salary, Rent, Food"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      value={manualEntry.category}
                      onChange={(e) => setManualEntry({...manualEntry, category: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Enter details"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      value={manualEntry.description}
                      onChange={(e) => setManualEntry({...manualEntry, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      value={manualEntry.amount}
                      onChange={(e) => setManualEntry({...manualEntry, amount: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Payment Mode</Label>
                    <Select 
                      value={manualEntry.mode} 
                      onValueChange={(value) => setManualEntry({...manualEntry, mode: value})}
                    >
                      <SelectTrigger id="mode" className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank">Bank</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 dark:shadow-none transition-all">
                  <Plus className="mr-2 h-4 w-4" />
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </ClientLayout>
  )
}