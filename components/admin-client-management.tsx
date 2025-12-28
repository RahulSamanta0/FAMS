// "use client"

// import { useState, useEffect, useRef } from 'react'
// import { 
//   Card, CardContent, CardDescription, CardHeader, CardTitle 
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { 
//   Search, Filter, MoreVertical, Eye, Mail, Phone, 
//   Building, Briefcase, Home, Car, TrendingUp, Shield, 
//   DollarSign, Users, Calendar, Activity,
//   BarChart3, Download, MessageSquare, Star, TrendingDown,
//   ArrowUpRight, ArrowDownRight, IndianRupee
// } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
//   ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
// } from "recharts"
// import { toast } from "sonner"
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger)
// }

// // Mock data for approved clients
// const mockClients = [
//   {
//     id: 'CL001',
//     name: 'Rajesh Kumar',
//     email: 'rajesh.kumar@gov.in',
//     phone: '+91 9876543210',
//     department: 'Education',
//     designation: 'Assistant Professor',
//     joiningDate: '2018-06-15',
//     status: 'active',
//     riskProfile: 'Moderate',
//     engagement: 95,
//     lastActive: '2 hours ago',
    
//     // Financial Data
//     salary: {
//       basic: 45000,
//       hra: 18000,
//       da: 9000,
//       other: 13000,
//       net: 85000
//     },
    
//     family: {
//       spouse: 'Priya Kumar',
//       children: 2,
//       dependents: 1
//     },
    
//     assets: {
//       immovable: 3,
//       movable: 4,
//       totalValue: 4200000
//     },
    
//     investments: {
//       mutualFunds: 450000,
//       stocks: 280000,
//       fds: 200000,
//       ppf: 150000,
//       others: 120000,
//       total: 1200000,
//       growth: 18.5
//     },
    
//     insurance: {
//       life: 5000000,
//       health: 3000000,
//       vehicle: 1000000,
//       total: 9000000,
//       policies: 4
//     },
    
//     // Performance Metrics
//     financialHealth: 85,
//     taxEfficiency: 78,
//     savingsRate: 32,
//     debtRatio: 15
//   },
//   {
//     id: 'CL002',
//     name: 'Priya Sharma',
//     email: 'priya.sharma@gov.in',
//     phone: '+91 8765432109',
//     department: 'Health',
//     designation: 'Medical Officer',
//     joiningDate: '2019-03-22',
//     status: 'active',
//     riskProfile: 'Conservative',
//     engagement: 88,
//     lastActive: '1 day ago',
    
//     salary: {
//       basic: 52000,
//       hra: 20800,
//       da: 10400,
//       other: 8800,
//       net: 92000
//     },
    
//     family: {
//       spouse: 'Rahul Sharma',
//       children: 1,
//       dependents: 0
//     },
    
//     assets: {
//       immovable: 2,
//       movable: 3,
//       totalValue: 2800000
//     },
    
//     investments: {
//       mutualFunds: 320000,
//       stocks: 180000,
//       fds: 300000,
//       ppf: 100000,
//       others: 50000,
//       total: 950000,
//       growth: 12.3
//     },
    
//     insurance: {
//       life: 3000000,
//       health: 5000000,
//       vehicle: 800000,
//       total: 8800000,
//       policies: 3
//     },
    
//     financialHealth: 92,
//     taxEfficiency: 85,
//     savingsRate: 28,
//     debtRatio: 8
//   },
//   {
//     id: 'CL003',
//     name: 'Amit Patel',
//     email: 'amit.patel@gov.in',
//     phone: '+91 7654321098',
//     department: 'Revenue',
//     designation: 'Tehsildar',
//     joiningDate: '2017-11-05',
//     status: 'active',
//     riskProfile: 'Aggressive',
//     engagement: 76,
//     lastActive: '3 days ago',
    
//     salary: {
//       basic: 40000,
//       hra: 16000,
//       da: 8000,
//       other: 14000,
//       net: 78000
//     },
    
//     family: {
//       spouse: 'Neha Patel',
//       children: 2,
//       dependents: 2
//     },
    
//     assets: {
//       immovable: 4,
//       movable: 5,
//       totalValue: 6500000
//     },
    
//     investments: {
//       mutualFunds: 600000,
//       stocks: 450000,
//       fds: 150000,
//       ppf: 120000,
//       others: 80000,
//       total: 1400000,
//       growth: 24.7
//     },
    
