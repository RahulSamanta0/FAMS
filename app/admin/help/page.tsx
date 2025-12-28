"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Users,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Shield,
  Zap,
  Headphones,
  FileText,
  Download,
  MoreVertical,
  Eye,
  TrendingUp,
  TrendingDown,
  Star,
  Calendar,
  Bell,
  Activity,
  UserCheck,
  MessageCircle,
  ShieldCheck,
  RefreshCw,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

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

/* ---------------- MOCK DATA ---------------- */

// Support Tickets
const supportTickets = [
  {
    id: "TKT-2025-001",
    clientName: "Rajesh Kumar",
    department: "Education",
    subject: "Unable to upload income tax documents",
    priority: "high",
    status: "open",
    assignedTo: "Admin 1",
    createdAt: "2025-01-15 14:30",
    lastUpdate: "2 hours ago",
    category: "technical",
    responseTime: "45 min",
    satisfaction: null
  },
  {
    id: "TKT-2025-002",
    clientName: "Priya Sharma",
    department: "Health",
    subject: "Investment portfolio not updating",
    priority: "high",
    status: "in_progress",
    assignedTo: "Admin 2",
    createdAt: "2025-01-14 10:15",
    lastUpdate: "1 day ago",
    category: "data_sync",
    responseTime: "1.2 hours",
    satisfaction: null
  },
  {
    id: "TKT-2025-003",
    clientName: "Amit Patel",
    department: "Revenue",
    subject: "Insurance premium payment failed",
    priority: "critical",
    status: "open",
    assignedTo: null,
    createdAt: "2025-01-15 09:45",
    lastUpdate: "Just now",
    category: "billing",
    responseTime: "15 min",
    satisfaction: null
  },
  {
    id: "TKT-2025-004",
    clientName: "Sunita Verma",
    department: "Finance",
    subject: "Request for tax saving investment suggestions",
    priority: "medium",
    status: "resolved",
    assignedTo: "Admin 1",
    createdAt: "2025-01-13 11:20",
    lastUpdate: "2 days ago",
    category: "investment_advice",
    responseTime: "2.3 hours",
    satisfaction: 5
  },
  {
    id: "TKT-2025-005",
    clientName: "Rahul Mehta",
    department: "Defense",
    subject: "Cannot access monthly financial report",
    priority: "medium",
    status: "open",
    assignedTo: null,
    createdAt: "2025-01-15 08:30",
    lastUpdate: "3 hours ago",
    category: "access",
    responseTime: "1.8 hours",
    satisfaction: null
  }
]

// Support Statistics
const supportStats = [
  { title: "Open Tickets", value: "12", change: "+2", icon: AlertCircle, color: "from-red-500 to-orange-500", bg: "from-red-50 to-orange-50" },
  { title: "In Progress", value: "8", change: "-1", icon: Clock, color: "from-amber-500 to-yellow-500", bg: "from-amber-50 to-yellow-50" },
  { title: "Resolved", value: "136", change: "+24", icon: CheckCircle, color: "from-emerald-500 to-green-500", bg: "from-emerald-50 to-green-50" },
  { title: "Avg Response Time", value: "2.4h", change: "-0.3h", icon: Activity, color: "from-blue-500 to-cyan-500", bg: "from-blue-50 to-cyan-50" },
  { title: "Satisfaction Rate", value: "96.2%", change: "+1.5%", icon: Star, color: "from-purple-500 to-violet-500", bg: "from-purple-50 to-violet-50" },
  { title: "Team Online", value: "4/5", change: "Active", icon: UserCheck, color: "from-indigo-500 to-blue-500", bg: "from-indigo-50 to-blue-50" },
]

// Team Members
const teamMembers = [
  { name: "Admin 1", role: "Senior Support", status: "online", tickets: 45, responseTime: "1.2h", satisfaction: "96%", lastActive: "Now" },
  { name: "Admin 2", role: "Support Specialist", status: "online", tickets: 38, responseTime: "1.8h", satisfaction: "94%", lastActive: "5 min ago" },
  { name: "Admin 3", role: "Technical Support", status: "away", tickets: 42, responseTime: "1.5h", satisfaction: "95%", lastActive: "30 min ago" },
  { name: "Admin 4", role: "Billing Support", status: "offline", tickets: 29, responseTime: "2.3h", satisfaction: "91%", lastActive: "2 hours ago" },
  { name: "Admin 5", role: "Investment Advisor", status: "online", tickets: 31, responseTime: "1.4h", satisfaction: "97%", lastActive: "Now" },
]

