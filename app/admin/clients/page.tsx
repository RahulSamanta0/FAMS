"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, UserPlus, Eye, Mail, Phone } from "lucide-react"

const clients = [
  {
    id: "EMP-2024-1234",
    name: "John Doe",
    email: "john.doe@gov.in",
    phone: "+91 98765 43210",
    aum: 512000,
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "EMP-2024-1235",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gov.in",
    phone: "+91 98765 43211",
    aum: 680000,
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: "EMP-2024-1236",
    name: "Priya Sharma",
    email: "priya.sharma@gov.in",
    phone: "+91 98765 43212",
    aum: 425000,
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    id: "EMP-2024-1237",
    name: "Amit Patel",
    email: "amit.patel@gov.in",
    phone: "+91 98765 43213",
    aum: 890000,
    status: "active",
    lastActive: "5 days ago",
  },
  {
    id: "EMP-2024-1238",
    name: "Sunita Verma",
    email: "sunita.verma@gov.in",
    phone: "+91 98765 43214",
    aum: 340000,
    status: "dormant",
    lastActive: "2 months ago",
  },
  {
    id: "EMP-2024-1239",
    name: "Vikas Singh",
    email: "vikas.singh@gov.in",
    phone: "+91 98765 43215",
    aum: 720000,
    status: "active",
    lastActive: "1 week ago",
  },
]

export default function AdminClients() {
  return (
    <AdminLayout activeTab="/admin/clients">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground">Manage your client database</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by name, email, or employee ID..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="dormant">Dormant</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="aum-high">AUM (High to Low)</SelectItem>
                  <SelectItem value="aum-low">AUM (Low to High)</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Client List</CardTitle>
            <CardDescription>Total {clients.length} clients in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">AUM</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-mono text-sm">{client.id}</TableCell>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">₹{(client.aum / 1000).toFixed(0)}K</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          client.status === "active"
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{client.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
