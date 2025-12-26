"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { 
  DollarSign, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Building2, 
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Briefcase,
  Landmark,
  Receipt
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

/* ---------------- MOCK DATA ---------------- */

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

  return (
    <ClientLayout activeTab="/client/my_salary">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >

        {/* HEADER SECTION */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Financial Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track your earnings, bank balances, and recent financial activity.
          </p>
        </motion.div>

        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
          
          {/* Salary Card - Indigo Theme */}
          <Card className="relative overflow-hidden border-indigo-100 bg-gradient-to-br from-indigo-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Briefcase className="h-24 w-24 text-indigo-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">₹{totalSalary.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>+2.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Bank Balance Card - Sky Theme */}
          <Card className="relative overflow-hidden border-sky-100 bg-gradient-to-br from-sky-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Wallet className="h-24 w-24 text-sky-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider">Net Liquid Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">₹{totalBankBalance.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Available across all accounts</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* TABS SECTION */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="salary" className="space-y-6">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-xl">
              <TabsTrigger value="salary" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all px-6">
                <DollarSign className="h-4 w-4 mr-2" /> Salary
              </TabsTrigger>
              <TabsTrigger value="banks" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all px-6">
                <Landmark className="h-4 w-4 mr-2" /> Banks
              </TabsTrigger>
              <TabsTrigger value="transactions" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all px-6">
                <CreditCard className="h-4 w-4 mr-2" /> History
              </TabsTrigger>
            </TabsList>

            {/* --- SALARY TAB --- */}
            <TabsContent value="salary" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* 1. Salary Trend Chart */}
                <Card className="md:col-span-2 border-blue-100 dark:border-slate-800 shadow-md bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-white">
                      <TrendingUp className="h-5 w-5 text-indigo-600" />
                      Salary Trend
                    </CardTitle>
                    <CardDescription className="text-slate-500">Income progression over the last quarter</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salaryHistory}>
                        <defs>
                          <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#4f46e5" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorSalary)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* 2. Monthly Salary Breakdown Table */}
                <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900 h-full">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Receipt className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800 dark:text-white">Structure</CardTitle>
                        <CardDescription className="text-slate-500">Monthly breakdown</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableBody>
                        {salaryBreakdown.map((item, i) => (
                          <TableRow key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                            <TableCell className="pl-6 font-medium text-slate-600 dark:text-slate-400 py-3">{item.label}</TableCell>
                            <TableCell className="text-right font-bold text-slate-800 dark:text-white py-3 pr-6">
                              ₹{item.amount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-blue-50/50 dark:bg-slate-900/80 hover:bg-blue-50/60 border-t border-blue-100 dark:border-slate-800">
                          <TableCell className="pl-6 font-bold text-indigo-600 dark:text-indigo-400">Gross Total</TableCell>
                          <TableCell className="text-right font-bold text-indigo-600 dark:text-indigo-400 text-lg pr-6">
                            ₹{totalSalary.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* --- BANKS TAB --- */}
            <TabsContent value="banks">
              <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-800 dark:text-white">Linked Accounts</CardTitle>
                      <CardDescription className="text-slate-500">Current standing of your connected bank accounts</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                        <TableRow>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Bank Name</TableHead>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Account Type</TableHead>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right pr-6 h-12">Available Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bankAccounts.map((bank, i) => (
                          <TableRow key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                            <TableCell className="pl-6 font-medium text-slate-800 dark:text-slate-200">
                              <div className="flex items-center gap-3">
                                {bank.bank}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-slate-500 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                {bank.account}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right pr-6 text-lg font-semibold text-green-600 dark:text-green-400">
                              ₹{bank.balance.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- TRANSACTIONS TAB --- */}
            <TabsContent value="transactions" className="space-y-4">
              {/* Filter Bar */}
              <Card className="p-4 border-blue-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50 shadow-sm">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Filter className="h-4 w-4" /> Filters:
                  </div>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="w-[140px] bg-white dark:bg-slate-950 border-blue-200 dark:border-slate-700">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Months</SelectItem>
                      <SelectItem value="Jun 2025">Jun 2025</SelectItem>
                      <SelectItem value="May 2025">May 2025</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={bank} onValueChange={setBank}>
                    <SelectTrigger className="w-[140px] bg-white dark:bg-slate-950 border-blue-200 dark:border-slate-700">
                      <SelectValue placeholder="Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Banks</SelectItem>
                      <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                      <SelectItem value="SBI">SBI</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2 ml-auto">
                    <Switch id="credit-mode" checked={creditOnly} onCheckedChange={setCreditOnly} />
                    <label htmlFor="credit-mode" className="text-sm font-medium text-slate-600 cursor-pointer">
                      Credit Only
                    </label>
                  </div>
                </div>
              </Card>

              {/* Transactions Table */}
              <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                      <TableRow>
                        <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Date</TableHead>
                        <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Description</TableHead>
                        <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Bank</TableHead>
                        <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right pr-6 h-12">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((tx, i) => (
                          <TableRow key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                            <TableCell className="pl-6 font-medium text-slate-500">{tx.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className={cn("p-1.5 rounded-full", 
                                  tx.type === "Credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                )}>
                                  {tx.type === "Credit" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
                                </div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">{tx.description}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-500">{tx.bank}</TableCell>
                            <TableCell className="text-right pr-6">
                              <span className={cn("font-bold px-2 py-1 rounded-md text-sm", 
                                tx.type === "Credit" 
                                  ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" 
                                  : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              )}>
                                {tx.type === "Credit" ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString()}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                            No transactions found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </ClientLayout>
  )
}