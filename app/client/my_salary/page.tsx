"use client"

import { useState, useEffect } from "react"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

/* ---------------- MOCK DATA (API READY) ---------------- */

const salaryBreakdown = [
  { label: "Basic Salary", amount: 50000 },
  { label: "HRA", amount: 20000 },
  { label: "Special Allowance", amount: 15000 },
  { label: "Other Benefits", amount: 5000 },
]

const salaryHistory = [
  { month: "Apr 2025", amount: 88000 },
  { month: "May 2025", amount: 88000 },
  { month: "Jun 2025", amount: 90000 },
]

const bankAccounts = [
  { bank: "HDFC Bank", account: "Savings Account", balance: 125000 },
  { bank: "State Bank of India", account: "Salary Account", balance: 78000 },
]

const transactionsData = [
  { date: "Jun 2025", bank: "HDFC Bank", description: "Salary Credit", type: "Credit", amount: 90000 },
  { date: "Jun 2025", bank: "HDFC Bank", description: "Rent Payment", type: "Debit", amount: -25000 },
  { date: "Jun 2025", bank: "SBI", description: "Groceries", type: "Debit", amount: -8200 },
  { date: "May 2025", bank: "SBI", description: "Freelance Income", type: "Credit", amount: 12000 },
]

/* ---------------- COMPONENT ---------------- */

export default function SalaryAndBankAccounts() {
  /* ---------- FILTER STATE ---------- */
  const [month, setMonth] = useState("all")
  const [bank, setBank] = useState("all")
  const [creditOnly, setCreditOnly] = useState(false)

  /* ---------- TOTALS ---------- */
  const totalSalary = salaryBreakdown.reduce((a, b) => a + b.amount, 0)
  const totalBankBalance = bankAccounts.reduce((a, b) => a + b.balance, 0)

  /* ---------- FILTER LOGIC ---------- */
  const filteredTransactions = transactionsData.filter((tx) => {
    if (month !== "all" && tx.date !== month) return false
    if (bank !== "all" && tx.bank !== bank) return false
    if (creditOnly && tx.type !== "Credit") return false
    return true
  })

  /* ---------- API READY ---------- */
  /*
  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data))
  }, [])
  */

  return (
    <ClientLayout activeTab="/client/salary-bank">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Salary & Bank Accounts</h1>
          <p className="text-muted-foreground">
            Salary details, bank balances, and transactions
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monthly Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSalary.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Bank Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalBankBalance.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs defaultValue="salary" className="space-y-6">
          <TabsList>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="banks">Banks</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          {/* SALARY TAB */}
          <TabsContent value="salary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salaryHistory}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="amount" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Salary Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {salaryBreakdown.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.label}</TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{item.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BANK TAB */}
          <TabsContent value="banks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Balance Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Apr", balance: 145000 },
                      { month: "May", balance: 160000 },
                      { month: "Jun", balance: 203000 },
                    ]}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="balance" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bank Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankAccounts.map((bank, i) => (
                      <TableRow key={i}>
                        <TableCell>{bank.bank}</TableCell>
                        <TableCell>{bank.account}</TableCell>
                        <TableCell className="text-right">
                          ₹{bank.balance.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TRANSACTIONS TAB */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="Jun 2025">Jun 2025</SelectItem>
                    <SelectItem value="May 2025">May 2025</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bank} onValueChange={setBank}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Banks</SelectItem>
                    <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                    <SelectItem value="SBI">SBI</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Switch checked={creditOnly} onCheckedChange={setCreditOnly} />
                  <span>Credit only</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((tx, i) => (
                      <TableRow key={i}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={tx.type === "Credit" ? "text-green-600" : "text-red-600"}
                          >
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium ${
                            tx.amount > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          ₹{Math.abs(tx.amount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
