"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  Briefcase,
  PieChart,
  Download,
  Filter,
  Eye,
  EyeOff,
  RefreshCw,
  BarChart3,
  LineChart,
  Percent,
  Calendar,
  Shield,
  Clock,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const investments = [
  { 
    id: 1, 
    type: "SIP", 
    name: "HDFC Balanced Advantage Fund", 
    amount: 50000, 
    returns: 12.5, 
    status: "Active",
    category: "Mutual Fund",
    startDate: "2023-01-15",
    duration: "5 Years",
    risk: "Medium",
    growth: 12000
  },
  { 
    id: 2, 
    type: "Mutual Fund", 
    name: "SBI Blue Chip Fund", 
    amount: 75000, 
    returns: 15.2, 
    status: "Active",
    category: "Equity",
    startDate: "2022-08-20",
    duration: "7 Years",
    risk: "High",
    growth: 18000
  },
  { 
    id: 3, 
    type: "Fixed Deposit", 
    name: "State Bank FD - 5 Year", 
    amount: 100000, 
    returns: 6.5, 
    status: "Active",
    category: "Fixed Income",
    startDate: "2023-03-10",
    duration: "5 Years",
    risk: "Low",
    growth: 6500
  },
  { 
    id: 4, 
    type: "Stocks", 
    name: "TCS Limited", 
    amount: 35000, 
    returns: -2.3, 
    status: "Hold",
    category: "Equity",
    startDate: "2023-06-05",
    duration: "Long Term",
    risk: "High",
    growth: -800
  },
  { 
    id: 5, 
    type: "Stocks", 
    name: "Infosys Limited", 
    amount: 40000, 
    returns: 8.7, 
    status: "Active",
    category: "Equity",
    startDate: "2023-02-28",
    duration: "Long Term",
    risk: "High",
    growth: 3480
  },
  { 
    id: 6, 
    type: "PPF", 
    name: "Public Provident Fund", 
    amount: 150000, 
    returns: 7.1, 
    status: "Active",
    category: "Government",
    startDate: "2021-04-01",
    duration: "15 Years",
    risk: "Low",
    growth: 10650
  },
  { 
    id: 7, 
    type: "NPS", 
    name: "National Pension Scheme", 
    amount: 80000, 
    returns: 9.2, 
    status: "Active",
    category: "Retirement",
    startDate: "2022-11-15",
    duration: "Until Retirement",
    risk: "Medium",
    growth: 7360
  },
  { 
    id: 8, 
    type: "Gold ETF", 
    name: "Gold BeES", 
    amount: 45000, 
    returns: 11.4, 
    status: "Active",
    category: "Commodity",
    startDate: "2023-05-20",
    duration: "3 Years",
    risk: "Medium",
    growth: 5130
  },
]

/* ---------------- ANIMATION VARIANTS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

export default function ClientInvestments() {
  const [showAll, setShowAll] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [hiddenAmounts, setHiddenAmounts] = useState(false)
  const [sortBy, setSortBy] = useState("value")

  const displayedInvestments = showAll ? investments : investments.slice(0, 4)
  const totalInvestment = investments.reduce((acc, inv) => acc + inv.amount, 0)
  const totalGrowth = investments.reduce((acc, inv) => acc + inv.growth, 0)
  const avgReturns = (investments.reduce((acc, inv) => acc + inv.returns, 0) / investments.length).toFixed(2)

  const handleDownload = () => {
    const headers = ["Type", "Investment Name", "Category", "Invested Amount", "Returns (%)", "Growth", "Status", "Risk", "Start Date"]
    const rows = investments.map(inv => [
      inv.type,
      `"${inv.name}"`,
      inv.category,
      inv.amount,
      inv.returns,
      inv.growth,
      inv.status,
      inv.risk,
      inv.startDate
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `investment_portfolio_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredInvestments = displayedInvestments.filter(inv => {
    if (activeTab === "all") return true
    if (activeTab === "equity") return inv.category === "Equity"
    if (activeTab === "mf") return inv.type === "Mutual Fund" || inv.type === "SIP"
    if (activeTab === "fixed") return inv.category === "Fixed Income" || inv.category === "Government"
    return true
  })

  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    if (sortBy === "value") return b.amount - a.amount
    if (sortBy === "returns") return b.returns - a.returns
    if (sortBy === "growth") return b.growth - a.growth
    return 0
  })

  return (
    <AdminLayout activeTab="/client/investments">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Investment Portfolio</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Track and manage all your investments in one place
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHiddenAmounts(!hiddenAmounts)}
              className="border-slate-200 dark:border-slate-700"
            >
              {hiddenAmounts ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {hiddenAmounts ? "Show" : "Hide"} Amounts
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
          
          {/* Total Value Card */}
          <motion.div variants={cardHoverVariants} whileHover="hover">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:shadow-2xl transition-all duration-500 group">
  {/* Emoji Background */}
 <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
  <div className="absolute -right-6 -top-6 text-[12rem] leading-none">💼</div>