// Knowledge Base Articles
const knowledgeBase = [
  { id: "KB-001", title: "How to handle ITR filing errors", category: "tax", views: 245, updated: "2 days ago", helpful: "92%", status: "published" },
  { id: "KB-002", title: "Investment portfolio sync guide", category: "investment", views: 189, updated: "1 week ago", helpful: "88%", status: "published" },
  { id: "KB-003", title: "White income conversion process", category: "reporting", views: 156, updated: "3 days ago", helpful: "95%", status: "draft" },
  { id: "KB-004", title: "Asset declaration workflow", category: "assets", views: 132, updated: "2 weeks ago", helpful: "85%", status: "published" },
  { id: "KB-005", title: "Insurance premium tracking", category: "insurance", views: 98, updated: "4 days ago", helpful: "90%", status: "published" },
]

/* ---------------- COMPONENT ---------------- */

export default function AdminHelpSupport() {
  const [tickets, setTickets] = useState(supportTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState(supportTickets[0])
  const [autoAssign, setAutoAssign] = useState(true)
  const [systemAlerts, setSystemAlerts] = useState(true)

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  // Status and priority colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
      case "in_progress": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "resolved": return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600 text-white"
      case "high": return "bg-orange-500 text-white"
      case "medium": return "bg-yellow-500 text-gray-900"
      case "low": return "bg-blue-500 text-white"
      default: return "bg-gray-500 text-white"
    }
  }

  const handleAssignTicket = (ticketId: string, adminName: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, assignedTo: adminName, status: "in_progress" } : ticket
    ))
    if (selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({ ...prev, assignedTo: adminName, status: "in_progress" }))
    }
  }

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: "resolved" } : ticket
    ))
    if (selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({ ...prev, status: "resolved" }))
    }
  }

  return (
    <AdminLayout activeTab="/admin/help">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >

        {/* HEADER */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Help & Support Center
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage client support tickets and team performance
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* STATS CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {supportStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className={cn(
                "relative overflow-hidden border-0 shadow-lg transition-all duration-300",
                "bg-gradient-to-br",
                stat.bg,
                "dark:bg-slate-900 dark:border-slate-800"
              )}>
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-0 hover:opacity-10 transition-opacity duration-500",
                  stat.color
                )} />
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </CardTitle>
                    <div className={cn(
                      "rounded-lg p-2 text-white shadow-md",
                      "bg-gradient-to-r",
                      stat.color
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                    {stat.change.startsWith('+') ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : stat.change.startsWith('-') ? (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    ) : (
                      <Activity className="h-3 w-3 text-blue-500" />
                    )}
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        {/* MAIN CONTENT */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Knowledge Base
            </TabsTrigger>
          </TabsList>

          {/* TICKETS TAB */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ticket List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Filters */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search tickets..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">
                            Status
                          </label>
                          <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                              <SelectValue placeholder="All status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">
                            Priority
                          </label>
                          <Select value={filterPriority} onValueChange={setFilterPriority}>
                            <SelectTrigger>
                              <SelectValue placeholder="All priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Priority</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tickets Table */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800 dark:text-white">Support Tickets</CardTitle>
                        <CardDescription className="text-blue-600/80 dark:text-slate-400">
                          {filteredTickets.length} tickets found
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                        <TableRow>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Ticket ID</TableHead>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Client</TableHead>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Subject</TableHead>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Priority</TableHead>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Status</TableHead>
                          <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12 pr-6">Assigned To</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {filteredTickets.map((ticket, index) => (
                          <TableRow 
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={cn(
                              "hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800 cursor-pointer",
                              selectedTicket?.id === ticket.id && "bg-blue-50 dark:bg-blue-900/20"
                            )}
                          >
                            <TableCell className="pl-6 py-4 font-mono text-sm text-slate-500 dark:text-slate-400">
                              {ticket.id}
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-900 dark:text-slate-100">{ticket.clientName}</span>
                                <Badge variant="outline" className="w-fit mt-1 text-xs border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400">
                                  {ticket.department}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="max-w-[200px]">
                                <p className="font-medium text-slate-900 dark:text-slate-100 truncate">
                                  {ticket.subject}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                  {ticket.lastUpdate}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge variant="outline" className={getStatusColor(ticket.status)}>
                                {ticket.status.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell className="pr-6 py-4">
                              {ticket.assignedTo ? (
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                  {ticket.assignedTo}
                                </span>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleAssignTicket(ticket.id, "Admin 1")
                                  }}
                                >
                                  Assign
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Ticket Details */}
              <div className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800 dark:text-white">Ticket Details</CardTitle>
                        <CardDescription className="text-blue-600/80 dark:text-slate-400">
                          {selectedTicket?.id}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Client Info */}
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Client Information</h4>
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Name</span>
                          <span className="font-medium text-slate-900 dark:text-white">{selectedTicket.clientName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Department</span>
                          <Badge variant="outline">{selectedTicket.department}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Response Time</span>
                          <span className="font-medium text-slate-900 dark:text-white">{selectedTicket.responseTime}</span>
                        </div>
                        {selectedTicket.satisfaction && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Satisfaction</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn(
                                  "h-4 w-4",
                                  i < selectedTicket.satisfaction 
                                    ? "text-yellow-500 fill-yellow-500" 
                                    : "text-slate-300 dark:text-slate-600"
                                )} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</h4>
                      <div className="space-y-3">
                        {!selectedTicket.assignedTo && (
                          <Button 
                            className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                            onClick={() => handleAssignTicket(selectedTicket.id, "Admin 1")}
                          >
                            <UserCheck className="h-4 w-4" />
                            Assign to Me
                          </Button>
                        )}
                        
                        {selectedTicket.status !== "resolved" && (
                          <Button 
                            variant="outline" 
                            className="w-full gap-2"
                            onClick={() => handleResolveTicket(selectedTicket.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Mark as Resolved
                          </Button>
                        )}

                        <Button variant="outline" className="w-full gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Send Message
                        </Button>
                      </div>
                    </div>

                    {/* Ticket Info */}
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Ticket Information</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Category:</span>
                          <span className="font-medium text-slate-900 dark:text-white">{selectedTicket.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Created:</span>
                          <span className="font-medium text-slate-900 dark:text-white">{selectedTicket.createdAt}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Last Update:</span>
                          <span className="font-medium text-slate-900 dark:text-white">{selectedTicket.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Settings */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800 dark:text-white">System Settings</CardTitle>
                        <CardDescription className="text-blue-600/80 dark:text-slate-400">
                          Support system configuration
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Auto Assign Tickets</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Automatically assign new tickets</p>
                      </div>
                      <Switch checked={autoAssign} onCheckedChange={setAutoAssign} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">System Alerts</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Receive critical system notifications</p>
                      </div>
                      <Switch checked={systemAlerts} onCheckedChange={setSystemAlerts} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800 dark:text-white">Support Team</CardTitle>
                    <CardDescription className="text-blue-600/80 dark:text-slate-400">
                      Team performance and availability
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                    <TableRow>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Team Member</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Role</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Status</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Tickets</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Response Time</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12 pr-6">Satisfaction</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {teamMembers.map((member, index) => (
                      <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className={cn(
                                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900",
                                member.status === "online" ? "bg-green-500" :
                                member.status === "away" ? "bg-yellow-500" : "bg-slate-400"
                              )} />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-100">{member.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{member.lastActive}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300">
                          {member.role}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "capitalize",
                            member.status === "online" ? "border-green-200 text-green-700 dark:border-green-800 dark:text-green-400" :
                            member.status === "away" ? "border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-400" :
                            "border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-400"
                          )}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                          {member.tickets}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                          {member.responseTime}
                        </TableCell>
                        <TableCell className="pr-6">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium text-slate-900 dark:text-slate-100">{member.satisfaction}</span>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KNOWLEDGE BASE TAB */}
          <TabsContent value="knowledge" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-800 dark:text-white">Knowledge Base</CardTitle>
                      <CardDescription className="text-blue-600/80 dark:text-slate-400">
                        Documentation and support articles
                      </CardDescription>
                    </div>
                  </div>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <FileText className="h-4 w-4" />
                    Add Article
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                    <TableRow>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Article ID</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Title</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Category</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Views</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Helpful</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12 pr-6">Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {knowledgeBase.map((article, index) => (
                      <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                        <TableCell className="pl-6 py-4 font-mono text-sm text-slate-500 dark:text-slate-400">
                          {article.id}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="max-w-[300px]">
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              {article.title}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                              Updated {article.updated}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge variant="outline">{article.category}</Badge>
                        </TableCell>
                        <TableCell className="py-4 font-medium text-slate-900 dark:text-slate-100">
                          {article.views}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                style={{ width: article.helpful }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {article.helpful}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 py-4">
                          <Badge variant="outline" className={
                            article.status === "published" 
                              ? "border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
                              : "border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-400"
                          }>
                            {article.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  )
}