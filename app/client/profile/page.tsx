"use client"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Briefcase, Users } from "lucide-react"

export default function ClientProfile() {
  return (
    <ClientLayout activeTab="/client/profile">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">Employee ID: EMP-2024-1234</p>
            <p className="text-sm text-muted-foreground mt-1">john.doe@gov.in</p>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">
              <User className="mr-2 h-4 w-4" />
              Personal Details
            </TabsTrigger>
            <TabsTrigger value="employment">
              <Briefcase className="mr-2 h-4 w-4" />
              Employment Info
            </TabsTrigger>
            <TabsTrigger value="family">
              <Users className="mr-2 h-4 w-4" />
              Family Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@gov.in" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" defaultValue="1985-06-15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input id="pan" defaultValue="ABCDE1234F" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123, Government Colony, New Delhi - 110001" />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment">
            <Card>
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
                <CardDescription>Your employment and salary details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="empId">Employee ID</Label>
                    <Input id="empId" defaultValue="EMP-2024-1234" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" defaultValue="Senior Officer" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Finance Department" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joiningDate">Date of Joining</Label>
                    <Input id="joiningDate" type="date" defaultValue="2015-04-01" disabled />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary">Basic Salary</Label>
                    <Input id="basicSalary" defaultValue="₹45,000" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade/Pay Scale</Label>
                    <Input id="grade" defaultValue="Grade A - Level 10" disabled />
                  </div>
                </div>

                <Button>Update Employment Info</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family">
            <Card>
              <CardHeader>
                <CardTitle>Family Details</CardTitle>
                <CardDescription>Information about your family members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Spouse Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="spouseName">Name</Label>
                      <Input id="spouseName" defaultValue="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="spouseDob">Date of Birth</Label>
                      <Input id="spouseDob" type="date" defaultValue="1987-08-20" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Children</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="child1Name">Child 1 Name</Label>
                        <Input id="child1Name" defaultValue="Emily Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="child1Dob">Date of Birth</Label>
                        <Input id="child1Dob" type="date" defaultValue="2015-03-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="child1Gender">Gender</Label>
                        <Input id="child1Gender" defaultValue="Female" />
                      </div>
                    </div>
                    <Button variant="outline">Add Another Child</Button>
                  </div>
                </div>

                <Button>Save Family Details</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
