"use client"

import { useState, useEffect, useRef } from 'react'
import { AdminLayout } from "@/components/admin-layout"
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Search, Filter, MessageSquare, AlertCircle, CheckCircle, Clock,
  User, Mail, Calendar, Paperclip, Send, Download, MoreVertical,
  ChevronRight, Users, BarChart, TrendingUp, RefreshCw, Eye,
  Shield, Zap, ExternalLink, Tag, FileText, Phone, Copy
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Mock data for tickets
const mockTickets = [
  {
    id: 'SUP-2024-001',
    clientId: 'CL001',
    clientName: 'Rajesh Kumar',
    clientEmail: 'rajesh.kumar@gov.in',
    clientPhone: '+91 9876543210',
    subject: 'Unable to upload income tax documents',
    description: 'Getting error "File size exceeds limit" when trying to upload PDF documents for ITR filing. File size is 8MB, should be within limits.',
    category: 'technical',
    priority: 'high',
    status: 'open',
    createdAt: '2024-01-15 14:30',
    updatedAt: '2024-01-15 15:45',
    assignedTo: 'Admin 1',
    messages: [
      {
        id: 'MSG001',
        sender: 'client',
        senderName: 'Rajesh Kumar',
        message: 'I am unable to upload my Form 16 documents. Getting error message about file size.',
        timestamp: '2024-01-15 14:30',
        attachments: []
      }
    ],
    attachments: [
      { name: 'screenshot_1.png', size: '2.1 MB' },
      { name: 'error_log.txt', size: '15 KB' }
    ]
  },
  {
    id: 'SUP-2024-002',
    clientId: 'CL002',
    clientName: 'Priya Sharma',
    clientEmail: 'priya.sharma@gov.in',
    clientPhone: '+91 8765432109',
    subject: 'Investment portfolio not updating',
    description: 'Mutual fund investments from last week are not reflecting in my portfolio. Showing old values.',
    category: 'data_sync',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-01-14 10:15',
    updatedAt: '2024-01-15 09:30',
    assignedTo: 'Admin 2',
    messages: [
      {
        id: 'MSG002',
        sender: 'client',
        senderName: 'Priya Sharma',
        message: 'My mutual fund investments from January 10th are not showing up in the dashboard.',
        timestamp: '2024-01-14 10:15',
        attachments: []
      },
      {
        id: 'MSG003',
        sender: 'admin',
        senderName: 'Support Team',
        message: 'We are checking with our data provider. The sync may be delayed due to weekend processing.',
        timestamp: '2024-01-14 15:30',
        attachments: []
      }
    ],
    attachments: []
  },
  {
    id: 'SUP-2024-003',
    clientId: 'CL003',
    clientName: 'Amit Patel',
    clientEmail: 'amit.patel@gov.in',
    clientPhone: '+91 7654321098',
    subject: 'Insurance premium payment failed',
    description: 'Tried to pay insurance premium but payment failed after OTP verification. Amount debited but not showing in portal.',
    category: 'billing',
    priority: 'critical',
    status: 'open',
    createdAt: '2024-01-15 09:45',
    updatedAt: '2024-01-15 09:45',
    assignedTo: null,
    messages: [
      {
        id: 'MSG004',
        sender: 'client',
        senderName: 'Amit Patel',
        message: 'Payment of ₹25,000 for LIC premium failed but amount was debited from my account.',
        timestamp: '2024-01-15 09:45',
        attachments: [
          { name: 'payment_receipt.pdf', size: '1.5 MB' }
        ]
      }
    ],
    attachments: [
      { name: 'payment_receipt.pdf', size: '1.5 MB' }
    ]
  },
  {
    id: 'SUP-2024-004',
    clientId: 'CL004',
    clientName: 'Sunita Verma',
    clientEmail: 'sunita.verma@gov.in',
    clientPhone: '+91 6543210987',
    subject: 'Request for tax saving investment suggestions',
    description: 'Need recommendations for tax saving investments under 80C. Budget: ₹1.5 lakhs.',
    category: 'investment_advice',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-01-13 11:20',
    updatedAt: '2024-01-14 16:15',
    assignedTo: 'Admin 1',
    messages: [
      {
        id: 'MSG005',
        sender: 'client',
        senderName: 'Sunita Verma',
        message: 'Can you suggest best options for tax saving investments? I have ₹1.5L available.',
        timestamp: '2024-01-13 11:20',
        attachments: []
      },
      {
        id: 'MSG006',
        sender: 'admin',
        senderName: 'Support Team',
        message: 'We recommend ELSS mutual funds, PPF, and NPS for your profile. Detailed report attached.',
        timestamp: '2024-01-14 14:00',
        attachments: [
          { name: 'investment_report.pdf', size: '3.2 MB' }
        ]
      },
      {
        id: 'MSG007',
        sender: 'client',
        senderName: 'Sunita Verma',
        message: 'Thank you! The suggestions were very helpful.',
        timestamp: '2024-01-14 16:15',
        attachments: []
      }
    ],
    attachments: [
      { name: 'investment_report.pdf', size: '3.2 MB' }
    ]
  },
  {
    id: 'SUP-2024-005',
    clientId: 'CL005',
    clientName: 'Rahul Mehta',
    clientEmail: 'rahul.mehta@gov.in',
    clientPhone: '+91 7432165098',
    subject: 'Cannot access monthly financial report',
    description: 'Getting "Access Denied" error when trying to download monthly financial report PDF.',
    category: 'access',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-01-15 08:30',
    updatedAt: '2024-01-15 08:30',
    assignedTo: null,
    messages: [
      {
        id: 'MSG008',
        sender: 'client',
        senderName: 'Rahul Mehta',
        message: 'Cannot download my financial report for December 2023.',
        timestamp: '2024-01-15 08:30',
        attachments: []
      }
    ],
    attachments: []
  }
]

