"use client"

import { useState } from "react"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

import {
  Plus,
  ShieldCheck,
  Calendar,
  Bell,
  Upload,
  FileText,
} from "lucide-react"

/* ---------------- MOCK DATA ---------------- */

const insurancePolicies = [
  {
    type: "Life Insurance",
    provider: "LIC of India",
    policyName: "Jeevan Anand",
    coverage: 1000000,
    premium: 18000,
    dueDate: "15 Jul 2025",
    status: "Active",
    reminder: true,
  },
  {
    type: "Health Insurance",
    provider: "HDFC ERGO",
    policyName: "Health Suraksha",
    coverage: 500000,
    premium: 12000,
    dueDate: "05 Aug 2025",
    status: "Active",
    reminder: false,
  },
]

const claims = [
  {
    policy: "Health Suraksha",
    claimId: "CLM-2025-001",
    amount: 45000,
    status: "Approved",
  },
  {
    policy: "Family Floater",
    claimId: "CLM-2025-002",
    amount: 22000,
    status: "In Review",
  },
]

/* ---------------- COMPONENT ---------------- */

export default function ClientInsurance() {
  const [policies, setPolicies] = useState(insurancePolicies)
  const [documents, setDocuments] = useState<File[]>([])

  const totalCoverage = policies.reduce(
    (acc, policy) => acc + policy.coverage,
    0
  )

  /* ---------- REMINDER TOGGLE ---------- */
  const toggleReminder = (index: number) => {
    setPolicies((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, reminder: !p.reminder } : p
      )
    )
  }

  return (
    <ClientLayout activeTab="/client/insurance">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Insurance</h1>
            <p className="text-muted-foreground">
              Life & health insurance management
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Policy
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{policies.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{totalCoverage.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Next Premium Due</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>15 Jul 2025</span>
            </CardContent>
          </Card>
        </div>

        {/* Insurance Policies */}
        <Card>
          <CardHeader>
            <CardTitle>Insurance Policies</CardTitle>
            <CardDescription>
              Policy details, premiums, and reminders
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead className="text-right">Coverage</TableHead>
                  <TableHead className="text-right">Premium</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Reminder</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {policies.map((policy, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline">{policy.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {policy.policyName}
                    </TableCell>
                    <TableCell>{policy.provider}</TableCell>
                    <TableCell className="text-right">
                      ₹{policy.coverage.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{policy.premium.toLocaleString()}
                    </TableCell>
                    <TableCell>{policy.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Switch
                          checked={policy.reminder}
                          onCheckedChange={() => toggleReminder(index)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Policy Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Documents</CardTitle>
            <CardDescription>
              Upload insurance policy PDFs
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-muted-foreground hover:border-primary">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (!e.target.files) return
                  setDocuments((prev) => [
                    ...prev,
                    ...Array.from(e.target.files),
                  ])
                }}
              />
              <Upload className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">
                Upload Policy PDF
              </span>
            </label>

            {documents.length > 0 && (
              <ul className="space-y-2">
                {documents.map((doc, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm"
                  >
                    <FileText className="h-4 w-4" />
                    {doc.name}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Claim Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Claim Tracking</CardTitle>
            <CardDescription>
              Track submitted insurance claims
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy</TableHead>
                  <TableHead>Claim ID</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {claims.map((claim, index) => (
                  <TableRow key={index}>
                    <TableCell>{claim.policy}</TableCell>
                    <TableCell>{claim.claimId}</TableCell>
                    <TableCell className="text-right">
                      ₹{claim.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          claim.status === "Approved"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }
                      >
                        {claim.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Coverage Details */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5" />
            Your insurance policies provide financial protection for life and
            medical emergencies.
          </CardContent>
        </Card>

      </div>
    </ClientLayout>
  )
}