//     insurance: {
//       life: 8000000,
//       health: 4000000,
//       vehicle: 1500000,
//       total: 13500000,
//       policies: 5
//     },
    
//     financialHealth: 78,
//     taxEfficiency: 65,
//     savingsRate: 25,
//     debtRatio: 22
//   },
//   {
//     id: 'CL004',
//     name: 'Sunita Verma',
//     email: 'sunita.verma@gov.in',
//     phone: '+91 6543210987',
//     department: 'Police',
//     designation: 'Inspector',
//     joiningDate: '2020-08-19',
//     status: 'dormant',
//     riskProfile: 'Moderate',
//     engagement: 45,
//     lastActive: '2 weeks ago',
    
//     salary: {
//       basic: 55000,
//       hra: 22000,
//       da: 11000,
//       other: 7000,
//       net: 95000
//     },
    
//     family: {
//       spouse: 'Raj Verma',
//       children: 1,
//       dependents: 0
//     },
    
//     assets: {
//       immovable: 1,
//       movable: 2,
//       totalValue: 1800000
//     },
    
//     investments: {
//       mutualFunds: 150000,
//       stocks: 80000,
//       fds: 200000,
//       ppf: 100000,
//       others: 30000,
//       total: 560000,
//       growth: 8.2
//     },
    
//     insurance: {
//       life: 2000000,
//       health: 3000000,
//       vehicle: 600000,
//       total: 5600000,
//       policies: 2
//     },
    
//     financialHealth: 65,
//     taxEfficiency: 58,
//     savingsRate: 18,
//     debtRatio: 35
//   },
//   {
//     id: 'CL005',
//     name: 'Rahul Mehta',
//     email: 'rahul.mehta@gov.in',
//     phone: '+91 7432165098',
//     department: 'Transport',
//     designation: 'Assistant Director',
//     joiningDate: '2019-12-10',
//     status: 'active',
//     riskProfile: 'Moderate',
//     engagement: 92,
//     lastActive: '5 hours ago',
    
//     salary: {
//       basic: 48000,
//       hra: 19200,
//       da: 9600,
//       other: 13200,
//       net: 90000
//     },
    
//     family: {
//       spouse: 'Anjali Mehta',
//       children: 0,
//       dependents: 1
//     },
    
//     assets: {
//       immovable: 2,
//       movable: 3,
//       totalValue: 3500000
//     },
    
//     investments: {
//       mutualFunds: 380000,
//       stocks: 220000,
//       fds: 250000,
//       ppf: 120000,
//       others: 70000,
//       total: 1040000,
//       growth: 15.8
//     },
    
//     insurance: {
//       life: 4000000,
//       health: 3500000,
//       vehicle: 900000,
//       total: 8400000,
//       policies: 3
//     },
    
//     financialHealth: 88,
//     taxEfficiency: 82,
//     savingsRate: 30,
//     debtRatio: 12
//   }
// ]

// // Investment allocation data for pie chart
// const investmentAllocationData = [
//   { name: 'Mutual Funds', value: 45, color: '#3b82f6' },
//   { name: 'Stocks', value: 23, color: '#8b5cf6' },
//   { name: 'Fixed Deposits', value: 18, color: '#10b981' },
//   { name: 'PPF', value: 9, color: '#f59e0b' },
//   { name: 'Others', value: 5, color: '#ef4444' }
// ]

// // Performance trend data
// const performanceTrendData = [
//   { month: 'Jan', clients: 45, investment: 3200000 },
//   { month: 'Feb', clients: 52, investment: 3800000 },
//   { month: 'Mar', clients: 58, investment: 4200000 },
//   { month: 'Apr', clients: 65, investment: 4800000 },
//   { month: 'May', clients: 73, investment: 5500000 },
//   { month: 'Jun', clients: 82, investment: 6200000 }
// ]

// export function AdminClientManagement() {
//   const [clients, setClients] = useState(mockClients)
//   const [selectedClient, setSelectedClient] = useState<any>(mockClients[0])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterStatus, setFilterStatus] = useState('all')
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
//   const cardRefs = useRef<HTMLDivElement[]>([])
//   const chartRefs = useRef<HTMLDivElement[]>([])

