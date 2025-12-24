"use client"

import { useState, useEffect } from "react"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DollarSign, CreditCard, Wallet, TrendingUp, Building2, Filter } from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
    <ClientLayout activeTab="/client/my_salary">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* SUMMARY */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-900/40 dark:via-blue-800/40 dark:to-blue-900/40 border-blue-200 dark:border-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Monthly Salary</CardTitle>
              <div className="p-2 bg-blue-200 dark:bg-blue-700 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-700 dark:text-blue-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-50">₹{totalSalary.toLocaleString()}</div>
              <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">Current month earnings</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 dark:from-green-900/40 dark:via-green-800/40 dark:to-green-900/40 border-green-200 dark:border-green-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total Bank Balance</CardTitle>
              <div className="p-2 bg-green-200 dark:bg-green-700 rounded-full">
                <Wallet className="h-5 w-5 text-green-700 dark:text-green-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-50">₹{totalBankBalance.toLocaleString()}</div>
              <p className="text-xs text-green-700 dark:text-green-200 mt-1">Across all accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs defaultValue="salary" className="space-y-6">
          <TabsList className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-1 border border-blue-100 dark:border-slate-600">
            <TabsTrigger value="salary" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md transition-all">
              <DollarSign className="h-4 w-4 mr-2" />
              Salary
            </TabsTrigger>
            <TabsTrigger value="banks" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md transition-all">
              <Building2 className="h-4 w-4 mr-2" />
              Banks
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md transition-all">
              <CreditCard className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
          </TabsList>

          {/* SALARY TAB */}
          <TabsContent value="salary" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-700 dark:to-purple-600 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-700 dark:text-purple-100" />
                  </div>
                  Salary Trend
                </CardTitle>
                <CardDescription>Your salary over the last 3 months</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salaryHistory}>
                    <defs>
                      <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="month" stroke="#64748b" className="dark:stroke-slate-400" />
                    <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line 
                      dataKey="amount" 
                      stroke="hsl(262, 83%, 58%)" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(262, 83%, 58%)", r: 5 }}
                      activeDot={{ r: 7 }}
                      fill="url(#salaryGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-700 dark:to-blue-600 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-700 dark:text-blue-100" />
                  </div>
                  Monthly Salary Breakdown
                </CardTitle>
                <CardDescription>Detailed component breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {salaryBreakdown.map((item, i) => (
                      <TableRow key={i} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
                        <TableCell className="font-medium">{item.label}</TableCell>
                        <TableCell className="text-right">
                          <span className="font-bold text-blue-700 dark:text-blue-300">
                            ₹{item.amount.toLocaleString()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-t-2 border-blue-200 dark:border-blue-700">
                      <TableCell className="font-bold text-lg">Total</TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-xl text-blue-900 dark:text-blue-100">
                          ₹{totalSalary.toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BANK TAB */}
          <TabsContent value="banks" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-700 dark:to-emerald-600 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-700 dark:text-emerald-100" />
                  </div>
                  Balance Trend
                </CardTitle>
                <CardDescription>Combined balance across all accounts</CardDescription>
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
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="month" stroke="#64748b" className="dark:stroke-slate-400" />
                    <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line 
                      dataKey="balance" 
                      stroke="hsl(142, 76%, 36%)" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(142, 76%, 36%)", r: 5 }}
                      activeDot={{ r: 7 }}
                      fill="url(#balanceGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-700 dark:to-green-600 rounded-lg">
                    <Building2 className="h-5 w-5 text-green-700 dark:text-green-100" />
                  </div>
                  Bank Accounts
                </CardTitle>
                <CardDescription>Your linked bank accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                      <TableHead className="font-semibold">Bank</TableHead>
                      <TableHead className="font-semibold">Account</TableHead>
                      <TableHead className="text-right font-semibold">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankAccounts.map((bank, i) => (
                      <TableRow key={i} className="hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                        <TableCell className="font-medium">{bank.bank}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                            {bank.account}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-bold text-green-700 dark:text-green-300">
                            ₹{bank.balance.toLocaleString()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TRANSACTIONS TAB */}
          <TabsContent value="transactions" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-slate-200 dark:border-slate-700 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-700 dark:to-indigo-600 rounded-lg">
                    <Filter className="h-5 w-5 text-indigo-700 dark:text-indigo-100" />
                  </div>
                  Filters
                </CardTitle>
                <CardDescription>Filter transactions by criteria</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger className="w-40 bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="Jun 2025">Jun 2025</SelectItem>
                    <SelectItem value="May 2025">May 2025</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bank} onValueChange={setBank}>
                  <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all">
                    <SelectValue placeholder="Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Banks</SelectItem>
                    <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                    <SelectItem value="SBI">SBI</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <Switch checked={creditOnly} onCheckedChange={setCreditOnly} />
                  <span className="text-sm font-medium">Credit only</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-700 dark:to-violet-600 rounded-lg">
                    <CreditCard className="h-5 w-5 text-violet-700 dark:text-violet-100" />
                  </div>
                  Transactions
                </CardTitle>
                <CardDescription>Showing {filteredTransactions.length} transaction(s)</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Description</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="text-right font-semibold">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((tx, i) => (
                      <TableRow 
                        key={i} 
                        className={`hover:bg-${tx.type === "Credit" ? "green" : "red"}-50/30 dark:hover:bg-${tx.type === "Credit" ? "green" : "red"}-900/20 transition-colors`}
                      >
                        <TableCell className="font-medium">{tx.date}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              tx.type === "Credit" 
                                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700" 
                                : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700"
                            }`}
                          >
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-bold ${
                            tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString()}
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
