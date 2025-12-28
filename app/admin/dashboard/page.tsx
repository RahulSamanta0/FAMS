"use client"

import { useState, useMemo } from 'react'
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Users,
  UserCheck,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Download,
  MoreVertical,
  FileText,
  Shield,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
  Search,
  Bell,
  Target,
  Award,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  IndianRupee,
  CreditCard,
  ShieldCheck,
  Calendar,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Star,
  FileBarChart,
  TrendingUp as ChartUp,
  TrendingDown as ChartDown,
  Users as UsersIcon,
  Wallet,
  Briefcase,
  Landmark,
  Home,
  Car,
  Gem,
  Database,
  Smartphone,
  Mail,
  Phone,
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  ExternalLink,
  Percent,
  Target as TargetIcon
} from "lucide-react"

import {
  BarChart,
  Bar,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts"

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

// Mock Data - More realistic and comprehensive
const generateTimeSeriesData = (months: number, baseValue: number, growthRate: number) => {
  const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return Array.from({ length: months }, (_, i) => ({
    month: monthsList[i % 12],
    value: Math.round(baseValue * Math.pow(1 + growthRate, i)),
    target: Math.round(baseValue * Math.pow(1 + growthRate * 0.8, i))
  }))
}

const clientGrowthData = generateTimeSeriesData(12, 1000, 0.08)
const investmentGrowthData = generateTimeSeriesData(12, 25000000, 0.12)
const revenueData = generateTimeSeriesData(12, 500000, 0.15)

const departmentPerformance = [
  { name: 'Education', value: 125, growth: 15, color: '#3b82f6', icon: '🎓' },
  { name: 'Health', value: 98, growth: 12, color: '#10b981', icon: '🏥' },
  { name: 'Finance', value: 87, growth: 18, color: '#f59e0b', icon: '💰' },
  { name: 'Revenue', value: 76, growth: 8, color: '#8b5cf6', icon: '📊' },
  { name: 'Defense', value: 54, growth: 5, color: '#ef4444', icon: '🛡️' },
  { name: 'Police', value: 42, growth: 20, color: '#06b6d4', icon: '👮' }
]

const investmentDistribution = [
  { name: 'Mutual Funds', value: 35, color: '#3b82f6', trend: 'up' },
  { name: 'Insurance', value: 28, color: '#10b981', trend: 'up' },
  { name: 'Equity', value: 20, color: '#f59e0b', trend: 'steady' },
  { name: 'Government Bonds', value: 12, color: '#8b5cf6', trend: 'up' },
  { name: 'Fixed Deposits', value: 5, color: '#ef4444', trend: 'down' }
]

const clientStatusData = [
  { status: 'Active', value: 68, color: '#10b981', icon: UserCheck },
  { status: 'Engaged', value: 18, color: '#3b82f6', icon: Activity },
  { status: 'Dormant', value: 9, color: '#f59e0b', icon: Clock },
  { status: 'Inactive', value: 5, color: '#ef4444', icon: AlertCircle }
]

const recentActivities = [
  { id: 1, client: 'Dr. Rajesh Kumar', action: 'ITR Filing Completed', time: '10:30 AM', status: 'success', amount: '₹85,000', type: 'tax' },
  { id: 2, client: 'Priya Sharma', action: 'New Insurance Policy', time: '11:45 AM', status: 'success', amount: '₹25,000', type: 'insurance' },
  { id: 3, client: 'Amit Patel', action: 'Portfolio Rebalanced', time: '1:20 PM', status: 'pending', amount: '₹1.2L', type: 'investment' },
  { id: 4, client: 'Sunita Verma', action: 'Asset Declaration', time: '2:15 PM', status: 'success', amount: '₹2.1 Cr', type: 'assets' },
  { id: 5, client: 'Rahul Mehta', action: 'White Income Report', time: '3:45 PM', status: 'success', amount: '₹8.5L', type: 'report' }
]

const performanceMetrics = [
  { metric: 'Client Retention', value: 94, target: 90, trend: 'up', icon: Users },
  { metric: 'Portfolio Growth', value: 18.5, target: 15, trend: 'up', icon: TrendingUp },
  { metric: 'Avg. Investment', value: 5.2, target: 4.5, trend: 'up', icon: DollarSign },
  { metric: 'Response Time', value: 2.4, target: 3, trend: 'down', icon: Clock }
]

const topClients = [
  { rank: 1, name: 'Dr. Rajesh Kumar', department: 'Education', investment: '₹85L', growth: '22%', engagement: 95 },
  { rank: 2, name: 'Priya Sharma', department: 'Health', investment: '₹72L', growth: '18%', engagement: 92 },
  { rank: 3, name: 'Amit Patel', department: 'Revenue', investment: '₹68L', growth: '15%', engagement: 88 },
  { rank: 4, name: 'Sunita Verma', department: 'Finance', investment: '₹62L', growth: '20%', engagement: 91 },
  { rank: 5, name: 'Rahul Mehta', department: 'Defense', investment: '₹58L', growth: '12%', engagement: 84 }
]

// Custom Tooltip Components
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg dark:bg-slate-800 dark:border-slate-700">
        <p className="font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color }} />
              <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{pld.dataKey}</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">
              {pld.dataKey.includes('value') ? pld.value.toLocaleString() : `₹${(pld.value / 1000000).toFixed(1)}M`}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const PerformanceCard = ({ metric, value, target, trend, icon: Icon }: any) => {
  const percentage = (value / target) * 100
  const isPositive = trend === 'up'
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
            <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </div>
          <Badge variant={isPositive ? "success" : "secondary"}>
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {isPositive ? 'Ahead' : 'Behind'}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">{metric}</h4>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}{metric.includes('Time') ? 'h' : '%'}</div>
              <p className="text-sm text-slate-500 dark:text-slate-500">Target: {target}{metric.includes('Time') ? 'h' : '%'}</p>
            </div>
            <div className="text-right">
              <div className={cn(
                "text-sm font-semibold",
                isPositive ? "text-green-600" : "text-red-600"
              )}>
                {percentage > 100 ? '+' : ''}{(percentage - 100).toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress value={Math.min(percentage, 100)} className="h-2" />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('6M')
  const [viewMode, setViewMode] = useState('grid')

  // Calculate derived metrics
  const totalClients = 1254
  const activeClients = 1042
  const totalAUM = 428000000 // 42.8 Cr in lakhs
  const avgPortfolio = 512000 // 5.12L in rupees
  const activeRate = (activeClients / totalClients) * 100

  const stats = [
    {
      title: "Total Clients",
      value: totalClients.toLocaleString(),
      change: "+12% this month",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      trend: "up"
    },
    {
      title: "Active Clients",
      value: activeClients.toLocaleString(),
      change: `${activeRate.toFixed(1)}% active rate`,
      icon: UserCheck,
      color: "from-emerald-500 to-green-500",
      trend: "up"
    },
    {
      title: "Total AUM",
      value: `₹${(totalAUM / 10000000).toFixed(1)} Cr`,
      change: "↑ ₹4.2 Cr growth",
      icon: IndianRupee,
      color: "from-purple-500 to-violet-500",
      trend: "up"
    },
    {
      title: "Avg. Portfolio",
      value: `₹${(avgPortfolio / 1000).toFixed(1)}L`,
      change: "Per client average",
      icon: PieChartIcon,
      color: "from-amber-500 to-orange-500",
      trend: "steady"
    }
  ]

  return (
    <AdminLayout activeTab="/admin/dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-w-7xl mx-auto px-4 md:px-6"
      >

        {/* Header with Filters */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Dashboard Overview
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Real-time insights into client portfolio and financial performance
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1M">Last Month</SelectItem>
                  <SelectItem value="3M">Last 3 Months</SelectItem>
                  <SelectItem value="6M">Last 6 Months</SelectItem>
                  <SelectItem value="1Y">Last Year</SelectItem>
                  <SelectItem value="YTD">Year to Date</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="relative overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                          <Icon className="h-5 w-5" style={{ 
                            background: `linear-gradient(${stat.color})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }} />
                        </div>
                        <Badge variant={stat.trend === "up" ? "success" : "secondary"} className="text-xs">
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          Trend
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {stat.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                          <ChartUp className="h-3 w-3 text-green-500" />
                          {stat.change}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div variants={itemVariants}>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Key Performance Indicators</CardTitle>
                  <CardDescription>Track your progress against targets</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <PerformanceCard key={index} {...metric} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Growth Chart */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Client Growth Trend</CardTitle>
                    <CardDescription>Monthly client acquisition and retention</CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    {totalClients.toLocaleString()} Total
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={clientGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <RechartsTooltip content={<ChartTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        name="Active Clients"
                        stroke="#3b82f6" 
                        fill="url(#clientGradient)"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="target" 
                        name="Target"
                        stroke="#94a3b8" 
                        fill="url(#targetGradient)"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                      />
                      <defs>
                        <linearGradient id="clientGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investment Distribution */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Portfolio Distribution</CardTitle>
                    <CardDescription>Asset allocation across investment types</CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <PieChartIcon className="h-3 w-3" />
                    ₹{Math.round(totalAUM / 10000000).toFixed(1)} Cr AUM
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investmentDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {investmentDistribution.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="white"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="rounded-lg border bg-white p-3 shadow-lg dark:bg-slate-800 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                                  <span className="font-semibold text-slate-900 dark:text-white">{data.name}</span>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                  Allocation: <span className="font-semibold">{data.value}%</span>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                  Trend: <span className={cn(
                                    "font-semibold",
                                    data.trend === 'up' ? 'text-green-600' : 
                                    data.trend === 'down' ? 'text-red-600' : 'text-amber-600'
                                  )}>
                                    {data.trend === 'up' ? '↗ Growing' : 
                                     data.trend === 'down' ? '↘ Declining' : '→ Stable'}
                                  </span>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend 
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value, entry: any) => (
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Departments & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Performance */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Department Performance</CardTitle>
                    <CardDescription>Client distribution and growth by department</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformance.map((dept, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xl">
                          {dept.icon}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{dept.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(dept.value / 125) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: dept.color }}
                              />
                            </div>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {dept.value} clients
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          "text-sm font-semibold flex items-center justify-end gap-1",
                          dept.growth > 10 ? "text-green-600" : "text-amber-600"
                        )}>
                          {dept.growth > 10 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {dept.growth}%
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">Growth</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest client interactions and updates</CardDescription>
                  </div>
                  <Badge variant="secondary" className="gap-1 animate-pulse">
                    <Zap className="h-3 w-3" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        activity.status === 'success' 
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                      )}>
                        {activity.status === 'success' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-slate-900 dark:text-white truncate">
                            {activity.client}
                          </p>
                          <Badge 
                            variant={activity.status === 'success' ? 'success' : 'secondary'}
                            className="text-xs"
                          >
                            {activity.status === 'success' ? 'Completed' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                          {activity.action}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-slate-500 dark:text-slate-500">
                            {activity.time}
                          </span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {activity.amount}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="ghost" className="w-full justify-center gap-2">
                    View All Activities
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Clients & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Clients */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <div>
                      <CardTitle>Top Performing Clients</CardTitle>
                      <CardDescription>Highest investment value and engagement</CardDescription>
                    </div>
                  </div>
                  <Select defaultValue="investment">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investment">By Investment</SelectItem>
                      <SelectItem value="growth">By Growth</SelectItem>
                      <SelectItem value="engagement">By Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topClients.map((client, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full font-bold",
                            index < 3 
                              ? "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-600 dark:text-amber-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          )}>
                            {client.rank}
                          </div>
                          {client.growth > 15 && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                              <ArrowUpRight className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{client.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {client.department} Department
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          {client.investment}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                              style={{ width: `${client.engagement}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {client.engagement}%
                          </span>
                        </div>
                        <p className={cn(
                          "text-xs font-medium",
                          parseFloat(client.growth) > 15 
                            ? "text-green-600" 
                            : parseFloat(client.growth) > 10 
                            ? "text-amber-600" 
                            : "text-slate-500"
                        )}>
                          {client.growth} Growth
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions & Insights */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <div>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700">
                  <UserPlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium text-blue-700 dark:text-blue-300">Add New Client</div>
                    <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Register new government employee</div>
                  </div>
                </Button>
                
                <Button className="w-full justify-start gap-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700">
                  <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-left">
                    <div className="font-medium text-emerald-700 dark:text-emerald-300">Generate Reports</div>
                    <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Monthly financial summaries</div>
                  </div>
                </Button>
                
                <Button className="w-full justify-start gap-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <div className="text-left">
                    <div className="font-medium text-amber-700 dark:text-amber-300">Pending Approvals</div>
                    <div className="text-xs text-amber-600/70 dark:text-amber-400/70">8 requests awaiting review</div>
                  </div>
                </Button>
                
                <Button className="w-full justify-start gap-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700">
                  <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-purple-700 dark:text-purple-300">Analytics Dashboard</div>
                    <div className="text-xs text-purple-600/70 dark:text-purple-400/70">Detailed performance insights</div>
                  </div>
                </Button>

                {/* Insights Section */}
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <h4 className="font-medium text-slate-900 dark:text-white">Today's Insight</h4>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <p>• Health department shows highest engagement at 92%</p>
                    <p>• Mutual Funds allocation increased by 5% this month</p>
                    <p>• 12 new clients registered from Education department</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </motion.div>
    </AdminLayout>
  )
}