"use client"

import { useState } from "react"
import Image from "next/image"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Plus, Wallet, Upload, X } from "lucide-react"

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

  const totalIncome = monthlyIncome.reduce((acc, i) => acc + i.amount, 0)
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0)
  const savings = totalIncome - totalExpenses

  return (
    <ClientLayout activeTab="/client/receipts-expenses">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Receipts & Expenses</h1>
            <p className="text-muted-foreground">
              Track monthly income, expenses, and cash entries
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ₹{totalExpenses.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  savings >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{savings.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Income Entry */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
            <CardDescription>Income received this month</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyIncome.map((income, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{income.source}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{income.mode}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      +₹{income.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Expense Categorization */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categorization</CardTitle>
            <CardDescription>Categorized monthly expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge className="bg-muted text-foreground">
                        {expense.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{expense.mode}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      -₹{expense.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Receipt Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Receipt Upload</CardTitle>
            <CardDescription>
              Upload bill images for expense verification
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-muted-foreground hover:border-primary">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files
                  if (!files) return

                  const uploaded = Array.from(files).map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                  }))

                  setReceipts((prev) => [...prev, ...uploaded])
                }}
              />

              <Upload className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">
                Click to upload receipt images
              </span>
              <span className="text-xs">
                JPG or PNG • Multiple files supported
              </span>
            </label>

            {receipts.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
                {receipts.map((receipt, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={receipt.preview}
                      alt="Receipt"
                      width={300}
                      height={300}
                      className="h-40 w-full object-cover"
                    />

                    <button
                      onClick={() =>
                        setReceipts((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute right-2 top-2 rounded-full bg-background p-1 shadow"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cash & Manual Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Cash & Manual Entries</CardTitle>
            <CardDescription>
              Expenses and income recorded manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Wallet className="h-5 w-5" />
              Cash entries are included where mode is marked as <b>Cash</b>.
            </div>
          </CardContent>
        </Card>

      </div>
    </ClientLayout>
  )
}
