"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  UserCheck, Eye, Mail, Phone, 
  Building, Briefcase, Home, 
  TrendingUp, Shield, CheckCircle, XCircle,
  Download, MoreVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

// Mock pending registrations data
const mockPendingRegistrations = [
  {
    id: 'REG001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gov.in',
    phone: '+91 9876543210',
    department: 'Education',
    designation: 'Assistant Professor',
    submissionDate: '2024-01-15',
    status: 'pending',
    netSalary: '₹85,000',
    properties: 2,
    investments: 4,
    insurance: 3
  },
  {
    id: 'REG002',
    name: 'Priya Sharma',
    email: 'priya.sharma@gov.in',
    phone: '+91 8765432109',
    department: 'Health',
    designation: 'Medical Officer',
    submissionDate: '2024-01-14',
    status: 'pending',
    netSalary: '₹92,000',
    properties: 1,
    investments: 6,
    insurance: 2
  },
  {
    id: 'REG003',
    name: 'Amit Patel',
    email: 'amit.patel@gov.in',
    phone: '+91 7654321098',
    department: 'Revenue',
    designation: 'Tehsildar',
    submissionDate: '2024-01-13',
    status: 'pending',
    netSalary: '₹78,000',
    properties: 3,
    investments: 3,
    insurance: 4
  },
  {
    id: 'REG004',
    name: 'Sunita Verma',
    email: 'sunita.verma@gov.in',
    phone: '+91 6543210987',
    department: 'Police',
    designation: 'Inspector',
    submissionDate: '2024-01-12',
    status: 'pending',
    netSalary: '₹95,000',
    properties: 2,
    investments: 5,
    insurance: 3
  }
]

export function AdminClientApproval() {
  const [pendingClients, setPendingClients] = useState(mockPendingRegistrations)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Cards are animated via CSS transitions

  const handleApprove = (clientId: string) => {
    const client = pendingClients.find(c => c.id === clientId)
    setPendingClients(prev => prev.filter(c => c.id !== clientId))
    toast.success('Client approved successfully!', {
      description: `${client?.name} has been added to the dashboard.`
    })
  }

  const handleReject = (clientId: string) => {
    const client = pendingClients.find(c => c.id === clientId)
    setPendingClients(prev => prev.filter(c => c.id !== clientId))
    toast.error('Client registration rejected', {
      description: `Registration for ${client?.name} has been rejected.`
    })
  }

  const viewDetails = (client: any) => {
    setSelectedClient(client)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Registration Approvals</h2>
          <p className="text-gray-600">Review and approve new client registrations</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {pendingClients.length} Pending Approvals
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold">{pendingClients.length}</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Salary</p>
                <p className="text-2xl font-bold">₹87,500</p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Investments</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <div className="rounded-lg bg-orange-100 p-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Clients List */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>New client registrations awaiting your review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingClients.map((client) => (
              <div
                key={client.id}
                id={`client-${client.id}`}
                className="client-card flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {client.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" /> {client.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> {client.designation}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-medium text-gray-900">{client.netSalary}</div>
                    <div className="text-xs text-gray-500">Net Salary</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Home className="h-3 w-3" /> {client.properties}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> {client.investments}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" /> {client.insurance}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewDetails(client)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(client.id)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4" /> Approve
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(client.id)}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download className="h-4 w-4" /> Download Application
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}

            {pendingClients.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear!</h3>
                <p className="text-gray-600">No pending client approvals at the moment.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Client Details Modal */}
      {showDetails && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            id="client-details-modal"
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Client Application Details</h3>
                  <p className="text-gray-600">Complete registration information</p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeDetails}>
                  ✕
                </Button>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{selectedClient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{selectedClient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{selectedClient.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-medium">{selectedClient.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Designation</p>
                      <p className="font-medium">{selectedClient.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Net Salary</p>
                      <p className="font-medium">{selectedClient.netSalary}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assets Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Properties</p>
                      <p className="font-medium">{selectedClient.properties} properties declared</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Investments</p>
                      <p className="font-medium">{selectedClient.investments} investment schemes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Insurance Policies</p>
                      <p className="font-medium">{selectedClient.insurance} active policies</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline" onClick={closeDetails}>
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleReject(selectedClient.id)
                    closeDetails()
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" /> Reject Application
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    handleApprove(selectedClient.id)
                    closeDetails()
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Approve Client
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
