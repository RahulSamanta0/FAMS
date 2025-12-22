"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Wallet, TrendingUp, Calculator, MessageSquare, Download } from "lucide-react"

export default function AdminFactSheet() {
  return (
    <AdminLayout activeTab="/admin/fact-sheet">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Client Fact Sheet</h1>
            <p className="text-muted-foreground">Complete financial profile and history</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="EMP-2024-1234">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMP-2024-1234">John Doe (EMP-2024-1234)</SelectItem>
                <SelectItem value="EMP-2024-1235">Rajesh Kumar (EMP-2024-1235)</SelectItem>
                <SelectItem value="EMP-2024-1236">Priya Sharma (EMP-2024-1236)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Client Summary */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">John Doe</CardTitle>
                <CardDescription className="text-base">EMP-2024-1234 | john.doe@gov.in</CardDescription>
              </div>
              <Badge className="bg-green-50 text-green-700">Active Client</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Total AUM</p>
                <p className="text-2xl font-bold">₹5.12 L</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Income</p>
                <p className="text-2xl font-bold">₹9.00 L</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Client Since</p>
                <p className="text-2xl font-bold">Apr 2015</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Contact</p>
                <p className="text-2xl font-bold">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <User className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="income">
              <Wallet className="mr-2 h-4 w-4" />
              Income & Assets
            </TabsTrigger>
            <TabsTrigger value="investments">
              <TrendingUp className="mr-2 h-4 w-4" />
              Investments
            </TabsTrigger>
            <TabsTrigger value="tax">
              <Calculator className="mr-2 h-4 w-4" />
              Tax Details
            </TabsTrigger>
            <TabsTrigger value="communication">
              <MessageSquare className="mr-2 h-4 w-4" />
              Communication
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date of Birth:</span>
                    <span className="font-medium">15 June 1985</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PAN:</span>
                    <span className="font-medium font-mono">ABCDE1234F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">john.doe@gov.in</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium">Finance Department</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Designation:</span>
                    <span className="font-medium">Senior Officer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employee ID:</span>
                    <span className="font-medium font-mono">EMP-2024-1234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joining Date:</span>
                    <span className="font-medium">01 April 2015</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grade:</span>
                    <span className="font-medium">Grade A - Level 10</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="income">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Income Breakdown</CardTitle>
                  <CardDescription>Monthly salary components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Basic Salary:</span>
                    <span className="font-semibold">₹45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">DA:</span>
                    <span className="font-semibold">₹18,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HRA:</span>
                    <span className="font-semibold">₹12,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium">Gross Monthly:</span>
                    <span className="font-bold text-lg">₹75,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Annual Gross:</span>
                    <span className="font-bold text-lg">₹9,00,000</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assets Summary</CardTitle>
                  <CardDescription>Total asset value</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Balance:</span>
                    <span className="font-semibold">₹2,50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investments:</span>
                    <span className="font-semibold">₹4,50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Real Estate:</span>
                    <span className="font-semibold">₹75,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Other Assets:</span>
                    <span className="font-semibold">₹12,00,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium">Total Net Worth:</span>
                    <span className="font-bold text-lg text-primary">₹92,00,000</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Complete breakdown of all investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "SIP", name: "HDFC Balanced Advantage Fund", value: 50000, returns: "+12.5%" },
                    { type: "Mutual Fund", name: "SBI Blue Chip Fund", value: 75000, returns: "+15.2%" },
                    { type: "Fixed Deposit", name: "State Bank FD - 5 Year", value: 100000, returns: "+6.5%" },
                    { type: "Stocks", name: "TCS Limited", value: 35000, returns: "-2.3%" },
                    { type: "PPF", name: "Public Provident Fund", value: 150000, returns: "+7.1%" },
                  ].map((investment, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <Badge variant="outline" className="mb-1">
                          {investment.type}
                        </Badge>
                        <p className="font-medium">{investment.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{investment.value.toLocaleString()}</p>
                        <p
                          className={`text-sm ${investment.returns.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {investment.returns}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax">
            <Card>
              <CardHeader>
                <CardTitle>Tax Information</CardTitle>
                <CardDescription>Tax calculations and filings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Taxable Income</p>
                    <p className="text-2xl font-bold">₹6,12,000</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Deductions</p>
                    <p className="text-2xl font-bold text-green-600">₹2,88,000</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Tax</p>
                    <p className="text-2xl font-bold text-primary">₹45,600</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Tax Filings</h4>
                  {[
                    { year: "FY 2023-24", status: "Filed", date: "15 July 2024", refund: "None" },
                    { year: "FY 2022-23", status: "Filed", date: "20 July 2023", refund: "₹5,200" },
                  ].map((filing, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">{filing.year}</p>
                        <p className="text-sm text-muted-foreground">Filed on {filing.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-50 text-green-700 mb-1">{filing.status}</Badge>
                        <p className="text-sm">Refund: {filing.refund}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle>Communication History</CardTitle>
                <CardDescription>All interactions and messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: "22 Dec 2024, 10:30 AM",
                      type: "Email",
                      subject: "Tax filing reminder sent",
                      status: "Delivered",
                    },
                    {
                      date: "20 Dec 2024, 3:15 PM",
                      type: "Call",
                      subject: "Investment consultation call",
                      status: "Completed",
                    },
                    {
                      date: "18 Dec 2024, 11:00 AM",
                      type: "Message",
                      subject: "SIP confirmation message",
                      status: "Read",
                    },
                    {
                      date: "15 Dec 2024, 9:45 AM",
                      type: "Email",
                      subject: "Monthly portfolio update",
                      status: "Delivered",
                    },
                  ].map((comm, index) => (
                    <div key={index} className="flex justify-between items-start border-b pb-4 last:border-0">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{comm.type}</Badge>
                          <span className="text-xs text-muted-foreground">{comm.date}</span>
                        </div>
                        <p className="font-medium">{comm.subject}</p>
                      </div>
                      <Badge className="bg-blue-50 text-blue-700">{comm.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
