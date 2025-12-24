"use client"

import { useState } from "react"
import Image from "next/image"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Plus, Wallet, Upload, X, TrendingUp, TrendingDown, DollarSign, Receipt, Image as ImageIcon } from "lucide-react"

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

/* ---------------- COMPONENT ---------------- */

export default function ReceiptsAndExpenses() {
  const [receipts, setReceipts] = useState<
    { file: File; preview: string }[]
  >([])
  
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
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Receipts & Expenses
          </h1>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 dark:from-green-900/40 dark:via-green-800/40 dark:to-green-900/40 border-green-200 dark:border-green-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total Income</CardTitle>
              <div className="p-2 bg-green-200 dark:bg-green-700 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-700 dark:text-green-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                ₹{totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 dark:text-green-200 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 via-red-100 to-red-50 dark:from-red-900/40 dark:via-red-800/40 dark:to-red-900/40 border-red-200 dark:border-red-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-red-900 dark:text-red-100">Total Expenses</CardTitle>
              <div className="p-2 bg-red-200 dark:bg-red-700 rounded-full">
                <TrendingDown className="h-5 w-5 text-red-700 dark:text-red-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700 dark:text-red-300">
                ₹{totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-red-600 dark:text-red-200 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br ${savings >= 0 
            ? "from-blue-50 via-blue-100 to-blue-50 dark:from-blue-900/40 dark:via-blue-800/40 dark:to-blue-900/40 border-blue-200 dark:border-blue-700" 
            : "from-orange-50 via-orange-100 to-orange-50 dark:from-orange-900/40 dark:via-orange-800/40 dark:to-orange-900/40 border-orange-200 dark:border-orange-700"
          } hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className={`text-sm font-medium ${savings >= 0 ? "text-blue-900 dark:text-blue-100" : "text-orange-900 dark:text-orange-100"}`}>
                Net Savings
              </CardTitle>
              <div className={`p-2 rounded-full ${savings >= 0 ? "bg-blue-200 dark:bg-blue-700" : "bg-orange-200 dark:bg-orange-700"}`}>
                <DollarSign className={`h-5 w-5 ${savings >= 0 ? "text-blue-700 dark:text-blue-200" : "text-orange-700 dark:text-orange-200"}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${savings >= 0 ? "text-blue-700 dark:text-blue-300" : "text-orange-700 dark:text-orange-300"}`}>
                ₹{savings.toLocaleString()}
              </div>
              <p className={`text-xs mt-1 ${savings >= 0 ? "text-blue-600 dark:text-blue-200" : "text-orange-600 dark:text-orange-200"}`}>
                {savings >= 0 ? "Great savings!" : "Budget deficit"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Income Entry */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-700 dark:to-green-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-700 dark:text-green-100" />
              </div>
              Monthly Income
            </CardTitle>
            <CardDescription>Income received this month</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                  <TableHead className="font-semibold">Source</TableHead>
                  <TableHead className="font-semibold">Mode</TableHead>
                  <TableHead className="text-right font-semibold">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyIncome.map((income, index) => (
                  <TableRow key={index} className="hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                    <TableCell className="font-medium">{income.source}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                        {income.mode}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600 dark:text-green-400">
                      +₹{income.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Expense Categorization */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-700 dark:to-red-600 rounded-lg">
                <Receipt className="h-5 w-5 text-red-700 dark:text-red-100" />
              </div>
              Expense Categorization
            </CardTitle>
            <CardDescription>Categorized monthly expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Mode</TableHead>
                  <TableHead className="text-right font-semibold">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={index} className="hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors">
                    <TableCell>
                      <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700">
                        {expense.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                        {expense.mode}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-red-600 dark:text-red-400">
                      -₹{expense.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>


        {/* Cash & Manual Entries */}
        <Card className="border-slate-200 dark:border-slate-700 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-700 dark:to-amber-600 rounded-lg">
                <Wallet className="h-5 w-5 text-amber-700 dark:text-amber-100" />
              </div>
              Cash & Manual Entries
            </CardTitle>
            <CardDescription>
              Add manual income or expense entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={manualEntry.type} 
                    onValueChange={(value) => setManualEntry({...manualEntry, type: value})}
                  >
                    <SelectTrigger id="type">
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
                    value={manualEntry.category}
                    onChange={(e) => setManualEntry({...manualEntry, category: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter description"
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
                    <SelectTrigger id="mode">
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

              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" />
                Add Manual Entry
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </ClientLayout>
  )
}