//   useEffect(() => {
//     // Animate cards on load
//     cardRefs.current.forEach((card, index) => {
//       if (card) {
//         gsap.fromTo(card,
//           { y: 30, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.6,
//             delay: index * 0.1,
//             ease: "power2.out"
//           }
//         )
//       }
//     })

//     // Animate charts
//     chartRefs.current.forEach((chart, index) => {
//       if (chart) {
//         gsap.fromTo(chart,
//           { scale: 0.9, opacity: 0 },
//           {
//             scale: 1,
//             opacity: 1,
//             duration: 0.8,
//             delay: index * 0.2,
//             scrollTrigger: {
//               trigger: chart,
//               start: "top 80%",
//               toggleActions: "play none none reverse"
//             }
//           }
//         )
//       }
//     })

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill())
//     }
//   }, [])

//   // Filter clients based on search and status
//   const filteredClients = clients.filter(client => {
//     const matchesSearch = 
//       client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.department.toLowerCase().includes(searchTerm.toLowerCase())
    
//     const matchesStatus = 
//       filterStatus === 'all' || 
//       client.status === filterStatus ||
//       (filterStatus === 'high-value' && client.assets.totalValue > 4000000)
    
//     return matchesSearch && matchesStatus
//   })

//   const handleViewClient = (client: any) => {
//     setSelectedClient(client)
//     gsap.fromTo('#client-detail-view',
//       { x: 100, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.4 }
//     )
//   }

//   const sendReminder = (clientId: string) => {
//     toast.success('Reminder sent successfully', {
//       description: 'Client has been notified via email and app notification.'
//     })
//   }

//   const exportClientReport = (client: any) => {
//     toast.info('Report generation started', {
//       description: 'Client financial report will be downloaded shortly.'
//     })
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800'
//       case 'dormant': return 'bg-yellow-100 text-yellow-800'
//       case 'inactive': return 'bg-red-100 text-red-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const getRiskColor = (risk: string) => {
//     switch (risk) {
//       case 'Conservative': return 'bg-blue-100 text-blue-800'
//       case 'Moderate': return 'bg-green-100 text-green-800'
//       case 'Aggressive': return 'bg-orange-100 text-orange-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   // Calculate summary statistics
//   const totalClients = clients.length
//   const activeClients = clients.filter(c => c.status === 'active').length
//   const totalInvestment = clients.reduce((sum, client) => sum + client.investments.total, 0)
//   const totalInsurance = clients.reduce((sum, client) => sum + client.insurance.total, 0)

//   return (
//     <div className="space-y-6">
//       {/* Header with Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Clients</p>
//                 <p className="text-2xl font-bold">{totalClients}</p>
//                 <p className="text-xs text-green-600 flex items-center gap-1">
//                   <ArrowUpRight className="h-3 w-3" /> +12% this month
//                 </p>
//               </div>
//               <div className="rounded-lg bg-blue-100 p-3">
//                 <Users className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Active Clients</p>
//                 <p className="text-2xl font-bold">{activeClients}</p>
//                 <p className="text-xs text-gray-500">{((activeClients/totalClients)*100).toFixed(0)}% engagement</p>
//               </div>
//               <div className="rounded-lg bg-green-100 p-3">
//                 <Activity className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Investments</p>
//                 <p className="text-2xl font-bold">₹{(totalInvestment/100000).toFixed(1)}L</p>
//                 <p className="text-xs text-green-600 flex items-center gap-1">
//                   <ArrowUpRight className="h-3 w-3" /> +15.8% growth
//                 </p>
//               </div>
//               <div className="rounded-lg bg-purple-100 p-3">
//                 <TrendingUp className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Insurance Coverage</p>
//                 <p className="text-2xl font-bold">₹{(totalInsurance/10000000).toFixed(1)}Cr</p>
//                 <p className="text-xs text-gray-500">Across all clients</p>
//               </div>
//               <div className="rounded-lg bg-orange-100 p-3">
//                 <Shield className="h-6 w-6 text-orange-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters and Search */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="relative w-full md:w-auto">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search clients by name, email, or department..."
//                 className="pl-10 w-full md:w-96"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <Filter className="h-4 w-4 text-gray-500" />
//                 <Select value={filterStatus} onValueChange={setFilterStatus}>
//                   <SelectTrigger className="w-40">
//                     <SelectValue placeholder="Filter by status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Clients</SelectItem>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="dormant">Dormant</SelectItem>
//                     <SelectItem value="high-value">High Value</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex border rounded-lg overflow-hidden">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="rounded-none"
//                 >
//                   Grid
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('list')}
//                   className="rounded-none"
//                 >
//                   List
//                 </Button>
//               </div>

