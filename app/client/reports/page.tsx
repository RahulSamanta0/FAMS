"use client"

import { useState } from "react"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
  FileText,
  Home,
  ShieldCheck,
  Download,
  TrendingUp,
  Lock,
  BarChart3,
} from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

/* ---------------- MOCK DATA ---------------- */

const incomeTaxReports = [
  { year: "FY 2022-23", taxableIncome: 585000, taxPaid: 42000 },
  { year: "FY 2023-24", taxableIncome: 612000, taxPaid: 45600 },
]

const assetStatements = [
  { asset: "Residential House", category: "Immovable", value: 8500000 },
  { asset: "Land", category: "Immovable", value: 3200000 },
  { asset: "Car", category: "Movable", value: 1200000 },
  { asset: "Gold & Valuables", category: "Movable", value: 1600000 },
]

const whiteIncomeSummary = [
  { source: "Salary", amount: 900000 },
  { source: "Interest", amount: 42000 },
  { source: "Capital Gains", amount: 78000 },
]

/* ---------------- COMPONENT ---------------- */

export default function ClientReports() {
  const [caAccess, setCaAccess] = useState(true)

  const totalAssets = assetStatements.reduce((a, b) => a + b.value, 0)
  const totalWhiteIncome = whiteIncomeSummary.reduce((a, b) => a + b.amount, 0)

  const yoyChange =
    incomeTaxReports[1].taxableIncome -
    incomeTaxReports[0].taxableIncome

  return (
    <ClientLayout activeTab="/client/reports">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            CA-ready financial reports and analysis
          </p>
        </div>

        {/* CA Ready Consolidated Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              CA-Ready Consolidated Report
            </CardTitle>
            <CardDescription>
              Single downloadable report covering tax, assets, and income
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Consolidated PDF
            </Button>
            <span className="text-sm text-muted-foreground">
              Suitable for CA filing & audits
            </span>
          </CardContent>
        </Card>

        {/* Income Tax Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Income Tax Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Financial Year</TableHead>
                  <TableHead className="text-right">Taxable Income</TableHead>
                  <TableHead className="text-right">Tax Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeTaxReports.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{r.year}</TableCell>
                    <TableCell className="text-right">
                      ₹{r.taxableIncome.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{r.taxPaid.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Year-over-Year Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Year-over-Year Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className={
                yoyChange >= 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }
            >
              {yoyChange >= 0 ? "Increase" : "Decrease"} of ₹
              {Math.abs(yoyChange).toLocaleString()}
            </Badge>
          </CardContent>
        </Card>

        {/* Asset Statements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Asset Statements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Declared Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assetStatements.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{a.asset}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{a.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{a.value.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total Assets</TableCell>
                  <TableCell />
                  <TableCell className="text-right font-bold">
                    ₹{totalAssets.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* White-Income Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              White-Income Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {whiteIncomeSummary.map((i, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{i.source}</TableCell>
                    <TableCell className="text-right">
                      ₹{i.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total White Income</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{totalWhiteIncome.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 📊 Charts Section (Added Near Last) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Financial Overview Charts
            </CardTitle>
            <CardDescription>
              Visual trends for quick CA and client review
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-2">
            {/* Taxable Income Trend */}
            <div className="h-64">
              <h4 className="mb-2 text-sm font-medium">
                Taxable Income Trend
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeTaxReports}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="taxableIncome" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* White Income vs Tax Paid */}
            <div className="h-64">
              <h4 className="mb-2 text-sm font-medium">
                White Income vs Tax Paid
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeTaxReports}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="taxPaid" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Reports Access Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Reports Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-medium">CA / Advisor Access</p>
              <p className="text-sm text-muted-foreground">
                Allow read-only access to reports
              </p>
            </div>
            <Switch checked={caAccess} onCheckedChange={setCaAccess} />
          </CardContent>
        </Card>

      </div>
    </ClientLayout>
  )
}