</div>
  
  {/* Glow Effect - Same as others */}
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
  
  <CardHeader className="pb-2 relative z-10">
    <div className="flex items-center justify-between">
      <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Total Value</CardTitle>
      <div className="">
        {/* <Wallet className="h-4 w-4 text-white" /> */}
      </div>
    </div>
  </CardHeader>
  
  <CardContent className="relative z-10">
    <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
      {hiddenAmounts ? "••••••" : `₹${totalInvestment.toLocaleString()}`}
    </div>
    
    <div className="flex items-center gap-2">
      <Briefcase className="h-4 w-4 text-white/80" />
      <span className="text-sm text-white/90">
        Across {investments.length} Instruments
      </span>
    </div>
    
    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs text-white/70">Since Last Month</span>
      <Badge className="bg-white/30 backdrop-blur-sm text-white border border-white/40">
        <TrendingUp className="h-3 w-3 mr-1" />
        +8.2%
      </Badge>
    </div>
  </CardContent>
</Card>
          </motion.div>

          {/* Average Returns Card */}
          <motion.div variants={cardHoverVariants} whileHover="hover">
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 hover:shadow-2xl transition-all duration-500 group">
  {/* Emoji Background - Chart emoji */}
  
   <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
  <div className="absolute -right-6 -top-6 text-[8rem] leading-none">✨</div>
</div>

  
  {/* Glow Effect */}
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
  
  <CardHeader className="pb-2 relative z-10">
    <div className="flex items-center justify-between">
      <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Avg. Returns</CardTitle>
      <div className="">
        {/* <Percent className="h-4 w-4 text-white" /> */}
      </div>
    </div>
  </CardHeader>
  
  <CardContent className="relative z-10">
    <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">+{avgReturns}%</div>
    
    <div className="flex items-center gap-2">
      <ArrowUpRight className="h-4 w-4 text-white/80" />
      <span className="text-sm text-white/90">Annualized Growth</span>
    </div>
    
    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs text-white/70">YTD Performance</span>
      <Badge className="bg-white/30 backdrop-blur-sm text-white border border-white/40">
        <Sparkles className="h-3 w-3 mr-1" />
        Top 25%
      </Badge>
    </div>
  </CardContent>
</Card>
          </motion.div>

          {/* Total Gains Card */}
          <motion.div variants={cardHoverVariants} whileHover="hover">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-violet-500 via-purple-600 to-violet-700 hover:shadow-2xl transition-all duration-500 group">
  {/* Emoji Background - EXACT same positioning */}
  <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
  <div className="absolute -right-6 -top-6 text-[12rem] leading-none">💵</div>
