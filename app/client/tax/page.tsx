"use client"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, FileText, TrendingDown, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ---------------- MOCK DATA ---------------- */

const tdsBreakdown = [
  { month: "April 2024", tdsAmount: 3800, salary: 75000 },
  { month: "May 2024", tdsAmount: 3800, salary: 80000 },
  { month: "June 2024", tdsAmount: 3800, salary: 75000 },
  { month: "July 2024", tdsAmount: 3800, salary: 75000 },
  { month: "August 2024", tdsAmount: 3800, salary: 75000 },
]

const deductions = [
  { section: "80C", description: "PPF, ELSS, Insurance Premium", amount: 150000, utilized: 150000 },
  { section: "80D", description: "Health Insurance Premium", amount: 25000, utilized: 18000 },
  { section: "80CCD(1B)", description: "NPS Contribution", amount: 50000, utilized: 0 },
  { section: "HRA", description: "House Rent Allowance", amount: 120000, utilized: 120000 },
]

/* ---------------- CALCULATIONS ---------------- */

const grossIncome = 900000
const totalDeductions = deductions.reduce((acc, d) => acc + d.utilized, 0)
const taxableIncome = grossIncome - totalDeductions
const estimatedTax = 45600

const totalTdsDeducted = tdsBreakdown.reduce((acc, t) => acc + t.tdsAmount, 0)
const tdsStatus =
  totalTdsDeducted >= estimatedTax ? "On Track" : "Shortfall"

/* ---------------- COMPONENT ---------------- */

export default function ClientTax() {
  return (
    <ClientLayout activeTab="/client/tax">
      <div className="space-y-6">

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Gross Annual Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹9,00,000</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Eligible Deductions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{totalDeductions.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Taxable Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{taxableIncome.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Estimated Tax</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ₹{estimatedTax.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="estimate" className="space-y-6">
          <TabsList>
            <TabsTrigger value="estimate">
              <Calculator className="mr-2 h-4 w-4" />
              Estimated Tax
            </TabsTrigger>
            <TabsTrigger value="deductions">
              <TrendingDown className="mr-2 h-4 w-4" />
              Eligible Deductions
            </TabsTrigger>
            <TabsTrigger value="tds">
              <FileText className="mr-2 h-4 w-4" />
              TDS Status
            </TabsTrigger>
          </TabsList>

          {/* Estimated Tax Calculation */}
          <TabsContent value="estimate">
            <Card>
              <CardHeader>
                <CardTitle>Estimated Tax Calculation</CardTitle>
                <CardDescription>
                  Tax estimation based on current income and deductions (Old Regime)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Gross Income</p>
                    <p className="font-semibold">₹9,00,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Deductions</p>
                    <p className="font-semibold">- ₹{totalDeductions.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-primary/5 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxable Income</p>
                    <p className="text-xl font-bold text-primary">
                      ₹{taxableIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Tax</p>
                    <p className="text-xl font-bold text-primary">
                      ₹{estimatedTax.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button>Recalculate Tax</Button>
                  <Button variant="outline">Compare New Regime</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligible Deductions */}
          <TabsContent value="deductions">
            <Card>
              <CardHeader>
                <CardTitle>Eligible Deductions</CardTitle>
                <CardDescription>
                  Track utilized vs remaining deduction limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Section</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Limit</TableHead>
                      <TableHead className="text-right">Used</TableHead>
                      <TableHead className="text-right">Remaining</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deductions.map((d, i) => {
                      const remaining = d.amount - d.utilized
                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{d.section}</TableCell>
                          <TableCell>{d.description}</TableCell>
                          <TableCell className="text-right">₹{d.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₹{d.utilized.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₹{remaining.toLocaleString()}</TableCell>
                          <TableCell>
                            {remaining === 0 ? (
                              <Badge className="bg-green-50 text-green-700">
                                Fully Utilized
                              </Badge>
                            ) : remaining === d.amount ? (
                              <Badge variant="secondary">Not Used</Badge>
                            ) : (
                              <Badge variant="outline">Partially Used</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TDS Status */}
          <TabsContent value="tds">
            <Card>
              <CardHeader>
                <CardTitle>TDS Status</CardTitle>
                <CardDescription>
                  Track deducted TDS against estimated tax
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  {tdsStatus === "On Track" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium">TDS Status: {tdsStatus}</p>
                    <p className="text-sm text-muted-foreground">
                      TDS Deducted: ₹{totalTdsDeducted.toLocaleString()} | Estimated Tax: ₹{estimatedTax.toLocaleString()}
                    </p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Salary</TableHead>
                      <TableHead className="text-right">TDS</TableHead>
                      <TableHead className="text-right">Net</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tdsBreakdown.map((t, i) => (
                      <TableRow key={i}>
                        <TableCell>{t.month}</TableCell>
                        <TableCell className="text-right">₹{t.salary.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-red-600">
                          - ₹{t.tdsAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{(t.salary - t.tdsAmount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Button variant="outline">Download Form 16</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
