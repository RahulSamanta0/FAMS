"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
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
  Home,
  Car,
  Banknote,
  TrendingUp,
  TrendingDown,
  FileText,
  User,
  Users as Family,
  Landmark,
  CreditCard,
  Gem,
  Clock,
  MessageSquare,
  ChevronRight,
  BarChart3,
  LineChart,
  DollarSign,
  Percent,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const clients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gov.in",
    phone: "+91 9876543210",
    department: "Income Tax Department",
    designation: "Assistant Commissioner",
    salary: 125000,
    joinDate: "2018-06-15",
    pan: "ABCDE1234F",
    aadhaar: "1234 5678 9012",
    status: "Active",
    
    // Family Details
    family: [
      { name: "Priya Kumar", relation: "Spouse", profession: "Doctor", income: 800000 },
      { name: "Rahul Kumar", relation: "Son", profession: "Student", income: 0 },
      { name: "Sunita Kumar", relation: "Mother", profession: "Homemaker", income: 0 }
    ],
    
    // Immovable Properties
    immovableProperties: [
      { type: "Residential House", location: "Delhi", area: "1200 sq ft", purchaseDate: "2015-03-10", value: 8500000 },
      { type: "Agricultural Land", location: "Haryana", area: "2 Acres", purchaseDate: "2020-08-22", value: 3500000 }
    ],
    
    // Movable Properties
    movableProperties: [
      { type: "Car", brand: "Toyota Innova", year: "2022", value: 2200000 },
      { type: "Jewelry", description: "Family Gold", weight: "500g", value: 350000 }
    ],
    
    // Investments
    investments: [
      { type: "Mutual Funds", name: "HDFC Balanced Fund", amount: 500000, returns: 12.5, startDate: "2021-03-15" },
      { type: "Stocks", name: "TCS Limited", amount: 350000, returns: 8.7, startDate: "2022-06-10" },
      { type: "Fixed Deposit", name: "SBI FD", amount: 1000000, returns: 6.5, startDate: "2020-08-01" },
      { type: "PPF", name: "Public Provident Fund", amount: 750000, returns: 7.1, startDate: "2019-04-01" }
    ],
    
    // Insurance Policies
    insurance: [
      { type: "Life Insurance", provider: "LIC", sumAssured: 5000000, premium: 120000, maturityDate: "2040-12-31" },
      { type: "Health Insurance", provider: "Star Health", sumAssured: 1000000, premium: 25000, maturityDate: "2025-12-31" },
      { type: "Vehicle Insurance", provider: "ICICI Lombard", sumAssured: 2200000, premium: 18000, maturityDate: "2024-12-15" }
    ],
    
    // Bank Accounts
    bankAccounts: [
      { bank: "State Bank of India", accountNo: "XXXXXX1234", type: "Savings", balance: 450000 },
      { bank: "HDFC Bank", accountNo: "XXXXXX5678", type: "Current", balance: 280000 }
    ],
    
    // Demat Accounts
    dematAccounts: [
      { provider: "Zerodha", accountNo: "ZD12345678", holdingsValue: 850000 },
      { provider: "ICICI Direct", accountNo: "IC98765432", holdingsValue: 350000 }
    ],
    
    // Tax Information
    tax: {
      regime: "New",
      totalIncome: 2050000,
      taxPaid: 450000,
      deductions: 350000,
      filingStatus: "Filed for FY 2023-24"
    },
    
    // White Money Conversion
    whiteMoney: [
      { source: "Agricultural Income", amount: 350000, familyMember: "Rajesh Kumar" },
      { source: "Professional Fees", amount: 200000, familyMember: "Priya Kumar" },
      { source: "Consultancy", amount: 150000, familyMember: "Rajesh Kumar" }
    ],
    
    // Risk Profile
    riskProfile: {
      score: 65,
      category: "Moderate",
      investmentHorizon: "10-15 Years",
      goals: ["Child Education", "Retirement", "House Purchase"]
    },
    
    // Communication Log
    communications: [
      { date: "2024-12-15", type: "Meeting", topic: "Portfolio Review", notes: "Discussed rebalancing strategy" },
      { date: "2024-11-20", type: "Email", topic: "Tax Saving Options", notes: "Sent ELSS fund suggestions" },
      { date: "2024-10-05", type: "Call", topic: "Insurance Renewal", notes: "Reminded about health insurance renewal" }
    ]
  },
  // Add more clients as needed...
]

