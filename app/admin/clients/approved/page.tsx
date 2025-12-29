"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion" // ✅ Added AnimatePresence here
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  UserCheck, 
  Users, 
  Filter, 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  Building,
  Briefcase,
  Wallet,
  PieChart,
  Shield,
  Calendar,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  DollarSign
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const approvedClients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gov.in",
    phone: "+91 9876543210",
    department: "Income Tax Department",
    designation: "Assistant Commissioner",
    status: "Active",
    lastLogin: "2024-12-15",
    totalInvestment: 1250000,
    totalInsurance: 5000000,
    riskProfile: "Moderate",
    joinDate: "2023-06-15",
    feedbackScore: 4.8,
    whiteMoneyConverted: 350000
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@gov.in",
    phone: "+91 8765432109",
    department: "Central Excise",
    designation: "Deputy Commissioner",
    status: "Active",
    lastLogin: "2024-12-14",
    totalInvestment: 980000,
    totalInsurance: 3500000,
    riskProfile: "Conservative",
    joinDate: "2023-08-22",
    feedbackScore: 4.9,
    whiteMoneyConverted: 280000
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@gov.in",
    phone: "+91 7654321098",
    department: "Customs Department",
    designation: "Commissioner",
    status: "Active",
    lastLogin: "2024-12-13",
    totalInvestment: 875000,
    totalInsurance: 7500000,
    riskProfile: "Aggressive",
    joinDate: "2023-05-10",
    feedbackScore: 4.5,
    whiteMoneyConverted: 420000
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@gov.in",
    phone: "+91 6543210987",
    department: "Service Tax",
    designation: "Joint Commissioner",
    status: "Active",
    lastLogin: "2024-12-12",
    totalInvestment: 760000,
    totalInsurance: 4200000,
    riskProfile: "Moderate",
    joinDate: "2023-09-05",
    feedbackScore: 4.7,
    whiteMoneyConverted: 310000
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@gov.in",
    phone: "+91 5432109876",
    department: "CBDT",
    designation: "Director",
    status: "Active",
    lastLogin: "2024-12-10",
    totalInvestment: 650000,
    totalInsurance: 2800000,
    riskProfile: "Conservative",
    joinDate: "2023-11-20",
    feedbackScore: 4.6,
    whiteMoneyConverted: 220000
  },
  {
    id: 6,
    name: "Anjali Desai",
    email: "anjali.desai@gov.in",
    phone: "+91 4321098765",
    department: "Finance Ministry",
    designation: "Under Secretary",
    status: "Active",
    lastLogin: "2024-12-08",
    totalInvestment: 920000,
    totalInsurance: 3800000,
    riskProfile: "Moderate",
    joinDate: "2023-07-15",
    feedbackScore: 4.8,
    whiteMoneyConverted: 390000
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

export default function ApprovedClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<typeof approvedClients[0] | null>(null)

  const filteredClients = approvedClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewDetails = (client: typeof approvedClients[0]) => {
    setSelectedClient(client)
  }

  const handleCloseDetails = () => {
    setSelectedClient(null)
  }

  const handleDownloadReport = () => {
    const headers = ["Name", "Email", "Department", "Designation", "Total Investment", "Total Insurance", "Risk Profile", "Join Date"]
    const rows = approvedClients.map(client => [
      client.name,
      client.email,
      client.department,
      client.designation,
      client.totalInvestment,
      client.totalInsurance,
      client.riskProfile,
      client.joinDate
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `approved_clients_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AdminLayout activeTab="/admin/clients/approved">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Approved Clients</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Manage and view approved government employee clients
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownloadReport}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
          
          {/* Total Approved Clients */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">👥</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Total Approved</CardTitle>
                <div className="">
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {approvedClients.length}
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Active Government Employees
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Total Investment */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">💰</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Total Investment</CardTitle>
                <div className="">
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                ₹{approvedClients.reduce((acc, client) => acc + client.totalInvestment, 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Portfolio Value
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Total Insurance */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-violet-500 via-purple-600 to-violet-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">🛡️</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Total Insurance</CardTitle>
                <div className="">
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                ₹{approvedClients.reduce((acc, client) => acc + client.totalInsurance, 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Coverage Amount
                </span>
              </div>
            </CardContent>
          </Card>

          {/* White Money Converted */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-500 via-orange-600 to-amber-600 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">💵</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">White Money</CardTitle>
                <div className="">
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                ₹{approvedClients.reduce((acc, client) => acc + client.whiteMoneyConverted, 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Converted Amount
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SEARCH AND FILTER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search clients by name, email, or department..."
              className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 dark:border-slate-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400">
              <UserCheck className="h-3 w-3 mr-1" />
              All Active
            </Badge>
          </div>
        </motion.div>

        {/* CLIENTS TABLE */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100/50 dark:border-slate-800 bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-900/10 dark:to-slate-900/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-blue-900 dark:text-white">Approved Client List</CardTitle>
                  <CardDescription className="text-blue-600/80 dark:text-slate-400">
                    {filteredClients.length} approved government employee clients
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                  <Calendar className="h-3 w-3 mr-1" />
                  Updated Today
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-blue-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-900/80">
                    <TableRow className="border-b border-slate-100/50 dark:border-slate-800">
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-8 py-4">Client Details</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 py-4">Department</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right py-4">Investment</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right py-4">Insurance</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-center py-4">Risk Profile</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-center py-4 pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client, index) => (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        className="group border-b border-slate-100/50 dark:border-slate-800/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors"
                      >
                        <TableCell className="pl-8 py-5">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-bold">
                              {client.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white text-lg">{client.name}</p>
                              <div className="flex flex-col gap-1 mt-1">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3 text-slate-400" />
                                  <span className="text-sm text-slate-600 dark:text-slate-400">{client.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-slate-400" />
                                  <span className="text-sm text-slate-600 dark:text-slate-400">{client.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-3 w-3 text-slate-400" />
                                  <span className="text-xs text-slate-500 dark:text-slate-500">{client.designation}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-5">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-500" />
                            <span className="font-medium text-slate-700 dark:text-slate-300">{client.department}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-500 dark:text-slate-500">Joined: {client.joinDate}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-5">
                          <div className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                            ₹{client.totalInvestment.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">Portfolio Value</div>
                        </TableCell>
                        <TableCell className="text-right py-5">
                          <div className="font-bold text-lg text-violet-600 dark:text-violet-400">
                            ₹{client.totalInsurance.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">Coverage</div>
                        </TableCell>
                        <TableCell className="text-center py-5">
                          <Badge className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium border-0",
                            client.riskProfile === "Aggressive" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                            client.riskProfile === "Moderate" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
                            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          )}>
                            {client.riskProfile}
                          </Badge>
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 text-xs">
                              Score: {client.feedbackScore}/5
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-center py-5 pr-8">
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={() => handleViewDetails(client)}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
                              size="sm"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-200 dark:border-slate-700"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CLIENT DETAILS MODAL - Updated with proper AnimatePresence */}
        <AnimatePresence>
          {selectedClient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleCloseDetails}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 text-2xl font-bold">
                        {selectedClient.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                        <p className="text-white/80">{selectedClient.designation} • {selectedClient.department}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseDetails}
                      className="text-white hover:bg-white/20"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <UserCheck className="h-5 w-5 text-blue-500" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-500">Email</label>
                          <p className="text-slate-900 dark:text-white">{selectedClient.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-500">Phone</label>
                          <p className="text-slate-900 dark:text-white">{selectedClient.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-500">Join Date</label>
                          <p className="text-slate-900 dark:text-white">{selectedClient.joinDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-500">Last Login</label>
                          <p className="text-slate-900 dark:text-white">{selectedClient.lastLogin}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Financial Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-emerald-500" />
                          Financial Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-slate-500">Total Investment</p>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              ₹{selectedClient.totalInvestment.toLocaleString()}
                            </p>
                          </div>
                          <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                            <p className="text-sm text-slate-500">Total Insurance</p>
                            <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
                              ₹{selectedClient.totalInsurance.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <p className="text-sm text-slate-500">White Money Converted</p>
                          <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                            ₹{selectedClient.whiteMoneyConverted.toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Risk Profile & Feedback */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-amber-500" />
                          Risk & Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-500">Risk Profile</label>
                          <Badge className={cn(
                            "mt-1",
                            selectedClient.riskProfile === "Aggressive" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                            selectedClient.riskProfile === "Moderate" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
                            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          )}>
                            {selectedClient.riskProfile}
                          </Badge>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-500">Feedback Score</label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "h-5 w-5",
                                    i < Math.floor(selectedClient.feedbackScore) 
                                      ? "text-yellow-400 fill-yellow-400 dark:text-yellow-300" 
                                      : "text-slate-300 dark:text-slate-600"
                                  )}
                                >
                                  ★
                                </div>
                              ))}
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">
                              {selectedClient.feedbackScore}/5
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-purple-500" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Portfolio
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  )
}