//               <Button variant="outline" className="flex items-center gap-2">
//                 <Download className="h-4 w-4" />
//                 Export All
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Main Content - Two Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Clients List */}
//         <div className="lg:col-span-2 space-y-4">
//           {viewMode === 'grid' ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {filteredClients.map((client, index) => (
//                 <div
//                   key={client.id}
//                   ref={el => { if (el) cardRefs.current[index] = el }}
//                   className="client-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                 >
//                   <div className="p-5">
//                     {/* Client Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-12 w-12">
//                           <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                             {client.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <h4 className="font-bold text-lg">{client.name}</h4>
//                           <p className="text-sm text-gray-600">{client.designation}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Badge className={getStatusColor(client.status)}>
//                           {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
//                         </Badge>
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="sm">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent>
//                             <DropdownMenuItem onClick={() => handleViewClient(client)}>
//                               <Eye className="h-4 w-4 mr-2" /> View Details
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <MessageSquare className="h-4 w-4 mr-2" /> Send Message
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => exportClientReport(client)}>
//                               <Download className="h-4 w-4 mr-2" /> Export Report
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem onClick={() => sendReminder(client.id)}>
//                               <Calendar className="h-4 w-4 mr-2" /> Send Reminder
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>

//                     {/* Client Info */}
//                     <div className="space-y-3 mb-4">
//                       <div className="flex items-center gap-2 text-sm">
//                         <Building className="h-4 w-4 text-gray-400" />
//                         <span>{client.department}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm">
//                         <Mail className="h-4 w-4 text-gray-400" />
//                         <span className="truncate">{client.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm">
//                         <Phone className="h-4 w-4 text-gray-400" />
//                         <span>{client.phone}</span>
//                       </div>
//                     </div>

//                     {/* Financial Metrics */}
//                     <div className="grid grid-cols-2 gap-3 mb-4">
//                       <div className="bg-blue-50 rounded-lg p-3">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-xs text-gray-600">Salary</span>
//                           <IndianRupee className="h-3 w-3 text-blue-600" />
//                         </div>
//                         <p className="font-bold">₹{(client.salary.net/1000).toFixed(0)}K</p>
//                       </div>
//                       <div className="bg-green-50 rounded-lg p-3">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-xs text-gray-600">Investments</span>
//                           <TrendingUp className="h-3 w-3 text-green-600" />
//                         </div>
//                         <p className="font-bold">₹{(client.investments.total/100000).toFixed(1)}L</p>
//                       </div>
//                     </div>

