"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  Users, 
  Filter, 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  Building,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  UserPlus,
  ChevronRight,
  User,
  Shield,
  Wallet,
  Briefcase,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const pendingClients = [
  {
    id: 1,
    name: "Rohit Verma",
    email: "rohit.verma@gov.in",
    phone: "+91 9876543211",
    department: "Income Tax Department",
    designation: "Tax Assistant",
    submittedDate: "2024-12-15",
    status: "Under Review",
    verificationLevel: "Basic",
    missingDocuments: ["PAN Card", "Address Proof"],
    notes: "Documents pending verification",
    riskScore: 65,
    expectedInvestment: 300000,
    expectedInsurance: 2000000
  },
  {
    id: 2,
    name: "Meena Patel",
    email: "meena.patel@gov.in",
    phone: "+91 8765432110",
    department: "Central Excise",
    designation: "Superintendent",
    submittedDate: "2024-12-14",
    status: "Document Verification",
    verificationLevel: "Advanced",
    missingDocuments: ["Salary Slips"],
    notes: "Salary slips for last 3 months required",
    riskScore: 42,
    expectedInvestment: 450000,
    expectedInsurance: 1500000
  },
  {
    id: 3,
    name: "Sanjay Kumar",
    email: "sanjay.kumar@gov.in",
    phone: "+91 7654321109",
    department: "Customs Department",
    designation: "Appraiser",
    submittedDate: "2024-12-13",
    status: "Pending KYC",
    verificationLevel: "Basic",
    missingDocuments: ["Aadhaar Card", "Bank Statement"],
    notes: "Aadhaar verification failed, needs reupload",
    riskScore: 78,
    expectedInvestment: 250000,
    expectedInsurance: 1200000
  },
  {
    id: 4,
    name: "Kavita Singh",
    email: "kavita.singh@gov.in",
    phone: "+91 6543211098",
    department: "Service Tax",
    designation: "Inspector",
    submittedDate: "2024-12-12",
    status: "Risk Assessment",
    verificationLevel: "Advanced",
    missingDocuments: [],
    notes: "High risk profile, needs manual review",
    riskScore: 85,
    expectedInvestment: 600000,
    expectedInsurance: 3000000
  },
  {
    id: 5,
    name: "Arun Sharma",
    email: "arun.sharma@gov.in",
    phone: "+91 5432109877",
    department: "CBDT",
    designation: "Section Officer",
    submittedDate: "2024-12-10",
    status: "Ready for Approval",
    verificationLevel: "Complete",
    missingDocuments: [],
    notes: "All documents verified, ready for final approval",
    riskScore: 25,
    expectedInvestment: 550000,
    expectedInsurance: 2500000
  },
  {
    id: 6,
    name: "Pooja Reddy",
    email: "pooja.reddy@gov.in",
    phone: "+91 4321098766",
    department: "Finance Ministry",
    designation: "Assistant Director",
    submittedDate: "2024-12-08",
    status: "On Hold",
    verificationLevel: "Basic",
    missingDocuments: ["Income Proof", "IT Returns"],
    notes: "Waiting for IT return filing",
    riskScore: 55,
    expectedInvestment: 700000,
    expectedInsurance: 3500000
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

export default function PendingClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<typeof pendingClients[0] | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  const filteredClients = pendingClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewDetails = (client: typeof pendingClients[0]) => {
    setSelectedClient(client)
    setReviewNotes(client.notes || "")
  }

  const handleCloseDetails = () => {
    setSelectedClient(null)
    setReviewNotes("")
  }

  const handleApprove = () => {
    if (!selectedClient) return
    setActionLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert(`Client ${selectedClient.name} approved successfully!`)
      setActionLoading(false)
      handleCloseDetails()
    }, 1000)
  }

  const handleReject = () => {
    if (!selectedClient) return
    setActionLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert(`Client ${selectedClient.name} rejected.`)
      setActionLoading(false)
      handleCloseDetails()
    }, 1000)
  }

  const handleRequestDocuments = () => {
    if (!selectedClient) return
    setActionLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert(`Document request sent to ${selectedClient.name}`)
      setActionLoading(false)
    }, 1000)
  }

  const handleDownloadPendingReport = () => {
    const headers = ["Name", "Email", "Department", "Status", "Submitted Date", "Missing Documents", "Risk Score"]
    const rows = pendingClients.map(client => [
      client.name,
      client.email,
      client.department,
      client.status,
      client.submittedDate,
      client.missingDocuments.join(", "),
      client.riskScore
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `pending_clients_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Approval": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "Under Review": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "Document Verification": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "Pending KYC": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "Risk Assessment": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      case "On Hold": return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
      default: return "bg-slate-100 text-slate-700"
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    if (score >= 40) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
  }

  return (
    <AdminLayout activeTab="/admin/clients/pending">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pending Clients</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Review and approve new client applications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownloadPendingReport}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
          
          {/* Total Pending Clients */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-500 via-orange-600 to-amber-600 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">⏳</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Total Pending</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {pendingClients.length}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Awaiting Approval
                </span>
              </div>
            </CardContent>
          </Card>

          {/* High Priority */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-500 via-rose-600 to-red-600 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">🚨</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">High Risk</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {pendingClients.filter(c => c.riskScore >= 70).length}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Needs Immediate Review
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Ready for Approval */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-600 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">✅</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Ready to Approve</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {pendingClients.filter(c => c.status === "Ready for Approval").length}
              </div>
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Complete Verification
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Expected Investment */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">📊</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Expected Value</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <Wallet className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                ₹{pendingClients.reduce((acc, client) => acc + client.expectedInvestment, 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Total Expected Investment
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
              placeholder="Search pending clients by name, email, or status..."
              className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 dark:border-slate-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter by Status
            </Button>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400">
              <Clock className="h-3 w-3 mr-1" />
              {pendingClients.length} Pending
            </Badge>
          </div>
        </motion.div>

        {/* PENDING CLIENTS TABLE */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-900 dark:to-amber-900/10 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100/50 dark:border-slate-800 bg-gradient-to-r from-amber-50/50 to-white dark:from-amber-900/10 dark:to-slate-900/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-amber-900 dark:text-white">Pending Applications</CardTitle>
                  <CardDescription className="text-amber-600/80 dark:text-slate-400">
                    {filteredClients.length} clients awaiting review and approval
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                  <Calendar className="h-3 w-3 mr-1" />
                  Active Review Queue
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-amber-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-900/80">
                    <TableRow className="border-b border-slate-100/50 dark:border-slate-800">
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-8 py-4">Client Details</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 py-4">Status</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-center py-4">Risk Score</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right py-4">Expected Investment</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right py-4">Missing Docs</TableHead>
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
                        whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.05)" }}
                        className="group border-b border-slate-100/50 dark:border-slate-800/50 hover:bg-amber-50/30 dark:hover:bg-amber-900/5 transition-colors"
                      >
                        <TableCell className="pl-8 py-5">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold">
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
                                  <Building className="h-3 w-3 text-slate-400" />
                                  <span className="text-sm text-slate-600 dark:text-slate-400">{client.department}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3 text-slate-400" />
                                  <span className="text-xs text-slate-500 dark:text-slate-500">Submitted: {client.submittedDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-5">
                          <Badge className={cn("px-3 py-1.5 rounded-full text-xs font-medium border-0", getStatusColor(client.status))}>
                            {client.status}
                          </Badge>
                          <div className="mt-2 text-xs text-slate-500">
                            {client.verificationLevel} Verification
                          </div>
                        </TableCell>
                        <TableCell className="text-center py-5">
                          <div className="flex flex-col items-center">
                            <Badge className={cn("px-3 py-1.5 rounded-full text-xs font-medium border-0 mb-1", getRiskColor(client.riskScore))}>
                              {client.riskScore}/100
                            </Badge>
                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full",
                                  client.riskScore >= 70 ? "bg-red-500" :
                                  client.riskScore >= 40 ? "bg-amber-500" :
                                  "bg-emerald-500"
                                )}
                                style={{ width: `${client.riskScore}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-5">
                          <div className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                            ₹{client.expectedInvestment.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">Potential Investment</div>
                          <div className="text-xs text-violet-600 dark:text-violet-400">
                            ₹{client.expectedInsurance.toLocaleString()} Insurance
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-5">
                          {client.missingDocuments.length > 0 ? (
                            <div className="space-y-1">
                              {client.missingDocuments.slice(0, 2).map((doc, idx) => (
                                <Badge key={idx} variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 text-xs">
                                  {doc}
                                </Badge>
                              ))}
                              {client.missingDocuments.length > 2 && (
                                <span className="text-xs text-slate-500">
                                  +{client.missingDocuments.length - 2} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center py-5 pr-8">
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={() => handleViewDetails(client)}
                              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md"
                              size="sm"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-200 dark:border-slate-700"
                              disabled={client.missingDocuments.length === 0}
                              onClick={handleRequestDocuments}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Request Docs
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

        {/* CLIENT REVIEW MODAL */}
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
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-amber-600 text-2xl font-bold">
                        {selectedClient.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Review Application</h2>
                        <p className="text-white/80">{selectedClient.name} • {selectedClient.department}</p>
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
                    {/* Client Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-500" />
                          Client Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-500">Full Name</label>
                          <p className="text-slate-900 dark:text-white font-medium">{selectedClient.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-slate-500">Email</label>
                            <p className="text-slate-900 dark:text-white">{selectedClient.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-500">Phone</label>
                            <p className="text-slate-900 dark:text-white">{selectedClient.phone}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-slate-500">Department</label>
                            <p className="text-slate-900 dark:text-white">{selectedClient.department}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-500">Designation</label>
                            <p className="text-slate-900 dark:text-white">{selectedClient.designation}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-500">Submitted Date</label>
                          <p className="text-slate-900 dark:text-white">{selectedClient.submittedDate}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Risk & Status */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-amber-500" />
                          Risk & Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <label className="text-sm font-medium text-slate-500">Current Status</label>
                            <Badge className={cn("mt-1", getStatusColor(selectedClient.status))}>
                              {selectedClient.status}
                            </Badge>
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <label className="text-sm font-medium text-slate-500">Risk Score</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={cn(getRiskColor(selectedClient.riskScore))}>
                                {selectedClient.riskScore}/100
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-500">Verification Level</label>
                          <p className="text-slate-900 dark:text-white">{selectedClient.verificationLevel}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-500">Expected Financials</label>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <p className="text-xs text-slate-500">Investment</p>
                              <p className="font-bold text-blue-600 dark:text-blue-400">
                                ₹{selectedClient.expectedInvestment.toLocaleString()}
                              </p>
                            </div>
                            <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded">
                              <p className="text-xs text-slate-500">Insurance</p>
                              <p className="font-bold text-violet-600 dark:text-violet-400">
                                ₹{selectedClient.expectedInsurance.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Missing Documents */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-red-500" />
                          Document Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedClient.missingDocuments.length > 0 ? (
                          <div className="space-y-3">
                            <p className="text-sm text-slate-500">The following documents are required:</p>
                            <ul className="space-y-2">
                              {selectedClient.missingDocuments.map((doc, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                  <span className="text-slate-700 dark:text-slate-300">{doc}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              variant="outline"
                              className="w-full border-red-200 text-red-600 hover:bg-red-50"
                              onClick={handleRequestDocuments}
                              disabled={actionLoading}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Request Documents
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                            <p className="text-emerald-600 dark:text-emerald-400 font-medium">All documents submitted and verified</p>
                            <p className="text-sm text-slate-500 mt-1">Ready for approval</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Review Notes & Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-purple-500" />
                          Review & Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-500">Review Notes</label>
                          <Textarea
                            placeholder="Add your review notes here..."
                            className="mt-1 min-h-[100px]"
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                          />
                        </div>
                        <div className="space-y-3">
                          <Button
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                            onClick={handleApprove}
                            disabled={actionLoading || selectedClient.missingDocuments.length > 0}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {actionLoading ? "Processing..." : "Approve Client"}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-red-200 text-red-600 hover:bg-red-50"
                            onClick={handleReject}
                            disabled={actionLoading}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            {actionLoading ? "Processing..." : "Reject Application"}
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full"
                            onClick={handleCloseDetails}
                            disabled={actionLoading}
                          >
                            Cancel Review
                          </Button>
                        </div>
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