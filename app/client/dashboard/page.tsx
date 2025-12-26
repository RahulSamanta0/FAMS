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
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Income Card */}
          <Card className="relative overflow-hidden border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <DollarSign className="h-16 w-16 text-blue-600" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Monthly Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">₹75,000</div>
              <p className="text-xs text-blue-600 dark:text-blue-300 flex items-center gap-1 mt-1 font-medium">
                <TrendingUp className="h-3 w-3" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          {/* Expense Card */}
          <Card className="relative overflow-hidden border-red-100 bg-gradient-to-br from-red-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Wallet className="h-16 w-16 text-red-600" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">
                Monthly Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">₹44,000</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 font-medium">
                <TrendingDown className="h-3 w-3" />
                -8% (Savings!)
              </p>
            </CardContent>
          </Card>

          {/* Savings Rate Card */}
          <Card className="relative overflow-hidden border-purple-100 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <PieChart className="h-16 w-16 text-purple-600" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Savings Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">41.3%</div>
              <p className="text-xs text-purple-600 dark:text-purple-300 mt-1 font-medium">Excellent progress</p>
            </CardContent>
          </Card>

          {/* Tax Card */}
          <Card className="relative overflow-hidden border-orange-100 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <AlertCircle className="h-16 w-16 text-orange-600" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                Est. Tax (FY 24-25)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">₹45,600</div>
              <p className="text-xs text-orange-600 dark:text-orange-300 mt-1 font-medium">Under old regime</p>
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
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
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
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
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