/* ---------------- ANIMATION VARIANTS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export default function ClientFactSheetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(clients[0])
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedYear, setSelectedYear] = useState("2024")

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalInvestment = selectedClient?.investments.reduce((sum, inv) => sum + inv.amount, 0) || 0
  const totalInsurance = selectedClient?.insurance.reduce((sum, ins) => sum + ins.sumAssured, 0) || 0
  const totalAssets = totalInvestment + 
    (selectedClient?.immovableProperties.reduce((sum, prop) => sum + prop.value, 0) || 0) +
    (selectedClient?.movableProperties.reduce((sum, prop) => sum + prop.value, 0) || 0)
  const totalWhiteMoney = selectedClient?.whiteMoney.reduce((sum, wm) => sum + wm.amount, 0) || 0

  const handleDownloadFactSheet = () => {
    if (!selectedClient) return
    
    const headers = ["Category", "Details", "Value"]
    const rows = [
      ["Client Name", selectedClient.name, ""],
      ["Department", selectedClient.department, ""],
      ["Designation", selectedClient.designation, ""],
      ["Monthly Salary", "", `₹${selectedClient.salary.toLocaleString()}`],
      ["Total Investment", "", `₹${totalInvestment.toLocaleString()}`],
      ["Total Insurance", "", `₹${totalInsurance.toLocaleString()}`],
      ["Total Assets", "", `₹${totalAssets.toLocaleString()}`],
      ["White Money Converted", "", `₹${totalWhiteMoney.toLocaleString()}`],
    ]

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `factsheet_${selectedClient.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportAll = () => {
    alert("Exporting all client fact sheets...")
  }

  return (
    <AdminLayout activeTab="/admin/clients/factsheets">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Client Fact Sheets</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Comprehensive financial overview of all approved clients
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownloadFactSheet}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
              disabled={!selectedClient}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Fact Sheet
            </Button>
            <Button
              variant="outline"
              onClick={handleExportAll}
              className="border-slate-200 dark:border-slate-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* LEFT SIDEBAR - CLIENT LIST */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm h-full">
              <CardHeader className="border-b border-slate-100/50 dark:border-slate-800 bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-900/10 dark:to-slate-900/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-blue-900 dark:text-white">Client Directory</CardTitle>
                  <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                    {clients.length} Clients
                  </Badge>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search clients..."
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredClients.map((client, index) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => setSelectedClient(client)}
                        className={cn(
                          "w-full p-4 text-left border-b border-slate-100/50 dark:border-slate-800/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors",
                          selectedClient?.id === client.id && "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold",
                            selectedClient?.id === client.id 
                              ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                              : "bg-gradient-to-br from-slate-400 to-slate-600"
                          )}>
                            {client.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 dark:text-white">{client.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Building className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {client.department}
                              </span>
                            </div>
                          </div>
                          {selectedClient?.id === client.id && (
                            <ChevronRight className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs">
                            <Wallet className="h-3 w-3 mr-1" />
                            ₹{client.investments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
                          </Badge>
                          <span className="text-xs text-slate-500">{client.designation}</span>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT PANEL - CLIENT DETAILS */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            {selectedClient ? (
              <div className="space-y-6">
                {/* CLIENT HEADER */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                          {selectedClient.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedClient.name}</h2>
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-blue-500" />
                              <span className="text-slate-600 dark:text-slate-300">{selectedClient.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-blue-500" />
                              <span className="text-slate-600 dark:text-slate-300">{selectedClient.designation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span className="text-slate-600 dark:text-slate-300">Since {selectedClient.joinDate}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-4">
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              <User className="h-3 w-3 mr-1" />
                              PAN: {selectedClient.pan}
                            </Badge>
                            <Badge variant="outline" className="border-green-200 text-green-600 dark:border-green-800 dark:text-green-400">
                              <Shield className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-500">Monthly Salary</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            ₹{selectedClient.salary.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-white dark:from-slate-800 dark:to-slate-900">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-500">Total Investment</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            ₹{totalInvestment.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-white dark:from-slate-800 dark:to-slate-900">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-500">Total Insurance</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            ₹{totalInsurance.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                          <Shield className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-white dark:from-slate-800 dark:to-slate-900">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-500">White Money</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            ₹{totalWhiteMoney.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                          <Banknote className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* DETAILED TABS */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-7 w-full bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="family" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Family
                    </TabsTrigger>
                    <TabsTrigger value="assets" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Assets
                    </TabsTrigger>
                    <TabsTrigger value="investments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Investments
                    </TabsTrigger>
                    <TabsTrigger value="insurance" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Insurance
                    </TabsTrigger>
                    <TabsTrigger value="tax" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Tax
                    </TabsTrigger>
                    <TabsTrigger value="communications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Communications
                    </TabsTrigger>
                  </TabsList>

                  {/* OVERVIEW TAB */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-500" />
                            Personal Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                          <div>
                            <label className="text-sm font-medium text-slate-500">Aadhaar Number</label>
                            <p className="text-slate-900 dark:text-white">{selectedClient.aadhaar}</p>
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
                        </CardContent>
                      </Card>

                      {/* Risk Profile */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-amber-500" />
                            Risk Profile & Goals
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-slate-500">Risk Category</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={cn(
                                "px-3 py-1",
                                selectedClient.riskProfile.category === "Aggressive" ? "bg-red-100 text-red-700" :
                                selectedClient.riskProfile.category === "Moderate" ? "bg-amber-100 text-amber-700" :
                                "bg-green-100 text-green-700"
                              )}>
                                {selectedClient.riskProfile.category}
                              </Badge>
                              <span className="text-sm text-slate-500">Score: {selectedClient.riskProfile.score}/100</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-500">Investment Horizon</label>
                            <p className="text-slate-900 dark:text-white">{selectedClient.riskProfile.investmentHorizon}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-500">Financial Goals</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedClient.riskProfile.goals.map((goal, idx) => (
                                <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                  {goal}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Financial Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-emerald-500" />
                          Financial Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-slate-500">Total Net Worth</p>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              ₹{totalAssets.toLocaleString()}
                            </p>
                          </div>
                          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                            <p className="text-sm text-slate-500">Annual Income</p>
                            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                              ₹{(selectedClient.salary * 12 + selectedClient.family.reduce((sum, f) => sum + f.income, 0)).toLocaleString()}
                            </p>
                          </div>
                          <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                            <p className="text-sm text-slate-500">Bank Balance</p>
                            <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
                              ₹{selectedClient.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
                            </p>
                          </div>
                          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <p className="text-sm text-slate-500">Demat Holdings</p>
                            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                              ₹{selectedClient.dematAccounts.reduce((sum, acc) => sum + acc.holdingsValue, 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* FAMILY TAB */}
                  <TabsContent value="family">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Family className="h-5 w-5 text-purple-500" />
                          Family Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Relation</TableHead>
                              <TableHead>Profession</TableHead>
                              <TableHead className="text-right">Annual Income</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedClient.family.map((member, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{member.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                    {member.relation}
                                  </Badge>
                                </TableCell>
                                <TableCell>{member.profession}</TableCell>
                                <TableCell className="text-right font-bold">
                                  ₹{member.income.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ASSETS TAB */}
                  <TabsContent value="assets" className="space-y-6">
                    {/* Immovable Properties */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Home className="h-5 w-5 text-amber-500" />
                          Immovable Properties
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Area</TableHead>
                              <TableHead>Purchase Date</TableHead>
                              <TableHead className="text-right">Current Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedClient.immovableProperties.map((property, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{property.type}</TableCell>
                                <TableCell>{property.location}</TableCell>
                                <TableCell>{property.area}</TableCell>
                                <TableCell>{property.purchaseDate}</TableCell>
                                <TableCell className="text-right font-bold text-emerald-600 dark:text-emerald-400">
                                  ₹{property.value.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    {/* Movable Properties */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Car className="h-5 w-5 text-blue-500" />
                          Movable Properties
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Details</TableHead>
                              <TableHead className="text-right">Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedClient.movableProperties.map((property, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{property.type}</TableCell>
                                <TableCell>{property.description || property.brand || '-'}</TableCell>
                                <TableCell>{property.year || property.weight || '-'}</TableCell>
                                <TableCell className="text-right font-bold text-violet-600 dark:text-violet-400">
                                  ₹{property.value.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* INVESTMENTS TAB */}
                  <TabsContent value="investments">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-emerald-500" />
                          Investment Portfolio
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Investment Name</TableHead>
                              <TableHead>Start Date</TableHead>
                              <TableHead className="text-right">Invested Amount</TableHead>
                              <TableHead className="text-right">Returns</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedClient.investments.map((investment, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <Badge variant="outline" className={
                                    investment.type === "Mutual Funds" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                    investment.type === "Stocks" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                                    "bg-amber-50 text-amber-600 border-amber-200"
                                  }>
                                    {investment.type}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{investment.name}</TableCell>
                                <TableCell>{investment.startDate}</TableCell>
                                <TableCell className="text-right font-bold">
                                  ₹{investment.amount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Badge className={
                                    investment.returns >= 0 
                                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  }>
                                    {investment.returns >= 0 ? '+' : ''}{investment.returns}%
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* INSURANCE TAB */}
                  <TabsContent value="insurance">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-violet-500" />
                          Insurance Policies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Provider</TableHead>
                              <TableHead>Maturity Date</TableHead>
                              <TableHead className="text-right">Sum Assured</TableHead>
                              <TableHead className="text-right">Premium</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedClient.insurance.map((policy, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <Badge variant="outline" className={
                                    policy.type === "Life Insurance" ? "bg-red-50 text-red-600 border-red-200" :
                                    policy.type === "Health Insurance" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                                    "bg-blue-50 text-blue-600 border-blue-200"
                                  }>
                                    {policy.type}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{policy.provider}</TableCell>
                                <TableCell>{policy.maturityDate}</TableCell>
                                <TableCell className="text-right font-bold text-violet-600 dark:text-violet-400">
                                  ₹{policy.sumAssured.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  ₹{policy.premium.toLocaleString()}/year
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* TAX TAB */}
                  <TabsContent value="tax">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Percent className="h-5 w-5 text-amber-500" />
                          Tax Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-slate-500">Tax Regime</label>
                              <Badge className={
                                selectedClient.tax.regime === "New" 
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }>
                                {selectedClient.tax.regime} Regime
                              </Badge>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-500">Total Annual Income</label>
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                ₹{selectedClient.tax.totalIncome.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-500">Filing Status</label>
                              <p className="text-slate-900 dark:text-white">{selectedClient.tax.filingStatus}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <p className="text-sm text-slate-500">Tax Paid (Last FY)</p>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ₹{selectedClient.tax.taxPaid.toLocaleString()}
                              </p>
                            </div>
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                              <p className="text-sm text-slate-500">Total Deductions</p>
                              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                ₹{selectedClient.tax.deductions.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* COMMUNICATIONS TAB */}
                  <TabsContent value="communications">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                          Communication Log
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedClient.communications.map((comm, idx) => (
                            <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className={
                                    comm.type === "Meeting" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                    comm.type === "Email" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                                    "bg-amber-50 text-amber-600 border-amber-200"
                                  }>
                                    {comm.type}
                                  </Badge>
                                  <span className="font-medium text-slate-900 dark:text-white">{comm.topic}</span>
                                </div>
                                <span className="text-sm text-slate-500">{comm.date}</span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400">{comm.notes}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm h-96 flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <Users className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No Client Selected</h3>
                  <p className="text-slate-500 dark:text-slate-400">Select a client from the directory to view their fact sheet</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}