//                     {/* Performance Indicators */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <Badge variant="outline" className={getRiskColor(client.riskProfile)}>
//                           {client.riskProfile}
//                         </Badge>
//                         <div className="flex items-center gap-1">
//                           <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
//                           <span className="text-xs font-medium">{client.engagement}%</span>
//                         </div>
//                       </div>
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleViewClient(client)}
//                       >
//                         <Eye className="h-4 w-4 mr-1" /> View
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             // List View
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="space-y-4">
//                   {filteredClients.map((client, index) => (
//                     <div
//                       key={client.id}
//                       ref={el => { if (el) cardRefs.current[index] = el }}
//                       className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors client-card"
//                     >
//                       <div className="flex items-center gap-4">
//                         <Avatar>
//                           <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                             {client.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <h4 className="font-semibold">{client.name}</h4>
//                           <div className="flex items-center gap-3 text-sm text-gray-600">
//                             <span className="flex items-center gap-1">
//                               <Building className="h-3 w-3" /> {client.department}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Mail className="h-3 w-3" /> {client.email}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-6">
//                         <div className="text-right hidden md:block">
//                           <div className="font-medium">₹{(client.salary.net/1000).toFixed(0)}K</div>
//                           <div className="text-xs text-gray-500">Net Salary</div>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <Badge className={getStatusColor(client.status)}>
//                             {client.status}
//                           </Badge>
//                           <Badge variant="outline" className={getRiskColor(client.riskProfile)}>
//                             {client.riskProfile}
//                           </Badge>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleViewClient(client)}
//                           >
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => sendReminder(client.id)}
//                           >
//                             <MessageSquare className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Client Growth Chart */}
//           <Card ref={el => { if (el) chartRefs.current[0] = el }}>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <TrendingUp className="h-5 w-5" /> Client Growth Trend
//               </CardTitle>
//               <CardDescription>Monthly client and investment growth</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={performanceTrendData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="month" />
//                     <YAxis yAxisId="left" />
//                     <YAxis yAxisId="right" orientation="right" />
//                     <Tooltip 
//                       formatter={(value: number, name: string) => {
//                         if (name === 'investment') return [`₹${(value/1000000).toFixed(1)}M`, 'Investment']
//                         return [value, 'Clients']
//                       }}
//                     />
//                     <Bar yAxisId="left" dataKey="clients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                     <Bar yAxisId="right" dataKey="investment" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column - Selected Client Details */}
//         <div className="space-y-6">
//           {/* Selected Client Card */}
//           <Card id="client-detail-view">
//             <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-xl">Client Details</CardTitle>
//                   <CardDescription className="text-blue-100">
//                     {selectedClient?.name || 'Select a client'}
//                   </CardDescription>
//                 </div>
//                 <Badge className="bg-white/20 hover:bg-white/30">
//                   {selectedClient?.status || 'Active'}
//                 </Badge>
//               </div>
//             </CardHeader>
//             <CardContent className="pt-6">
//               {selectedClient ? (
//                 <div className="space-y-6">
//                   {/* Client Profile */}
//                   <div className="flex items-center gap-4">
//                     <Avatar className="h-16 w-16">
//                       <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg">
//                         {selectedClient.name.split(' ').map(n => n[0]).join('')}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h3 className="text-xl font-bold">{selectedClient.name}</h3>
//                       <p className="text-gray-600">{selectedClient.designation}</p>
//                       <p className="text-sm text-gray-500">{selectedClient.department}</p>
//                     </div>
//                   </div>

//                   {/* Contact Info */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <Mail className="h-4 w-4 text-gray-400" />
//                       <span className="text-sm">{selectedClient.email}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Phone className="h-4 w-4 text-gray-400" />
//                       <span className="text-sm">{selectedClient.phone}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Calendar className="h-4 w-4 text-gray-400" />
//                       <span className="text-sm">Joined: {selectedClient.joiningDate}</span>
//                     </div>
//                   </div>