const ticketStats = {
  total: 156,
  open: 12,
  inProgress: 8,
  resolved: 136,
  critical: 3,
  avgResponseTime: '2.4 hours',
  satisfactionRate: '96.2%'
}

export default function AdminSupportDashboard() {
  const [tickets, setTickets] = useState(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState<any>(mockTickets[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [replyMessage, setReplyMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const ticketRefs = useRef<HTMLDivElement[]>([])
  const messageRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Animate ticket cards
    ticketRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out"
          }
        )
      }
    })

    // Animate messages when ticket changes
    messageRefs.current.forEach((msg, index) => {
      if (msg) {
        gsap.fromTo(msg,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            delay: index * 0.1,
            ease: "back.out(1.2)"
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [selectedTicket])

  const handleSelectTicket = (ticket: any) => {
    gsap.to('#ticket-details', {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setSelectedTicket(ticket)
        setReplyMessage('')
        gsap.fromTo('#ticket-details',
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.3 }
        )
      }
    })
  }

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error('Please enter a message')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const newMessage = {
        id: `MSG${Date.now()}`,
        sender: 'admin',
        senderName: 'Support Team',
        message: replyMessage,
        timestamp: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        attachments: []
      }

      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          return {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            status: ticket.status === 'open' ? 'in_progress' : ticket.status,
            updatedAt: new Date().toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            assignedTo: 'Admin 1'
          }
        }
        return ticket
      })

      setTickets(updatedTickets)
      setSelectedTicket(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        status: prev.status === 'open' ? 'in_progress' : prev.status,
        updatedAt: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        assignedTo: 'Admin 1'
      }))
      
      setReplyMessage('')
      setIsLoading(false)
      
      toast.success('Reply sent successfully')
      
      // Animate new message
      const newMsgElement = document.getElementById(`msg-${newMessage.id}`)
      if (newMsgElement) {
        gsap.fromTo(newMsgElement,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3 }
        )
      }
    }, 500)
  }

  const handleUpdateStatus = (newStatus: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return { ...ticket, status: newStatus }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setSelectedTicket(prev => ({ ...prev, status: newStatus }))
    
    toast.success(`Ticket status updated to ${newStatus.replace('_', ' ')}`)
  }

  const handleAssignToMe = () => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return { ...ticket, assignedTo: 'Admin 1' }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setSelectedTicket(prev => ({ ...prev, assignedTo: 'Admin 1' }))
    
    toast.success('Ticket assigned to you')
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 hover:bg-red-100'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'resolved': return 'bg-green-100 text-green-800 hover:bg-green-100'
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-gray-900'
      case 'low': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Zap className="h-4 w-4" />
      case 'billing': return <FileText className="h-4 w-4" />
      case 'investment_advice': return <TrendingUp className="h-4 w-4" />
      case 'data_sync': return <RefreshCw className="h-4 w-4" />
      case 'access': return <Shield className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <AdminLayout activeTab="Help">
      <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold">{ticketStats.open}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Avg: {ticketStats.avgResponseTime}</span>
                </div>
              </div>
              <div className="rounded-lg bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{ticketStats.inProgress}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Users className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">8 assigned</span>
                </div>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">{ticketStats.resolved}</p>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-gray-500">{ticketStats.satisfactionRate} satisfaction</span>
                </div>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Priority</p>
                <p className="text-2xl font-bold">{ticketStats.critical}</p>
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-600">Needs attention</span>
                </div>
              </div>
              <div className="rounded-lg bg-orange-100 p-3">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Ticket List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Status</Label>
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
                    <Label className="text-xs">Priority</Label>
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

          {/* Ticket List */}
          <Card className="h-[calc(100vh-350px)] overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Support Tickets</span>
                <Badge variant="outline">{filteredTickets.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto h-full">
                {filteredTickets.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    ref={el => { if (el) ticketRefs.current[index] = el }}
                    onClick={() => handleSelectTicket(ticket)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedTicket?.id === ticket.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{ticket.subject}</h4>
                        <p className="text-sm text-gray-600 truncate">{ticket.clientName}</p>
                      </div>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(ticket.category)}
                        <span className="text-xs text-gray-500">{ticket.id}</span>
                      </div>
                      <Badge className={getPriorityColor(ticket.priority)} size="sm">
                        {ticket.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {ticket.createdAt.split(' ')[0]}
                      </div>
                      {ticket.assignedTo && (
                        <span className="text-xs font-medium text-gray-700">
                          {ticket.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Ticket Details */}
        <div className="lg:col-span-2">
          <Card id="ticket-details" className="h-[calc(100vh-350px)] overflow-hidden flex flex-col">
            {!selectedTicket ? (
              <CardContent className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>Select a ticket to view details</p>
                </div>
              </CardContent>
            ) : (
              <>
                {/* Ticket Header */}
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{selectedTicket.subject}</CardTitle>
                        <Badge className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className={getStatusColor(selectedTicket.status)}>
                            {selectedTicket.status.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-gray-600">ID: {selectedTicket.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(selectedTicket.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" /> Copy ID
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={handleAssignToMe}>
                                Assign to me
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUpdateStatus('in_progress')}>
                                Mark as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus('resolved')}>
                                Mark as Resolved
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" /> Export Ticket
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <div className="flex-1 overflow-hidden flex flex-col">
                  {/* Client Info */}
                  <div className="p-6 border-b bg-gray-50">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                          {selectedTicket.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{selectedTicket.clientName}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {selectedTicket.clientEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {selectedTicket.clientPhone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="h-3 w-3" /> Client ID: {selectedTicket.clientId}
                          </span>
                        </div>
                      </div>
                      {selectedTicket.assignedTo && (
                        <Badge variant="outline" className="bg-blue-50">
                          Assigned to: {selectedTicket.assignedTo}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-6 border-b">
                    <h4 className="font-semibold mb-2">Issue Description</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
                    
                    {selectedTicket.attachments.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Paperclip className="h-4 w-4" /> Attachments
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedTicket.attachments.map((file: any, index: number) => (
                            <Badge key={index} variant="outline" className="gap-2">
                              <FileText className="h-3 w-3" />
                              {file.name}
                              <span className="text-gray-500">({file.size})</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Conversation */}
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="p-6 border-b">
                      <h4 className="font-semibold mb-4">Conversation</h4>
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {selectedTicket.messages.map((msg: any, index: number) => (
                          <div
                            key={msg.id}
                            id={`msg-${msg.id}`}
                            ref={el => { if (el) messageRefs.current[index] = el }}
                            className={`p-4 rounded-lg ${
                              msg.sender === 'admin' 
                                ? 'bg-blue-50 border border-blue-200 ml-8' 
                                : 'bg-gray-50 border border-gray-200 mr-8'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className={
                                    msg.sender === 'admin' 
                                      ? 'bg-blue-600 text-white' 
                                      : 'bg-gray-600 text-white'
                                  }>
                                    {msg.senderName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{msg.senderName}</span>
                                <Badge variant="outline" size="sm" className={
                                  msg.sender === 'admin' 
                                    ? 'border-blue-200 text-blue-700' 
                                    : 'border-gray-200 text-gray-700'
                                }>
                                  {msg.sender === 'admin' ? 'Support' : 'Client'}
                                </Badge>
                              </div>
                              <span className="text-xs text-gray-500">{msg.timestamp}</span>
                            </div>
                            <p className="text-gray-800">{msg.message}</p>
                            
                            {msg.attachments && msg.attachments.length > 0 && (
                              <div className="mt-3 pt-3 border-t">
                                <div className="flex flex-wrap gap-2">
                                  {msg.attachments.map((file: any, idx: number) => (
                                    <Badge key={idx} variant="outline" className="gap-1">
                                      <Paperclip className="h-3 w-3" />
                                      {file.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reply Section */}
                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="reply" className="mb-2 block">
                            Reply to Client
                          </Label>
                          <Textarea
                            id="reply"
                            placeholder="Type your reply here..."
                            className="min-h-[120px]"
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled={isLoading}>
                              <Paperclip className="h-4 w-4 mr-2" /> Attach File
                            </Button>
                            <Button variant="outline" size="sm" disabled={isLoading}>
                              <ExternalLink className="h-4 w-4 mr-2" /> Insert Template
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {selectedTicket.status !== 'resolved' && (
                              <Button
                                variant="outline"
                                onClick={() => handleUpdateStatus('resolved')}
                                disabled={isLoading}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" /> Mark Resolved
                              </Button>
                            )}
                            
                            <Button
                              onClick={handleSendReply}
                              disabled={isLoading || !replyMessage.trim()}
                              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                            >
                              {isLoading ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" /> Send Reply
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" /> Support Performance
          </CardTitle>
          <CardDescription>Weekly ticket resolution metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Response Rate</span>
                <span className="text-sm font-bold text-green-600">98.2%</span>
              </div>
              <Progress value={98.2} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Resolution Time</span>
                <span className="text-sm font-bold text-blue-600">3.2h</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm font-bold text-yellow-600">4.7/5</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">First Contact Resolution</span>
                <span className="text-sm font-bold text-purple-600">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  )
}