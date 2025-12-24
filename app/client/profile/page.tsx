"use client"

import { useState } from "react"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Briefcase,
  Users,
  Mail,
  Calendar,
  Building,
} from "lucide-react"

/* ---------------- GOVT STYLE ROW ---------------- */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-dashed border-slate-200">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <span className="col-span-2 text-base font-medium text-slate-900">
        {value}
      </span>
    </div>
  )
}

export default function ClientProfile() {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editEmployment, setEditEmployment] = useState(false)
  const [editFamily, setEditFamily] = useState(false)

  return (
    <ClientLayout activeTab="/client/profile">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-6 p-6 bg-blue-50 rounded-xl border shadow">
          <Avatar className="h-28 w-28 ring-4 ring-blue-200">
            <AvatarFallback className="bg-[#00356B] text-white text-3xl font-bold">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold text-[#00356B]">John Doe</h2>
            <p className="flex items-center gap-2 text-muted-foreground mt-2">
              <Building className="h-5 w-5" />
              Employee ID: EMP-2024-1234
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-5 w-5" />
              john.doe@gov.in
            </p>
          </div>
        </div>

        {/* ===================== TABS ===================== */}
        <Tabs defaultValue="personal">

          {/* 🔥 MODERN GOVERNMENT STYLE TABS */}
          <TabsList
            className="
              inline-flex items-center gap-2
              bg-slate-100 p-1.5 rounded-xl
              border shadow-sm
            "
          >
            <TabsTrigger
              value="personal"
              className="
                flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold
                transition-all duration-300
                data-[state=active]:bg-white
                data-[state=active]:text-[#00356B]
                data-[state=active]:shadow-md
                hover:bg-white/70
              "
            >
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>

            <TabsTrigger
              value="employment"
              className="
                flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold
                transition-all duration-300
                data-[state=active]:bg-white
                data-[state=active]:text-[#00356B]
                data-[state=active]:shadow-md
                hover:bg-white/70
              "
            >
              <Briefcase className="h-4 w-4" />
              Employment
            </TabsTrigger>

            <TabsTrigger
              value="family"
              className="
                flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold
                transition-all duration-300
                data-[state=active]:bg-white
                data-[state=active]:text-[#00356B]
                data-[state=active]:shadow-md
                hover:bg-white/70
              "
            >
              <Users className="h-4 w-4" />
              Family
            </TabsTrigger>
          </TabsList>

          {/* ===================== PERSONAL ===================== */}
          <TabsContent value="personal">
            <Card>
              <CardHeader className="flex items-start justify-between">
                <div>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>Official personal information</CardDescription>
                </div>

                {!editPersonal && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#00356B] text-[#00356B] hover:bg-[#00356B] hover:text-white"
                    onClick={() => setEditPersonal(true)}
                  >
                    Edit
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                {!editPersonal ? (
                  <>
                    <InfoRow label="First Name" value="John" />
                    <InfoRow label="Last Name" value="Doe" />
                    <InfoRow label="Email" value="john.doe@gov.in" />
                    <InfoRow label="Phone" value="+91 98765 43210" />
                    <InfoRow label="Date of Birth" value="15 June 1985" />
                    <InfoRow label="PAN Number" value="ABCDE1234F" />
                    <InfoRow label="Address" value="123, Government Colony, New Delhi - 110001" />
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input defaultValue="John" />
                      <Input defaultValue="Doe" />
                      <Input defaultValue="john.doe@gov.in" />
                      <Input defaultValue="+91 98765 43210" />
                      <Input type="date" defaultValue="1985-06-15" />
                      <Input defaultValue="ABCDE1234F" disabled />
                    </div>

                    <Input className="mt-4" defaultValue="123, Government Colony, New Delhi - 110001" />

                    <div className="flex gap-4 mt-6">
                      <Button onClick={() => setEditPersonal(false)}>Save</Button>
                      <Button variant="outline" onClick={() => setEditPersonal(false)}>Cancel</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===================== EMPLOYMENT ===================== */}
          <TabsContent value="employment">
            <Card>
              <CardHeader className="flex items-start justify-between">
                <div>
                  <CardTitle>Employment Information</CardTitle>
                  <CardDescription>Official employment record</CardDescription>
                </div>

                {!editEmployment && (
                  <Button size="sm" variant="outline" onClick={() => setEditEmployment(true)}>
                    Edit
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                {!editEmployment ? (
                  <>
                    <InfoRow label="Employee ID" value="EMP-2024-1234" />
                    <InfoRow label="Designation" value="Senior Officer" />
                    <InfoRow label="Department" value="Finance Department" />
                    <InfoRow label="Date of Joining" value="01 April 2015" />
                    <InfoRow label="Pay Scale" value="Grade A - Level 10" />
                    <InfoRow label="Basic Salary" value="₹45,000" />
                  </>
                ) : (
                  <>
                    <Input defaultValue="Senior Officer" />
                    <Input defaultValue="Finance Department" />
                    <Input defaultValue="₹45,000" disabled />

                    <div className="flex gap-4 mt-6">
                      <Button onClick={() => setEditEmployment(false)}>Save</Button>
                      <Button variant="outline" onClick={() => setEditEmployment(false)}>Cancel</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===================== FAMILY ===================== */}
          <TabsContent value="family">
            <Card>
              <CardHeader className="flex items-start justify-between">
                <div>
                  <CardTitle>Family Details</CardTitle>
                  <CardDescription>Declared family information</CardDescription>
                </div>

                {!editFamily && (
                  <Button size="sm" variant="outline" onClick={() => setEditFamily(true)}>
                    Edit
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                {!editFamily ? (
                  <>
                    <InfoRow label="Spouse Name" value="Jane Doe" />
                    <InfoRow label="Spouse DOB" value="20 August 1987" />
                    <InfoRow label="Child" value="Emily Doe (10 March 2015)" />
                  </>
                ) : (
                  <>
                    <Input defaultValue="Jane Doe" />
                    <Input type="date" defaultValue="1987-08-20" />
                    <Input defaultValue="Emily Doe" />

                    <div className="flex gap-4 mt-6">
                      <Button onClick={() => setEditFamily(false)}>Save</Button>
                      <Button variant="outline" onClick={() => setEditFamily(false)}>Cancel</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </ClientLayout>
  )
}