</div>
  
  {/* Glow Effect - EXACT same */}
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
  
  <CardHeader className="pb-2 relative z-10">
    <div className="flex items-center justify-between">
      <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Total Gains</CardTitle>
      <div className="">
      </div>
    </div>
  </CardHeader>
  
  <CardContent className="relative z-10">
    <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
      {hiddenAmounts ? "••••••" : `₹${totalGrowth.toLocaleString()}`}
    </div>
    
    <div className="flex items-center gap-2">
      <TrendingUp className="h-4 w-4 text-white/80" />
      <span className="text-sm text-white/90">
        Absolute Growth
      </span>
    </div>
    
    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs text-white/70">All Time</span>
      <Badge className="bg-white/30 backdrop-blur-sm text-white border border-white/40">
        <ArrowUpRight className="h-3 w-3 mr-1" />
        +24.8%
      </Badge>
    </div>
  </CardContent>
</Card>
          </motion.div>

          {/* Best Performer Card */}
          <motion.div variants={cardHoverVariants} whileHover="hover">
     <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-500 via-orange-600 to-amber-600 hover:shadow-2xl transition-all duration-500 group">
  {/* Emoji Background - Trophy emoji */}
   <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
  <div className="absolute -right-6 -top-6 text-[12rem] leading-none"> 🏆</div>
</div>
    
  
  {/* Glow Effect */}
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
  
  <CardHeader className="pb-2 relative z-10">
    <div className="flex items-center justify-between">
      <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Best Performer</CardTitle>
      <div className="">
      </div>
    </div>
  </CardHeader>
  
  <CardContent className="relative z-10">
    <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg">SBI Blue Chip</div>
    <div className="text-lg font-bold text-white/90 mb-2">+15.2%</div>
    
    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs text-white/70">Equity Fund</span>
      <Badge className="bg-white/30 backdrop-blur-sm text-white border border-white/40">
        <Shield className="h-3 w-3 mr-1" />
        High Risk
      </Badge>
    </div>
  </CardContent>
