"use client"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Wallet, AlertCircle, Calendar, BarChart3, PieChart } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Tooltip
} from "recharts"
import { motion } from "framer-motion"

/* ---------------- DATA (UNCHANGED) ---------------- */

const incomeExpenseData = [
  { month: "Jan", income: 75000, expense: 45000 },
  { month: "Feb", income: 75000, expense: 48000 },
  { month: "Mar", income: 75000, expense: 42000 },
  { month: "Apr", income: 75000, expense: 50000 },
  { month: "May", income: 80000, expense: 46000 },
  { month: "Jun", income: 75000, expense: 44000 },
]

const investmentData = [
  { month: "Jan", value: 250000 },
  { month: "Feb", value: 265000 },
  { month: "Mar", value: 270000 },
  { month: "Apr", value: 280000 },
  { month: "May", value: 295000 },
  { month: "Jun", value: 310000 },
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

export default function ClientDashboard() {
  return (
    <ClientLayout activeTab="/client/dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >



        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Income Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-400 to-blue-600 hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
            <CardContent className="p-0 flex flex-col items-start justify-between h-full">
              <div className="mb-8 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div className="w-full">
                <p className="text-white/80 text-sm font-medium mb-1">Monthly Income</p>
                <p className="text-white text-2xl font-bold mb-1">₹75,000</p>
                <p className="text-white/90 text-xs flex items-center gap-1 font-medium">
                  <TrendingUp className="h-3 w-3" />
                  +5% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Expense Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-400 to-yellow-500 hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
            <CardContent className="p-0 flex flex-col items-start justify-between h-full">
              <div className="mb-8 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div className="w-full">
                <p className="text-white/80 text-sm font-medium mb-1">Monthly Expenses</p>
                <p className="text-white text-2xl font-bold mb-1">₹44,000</p>
                <p className="text-white/90 text-xs flex items-center gap-1 font-medium">
                  <TrendingDown className="h-3 w-3" />
                  -8% (Savings!)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Savings Rate Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-pink-400 to-pink-600 hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
            <CardContent className="p-0 flex flex-col items-start justify-between h-full">
              <div className="mb-8 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <div className="w-full">
                <p className="text-white/80 text-sm font-medium mb-1">Savings Rate</p>
                <p className="text-white text-2xl font-bold mb-1">41.3%</p>
                <p className="text-white/90 text-xs font-medium">Excellent progress</p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-500 to-purple-700 hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
            <CardContent className="p-0 flex flex-col items-start justify-between h-full">
              <div className="mb-8 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div className="w-full">
                <p className="text-white/80 text-sm font-medium mb-1">Est. Tax (FY 24-25)</p>
                <p className="text-white text-2xl font-bold mb-1">₹45,600</p>
                <p className="text-white/90 text-xs font-medium">Under old regime</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ALERTS & INVESTMENTS ROW */}
        <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">

          {/* Alerts & Reminders */}
          <Card className="hover:shadow-lg transition-all duration-300 border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Calendar className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                </div>
                Alerts & Reminders
              </CardTitle>
              <CardDescription className="text-slate-500">Important notifications regarding your finances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold">Tax Filing Due</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-400 text-xs">
                  Your tax filing for FY 2023-24 is due in 7 days. Complete your ITR now.
                </AlertDescription>
              </Alert>
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300 font-semibold">SIP Payment</AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-400 text-xs">
                  Your monthly SIP of ₹10,000 will be debited on 1st July.
                </AlertDescription>
              </Alert>
              <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800">
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <AlertTitle className="text-orange-800 dark:text-orange-300 font-semibold">Insurance Premium</AlertTitle>
                <AlertDescription className="text-orange-600 dark:text-orange-400 text-xs">
                  Life insurance premium payment is due on 15th July 2024.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Investment Performance Chart (AREA CHART UPGRADE) */}
          <Card className="hover:shadow-lg transition-all duration-300 border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  Portfolio Growth
                </CardTitle>
                <Badge variant="outline" className="bg-white dark:bg-slate-800 text-emerald-600 border-emerald-200">
                  +24% YTD
                </Badge>
              </div>
              <CardDescription className="text-slate-500">Total Value: ₹3,10,000</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={investmentData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Value']}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Income vs Expense Chart (MODERN BAR CHART) */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300 border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-violet-700 dark:text-violet-400" />
                </div>
                Income vs Expense
              </CardTitle>
              <CardDescription className="text-slate-500">Track your monthly cash flow efficiency (Last 6 Months)</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeExpenseData} barGap={8}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="month" axisLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar name="Income" dataKey="income" fill="url(#colorIncome)" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar name="Expense" dataKey="expense" fill="url(#colorExpense)" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </ClientLayout>
  )
}