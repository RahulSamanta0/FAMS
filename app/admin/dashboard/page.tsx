"use client"

import { useState } from 'react'
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, TrendingUp, DollarSign, Activity, Download, MoreVertical, ChevronRight } from "lucide-react"
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
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminClientManagement } from "@/components/admin-client-management"
import { AdminClientApproval } from "@/components/admin-client-approval"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const clientGrowthData = [
  { month: "Jan", clients: 45 },
  { month: "Feb", clients: 52 },
  { month: "Mar", clients: 58 },
  { month: "Apr", clients: 65 },
  { month: "May", clients: 73 },
  { month: "Jun", clients: 82 },
]

const investmentData = [
  { month: "Jan", amount: 2500000 },
  { month: "Feb", amount: 2800000 },
  { month: "Mar", amount: 3100000 },
  { month: "Apr", amount: 3400000 },
  { month: "May", amount: 3800000 },
  { month: "Jun", amount: 4200000 },
]

const clientStatusData = [
  { name: "Active", value: 68, color: "#22c55e" },
  { name: "Dormant", value: 14, color: "#f59e0b" },
  { name: "New", value: 10, color: "#3b82f6" },
]

const activityIcons = {
  investment: "📈",
  report: "📊",
  insurance: "🛡️",
  feedback: "⭐"
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: pld.color }}>
            {pld.name}: {pld.name === 'amount' ? `₹${pld.value.toLocaleString('en-IN')}` : pld.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Custom Pie Chart Tooltip
const PieCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-sm">{payload[0].value} clients</p>
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  const cardRefs = useRef<HTMLDivElement[]>([])
  const chartRefs = useRef<HTMLDivElement[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')
  useEffect(() => {
    // Animate cards on load
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
          }
        )
      }
    })

    // Animate charts on scroll
    chartRefs.current.forEach((chart, index) => {
      if (chart) {
        gsap.fromTo(chart,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: chart,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    // Animate stat numbers
    const statElements = document.querySelectorAll('.stat-number')
    statElements.forEach((el) => {
      const target = el as HTMLElement
      const finalValue = parseFloat(target.getAttribute('data-value') || '0')
      gsap.to(target, {
        innerText: finalValue,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <AdminLayout activeTab="/admin/dashboard">
      <div className="space-y-8">
        {/* Header with animated gradient */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-blue-100">Comprehensive overview of client activities and portfolio management</p>
          </div>
          <div className="absolute right-8 top-8">
            <Button variant="secondary" className="gap-2 backdrop-blur-sm bg-white/10 hover:bg-white/20">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Approved Clients
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Pending Approvals
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview Tab */}
          <TabsContent value="dashboard" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Clients", value: "82", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
            { title: "Active Clients", value: "68", change: "82.9% engagement", icon: UserCheck, color: "from-green-500 to-emerald-500" },
            { title: "Total AUM", value: "4.2 Cr", change: "↑ 15% monthly", icon: DollarSign, color: "from-purple-500 to-violet-500" },
            { title: "Avg. Portfolio", value: "5.12 L", change: "Per client", icon: Activity, color: "from-orange-500 to-amber-500" },
          ].map((stat, index) => (
            <div
              key={stat.title}
              ref={el => { if (el) cardRefs.current[index] = el }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <Card className="border-0 bg-transparent">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-sm font-semibold text-gray-600">{stat.title}</CardTitle>
                  <div className={`rounded-lg bg-gradient-to-r ${stat.color} p-2 text-white shadow-md`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 stat-number" data-value={stat.value.replace('Cr', '').replace('L', '')}>
                    {stat.value.includes('Cr') ? `₹${stat.value}` : `₹${stat.value}`}
                  </div>
                  <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Client Growth Chart */}
          <div ref={el => { if (el) chartRefs.current[0] = el }}>
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Client Growth</CardTitle>
                    <CardDescription>Total clients over the last 6 months</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={clientGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="clients" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Status Distribution */}
          <div ref={el => { if (el) chartRefs.current[1] = el }}>
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Client Status</CardTitle>
                    <CardDescription>Active vs Dormant vs New clients</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-white">82 Total</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clientStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {clientStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip content={<PieCustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Investment Growth Chart */}
        <div ref={el => { if (el) chartRefs.current[2] = el }}>
          <Card className="overflow-hidden border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Total Investments & Insurance (AUM)</CardTitle>
                  <CardDescription>Assets under management growth over time</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      content={<CustomTooltip />}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#8b5cf6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities with animated list */}
        <div ref={el => { if (el) chartRefs.current[3] = el }}>
          <Card className="overflow-hidden border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Recent Client Activities</CardTitle>
                  <CardDescription>Latest updates from your client portfolio</CardDescription>
                </div>
                <Badge variant="secondary" className="animate-pulse">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    client: "Rajesh Kumar",
                    action: "New SIP started",
                    amount: "₹10,000/month",
                    time: "2 hours ago",
                    type: "investment",
                    status: "completed"
                  },
                  {
                    client: "Priya Sharma",
                    action: "Tax report downloaded",
                    amount: "FY 2023-24",
                    time: "5 hours ago",
                    type: "report",
                    status: "completed"
                  },
                  {
                    client: "Amit Patel",
                    action: "Insurance premium paid",
                    amount: "₹25,000",
                    time: "1 day ago",
                    type: "insurance",
                    status: "pending"
                  },
                  {
                    client: "Sunita Verma",
                    action: "Feedback submitted",
                    amount: "5 star rating",
                    time: "2 days ago",
                    type: "feedback",
                    status: "completed"
                  },
                  {
                    client: "Rahul Mehta",
                    action: "Portfolio rebalanced",
                    amount: "+15% returns",
                    time: "3 days ago",
                    type: "investment",
                    status: "completed"
                  },
                ].map((activity, index) => (
                  <div 
                    key={index}
                    className="group flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-lg">
                        {activityIcons[activity.type as keyof typeof activityIcons]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{activity.client}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{activity.amount}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
          </TabsContent>

          {/* Approved Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <AdminClientManagement />
          </TabsContent>

          {/* Pending Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <AdminClientApproval />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}