</Card>
          </motion.div>
        </motion.div>

        {/* FILTER AND SORT CONTROLS */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-5 w-full md:w-auto">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600">
                All
              </TabsTrigger>
              <TabsTrigger value="equity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600">
                Equity
              </TabsTrigger>
              <TabsTrigger value="mf" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-violet-600">
                MF/SIP
              </TabsTrigger>
              <TabsTrigger value="fixed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600">
                Fixed Income
              </TabsTrigger>
              <TabsTrigger value="others" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-slate-600">
                Others
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="value">Sort by: Highest Value</option>
                <option value="returns">Sort by: Best Returns</option>
                <option value="growth">Sort by: Most Growth</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="border-slate-200 dark:border-slate-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* INVESTMENTS TABLE */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100/50 dark:border-slate-800 bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-900/10 dark:to-slate-900/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-blue-900 dark:text-white">Investment Holdings</CardTitle>
                  <CardDescription className="text-blue-600/80 dark:text-slate-400">
                    Detailed breakdown of your current investment portfolio
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                    <Calendar className="h-3 w-3 mr-1" />
                    Updated Today
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-blue-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-900/80">
                    <TableRow className="border-b border-slate-100/50 dark:border-slate-800">
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-8 py-4">Investment</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-center py-4">Risk</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-center py-4">Duration</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right py-4">Invested Value</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right py-4">Growth</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right py-4">Returns</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-center py-4 pr-8">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {sortedInvestments.map((investment, index) => (
                        <motion.tr
                          key={investment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                          className="group border-b border-slate-100/50 dark:border-slate-800/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors"
                        >
                          <TableCell className="pl-8 py-5">
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                "p-2 rounded-lg",
                                investment.category === "Equity" ? "bg-red-100 dark:bg-red-900/30" :
                                investment.category === "Mutual Fund" ? "bg-blue-100 dark:bg-blue-900/30" :
                                investment.category === "Fixed Income" ? "bg-green-100 dark:bg-green-900/30" :
                                "bg-purple-100 dark:bg-purple-900/30"
                              )}>
                                {investment.category === "Equity" ? <LineChart className="h-5 w-5 text-red-600 dark:text-red-400" /> :
                                 investment.category === "Mutual Fund" ? <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" /> :
                                 investment.category === "Fixed Income" ? <Shield className="h-5 w-5 text-green-600 dark:text-green-400" /> :
                                 <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-lg">{investment.name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className={cn(
                                    "text-xs",
                                    investment.type === "SIP" ? "border-blue-200 text-blue-600 bg-blue-50/50 dark:bg-blue-900/20" :
                                    investment.type === "Mutual Fund" ? "border-emerald-200 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20" :
                                    "border-slate-200 text-slate-600 bg-slate-50/50 dark:bg-slate-800/50"
                                  )}>
                                    {investment.type}
                                  </Badge>
                                  <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Started: {new Date(investment.startDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-5">
                            <Badge className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border-0",
                              investment.risk === "High" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                              investment.risk === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
                              "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            )}>
                              {investment.risk} Risk
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center py-5">
                            <div className="text-sm text-slate-700 dark:text-slate-300">{investment.duration}</div>
                          </TableCell>
                          <TableCell className="text-right py-5">
                            <div className="font-bold text-lg text-slate-900 dark:text-white">
                              {hiddenAmounts ? "••••••" : `₹${investment.amount.toLocaleString()}`}
                            </div>
                          </TableCell>
                          <TableCell className="text-right py-5">
                            <div className={cn(
                              "inline-flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg text-sm",
                              investment.growth >= 0 
                                ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-400 border border-green-200 dark:border-green-800" 
                                : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 dark:from-red-900/20 dark:to-rose-900/20 dark:text-red-400 border border-red-200 dark:border-red-800"
                            )}>
                              {investment.growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                              {hiddenAmounts ? "••••••" : `₹${Math.abs(investment.growth).toLocaleString()}`}
                            </div>
                          </TableCell>
                          <TableCell className="text-right py-5">
                            <div className={cn(
                              "inline-flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg text-sm",
                              investment.returns >= 0 
                                ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 dark:from-emerald-900/20 dark:to-green-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" 
                                : "bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 dark:from-rose-900/20 dark:to-red-900/20 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                            )}>
                              {investment.returns >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                              {investment.returns >= 0 ? "+" : ""}{investment.returns}%
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-5 pr-8">
                            <span className={cn(
                              "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border",
                              investment.status === "Active" 
                                ? "bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 border-emerald-200 dark:bg-gradient-to-r dark:from-emerald-900/30 dark:to-green-900/20 dark:text-emerald-400 dark:border-emerald-800" 
                                : "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-600 border-slate-200 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900/50 dark:text-slate-400 dark:border-slate-700"
                            )}>
                              {investment.status}
                            </span>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SHOW MORE/LESS BUTTON */}
        {investments.length > 4 && (
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-6 text-lg bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-slate-800"
            >
              <RefreshCw className={cn("h-5 w-5 mr-3 transition-transform", showAll ? "rotate-180" : "")} />
              {showAll ? "Show Less" : `View All ${investments.length} Investments`}
            </Button>
          </motion.div>
        )}

        {/* PERFORMANCE SUMMARY */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <PieChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Equity</span>
                  <span className="font-semibold text-slate-900 dark:text-white">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Mutual Funds</span>
                  <span className="font-semibold text-slate-900 dark:text-white">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Fixed Income</span>
                  <span className="font-semibold text-slate-900 dark:text-white">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Others</span>
                  <span className="font-semibold text-slate-900 dark:text-white">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Beat Market Average</span>
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    +8.5%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Risk-Adjusted Return</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Good</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Portfolio Diversity</span>
                  <span className="font-semibold text-slate-900 dark:text-white">High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                  <Clock className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                Next Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">SIP Due Date</span>
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    5th Dec
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Review Portfolio</span>
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    15 Days
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Tax Harvesting</span>
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    Available
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}