//                   {/* Financial Snapshot */}
//                   <div>
//                     <h4 className="font-semibold mb-3 flex items-center gap-2">
//                       <DollarSign className="h-4 w-4" /> Financial Snapshot
//                     </h4>
//                     <div className="grid grid-cols-2 gap-3">
//                       <div className="bg-blue-50 rounded-lg p-3">
//                         <div className="text-xs text-gray-600 mb-1">Net Salary</div>
//                         <div className="font-bold">₹{selectedClient.salary.net.toLocaleString('en-IN')}</div>
//                       </div>
//                       <div className="bg-green-50 rounded-lg p-3">
//                         <div className="text-xs text-gray-600 mb-1">Total Investments</div>
//                         <div className="font-bold">₹{selectedClient.investments.total.toLocaleString('en-IN')}</div>
//                       </div>
//                       <div className="bg-purple-50 rounded-lg p-3">
//                         <div className="text-xs text-gray-600 mb-1">Insurance Coverage</div>
//                         <div className="font-bold">₹{(selectedClient.insurance.total/100000).toFixed(1)}L</div>
//                       </div>
//                       <div className="bg-orange-50 rounded-lg p-3">
//                         <div className="text-xs text-gray-600 mb-1">Asset Value</div>
//                         <div className="font-bold">₹{(selectedClient.assets.totalValue/100000).toFixed(1)}L</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Performance Metrics */}
//                   <div>
//                     <h4 className="font-semibold mb-3 flex items-center gap-2">
//                       <Activity className="h-4 w-4" /> Performance Metrics
//                     </h4>
//                     <div className="space-y-3">
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Financial Health</span>
//                           <span className="font-medium">{selectedClient.financialHealth}%</span>
//                         </div>
//                         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full rounded-full ${
//                               selectedClient.financialHealth >= 80 ? 'bg-green-500' :
//                               selectedClient.financialHealth >= 60 ? 'bg-yellow-500' : 'bg-red-500'
//                             }`}
//                             style={{ width: `${selectedClient.financialHealth}%` }}
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Tax Efficiency</span>
//                           <span className="font-medium">{selectedClient.taxEfficiency}%</span>
//                         </div>
//                         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full rounded-full ${
//                               selectedClient.taxEfficiency >= 80 ? 'bg-green-500' :
//                               selectedClient.taxEfficiency >= 60 ? 'bg-yellow-500' : 'bg-red-500'
//                             }`}
//                             style={{ width: `${selectedClient.taxEfficiency}%` }}
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Savings Rate</span>
//                           <span className="font-medium">{selectedClient.savingsRate}%</span>
//                         </div>
//                         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full rounded-full ${
//                               selectedClient.savingsRate >= 30 ? 'bg-green-500' :
//                               selectedClient.savingsRate >= 20 ? 'bg-yellow-500' : 'bg-red-500'
//                             }`}
//                             style={{ width: `${selectedClient.savingsRate}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="grid grid-cols-2 gap-3">
//                     <Button variant="outline" className="w-full">
//                       <MessageSquare className="h-4 w-4 mr-2" /> Message
//                     </Button>
//                     <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
//                       <Download className="h-4 w-4 mr-2" /> Report
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500">Select a client to view details</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Investment Allocation Chart */}
//           <Card ref={el => { if (el) chartRefs.current[1] = el }}>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <PieChart className="h-5 w-5" /> Investment Allocation
//               </CardTitle>
//               <CardDescription>Overall portfolio distribution</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={investmentAllocationData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                       label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     >
//                       {investmentAllocationData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip formatter={(value: number) => [`${value}%`, 'Allocation']} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//               <CardDescription>Manage client portfolio</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-3">
//                 <Button variant="outline" className="flex-col h-auto py-3">
//                   <TrendingUp className="h-5 w-5 mb-2 text-blue-600" />
//                   <span className="text-sm">Rebalance</span>
//                 </Button>
//                 <Button variant="outline" className="flex-col h-auto py-3">
//                   <Shield className="h-5 w-5 mb-2 text-green-600" />
//                   <span className="text-sm">Insurance</span>
//                 </Button>
//                 <Button variant="outline" className="flex-col h-auto py-3">
//                   <BarChart3 className="h-5 w-5 mb-2 text-purple-600" />
//                   <span className="text-sm">Analysis</span>
//                 </Button>
//                 <Button variant="outline" className="flex-col h-auto py-3">
//                   <DollarSign className="h-5 w-5 mb-2 text-orange-600" />
//                   <span className="text-sm">Tax Plan</span>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Bottom Analytics Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card ref={el => { if (el) chartRefs.current[2] = el }}>
//           <CardHeader>
//             <CardTitle>Top Performing Clients</CardTitle>
//             <CardDescription>By investment growth rate</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {clients
//                 .sort((a, b) => b.investments.growth - a.investments.growth)
//                 .slice(0, 5)
//                 .map((client, index) => (
//                   <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="font-medium text-gray-900">{index + 1}</div>
//                       <Avatar className="h-8 w-8">
//                         <AvatarFallback className="text-xs">
//                           {client.name.split(' ').map(n => n[0]).join('')}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <div className="font-medium text-sm">{client.name}</div>
//                         <div className="text-xs text-gray-500">{client.designation}</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className={`text-sm font-medium flex items-center gap-1 ${
//                         client.investments.growth >= 15 ? 'text-green-600' : 
//                         client.investments.growth >= 10 ? 'text-yellow-600' : 'text-red-600'
//                       }`}>
//                         {client.investments.growth >= 15 ? (
//                           <ArrowUpRight className="h-3 w-3" />
//                         ) : (
//                           <ArrowDownRight className="h-3 w-3" />
//                         )}
//                         {client.investments.growth}%
//                       </div>
//                       <div className="text-xs text-gray-500">Growth</div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card ref={el => { if (el) chartRefs.current[3] = el }}>
//           <CardHeader>
//             <CardTitle>Engagement Metrics</CardTitle>
//             <CardDescription>Client activity and participation</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={performanceTrendData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line 
//                     type="monotone" 
//                     dataKey="clients" 
//                     stroke="#3b82f6" 
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
