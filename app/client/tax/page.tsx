"use client"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, FileText, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function ClientTax() {
  return (
    <ClientLayout activeTab="/client/tax">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tax & TDS</h1>
          <p className="text-muted-foreground">Manage your tax calculations and TDS details</p>
        </div>

        {/* Tax Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Gross Annual Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹9,00,000</div>
              <p className="text-xs text-muted-foreground mt-1">FY 2024-25</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹2,88,000</div>
              <p className="text-xs text-muted-foreground mt-1">Section 80C, 80D, HRA</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taxable Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹6,12,000</div>
              <p className="text-xs text-muted-foreground mt-1">After deductions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Estimated Tax</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹45,600</div>
              <p className="text-xs text-muted-foreground mt-1">Old tax regime</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="estimate" className="space-y-6">
          <TabsList>
            <TabsTrigger value="estimate">
              <Calculator className="mr-2 h-4 w-4" />
              Tax Estimate
            </TabsTrigger>
            <TabsTrigger value="deductions">
              <TrendingDown className="mr-2 h-4 w-4" />
              Deductions
            </TabsTrigger>
            <TabsTrigger value="tds">
              <FileText className="mr-2 h-4 w-4" />
              TDS Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estimate">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Summary</CardTitle>
                <CardDescription>Detailed tax computation for FY 2024-25</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Gross Salary Income</p>
                      <p className="text-lg font-semibold">₹9,00,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Other Income</p>
                      <p className="text-lg font-semibold">₹0</p>
                    </div>
                  </div>

                  <div className="space-y-2 border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Deductions</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Section 80C</span>
                        <span className="font-medium">- ₹1,50,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Section 80D</span>
                        <span className="font-medium">- ₹18,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">HRA Exemption</span>
                        <span className="font-medium">- ₹1,20,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Taxable Income</p>
                      <p className="text-xl font-bold text-primary">₹6,12,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tax Payable</p>
                      <p className="text-xl font-bold text-primary">₹45,600</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button>Download Tax Summary</Button>
                    <Button variant="outline">Compare Regimes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deductions">
            <Card>
              <CardHeader>
                <CardTitle>Deduction Summary</CardTitle>
                <CardDescription>Track your tax-saving investments and deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Section</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Max Limit</TableHead>
                      <TableHead className="text-right">Utilized</TableHead>
                      <TableHead className="text-right">Remaining</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deductions.map((deduction, index) => {
                      const remaining = deduction.amount - deduction.utilized
                      const percentage = (deduction.utilized / deduction.amount) * 100
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{deduction.section}</TableCell>
                          <TableCell>{deduction.description}</TableCell>
                          <TableCell className="text-right">₹{deduction.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₹{deduction.utilized.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₹{remaining.toLocaleString()}</TableCell>
                          <TableCell>
                            {percentage === 100 ? (
                              <Badge className="bg-green-50 text-green-700">Maxed Out</Badge>
                            ) : percentage === 0 ? (
                              <Badge variant="secondary">Not Used</Badge>
                            ) : (
                              <Badge variant="outline">{percentage.toFixed(0)}% Used</Badge>
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

          <TabsContent value="tds">
            <Card>
              <CardHeader>
                <CardTitle>TDS Breakdown</CardTitle>
                <CardDescription>Monthly TDS deductions from salary</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Gross Salary</TableHead>
                      <TableHead className="text-right">TDS Deducted</TableHead>
                      <TableHead className="text-right">Net Salary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tdsBreakdown.map((tds, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{tds.month}</TableCell>
                        <TableCell className="text-right">₹{tds.salary.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-red-600">- ₹{tds.tdsAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{(tds.salary - tds.tdsAmount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-bold">Total (5 months)</TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{tdsBreakdown.reduce((acc, tds) => acc + tds.salary, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold text-red-600">
                        - ₹{tdsBreakdown.reduce((acc, tds) => acc + tds.tdsAmount, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{tdsBreakdown.reduce((acc, tds) => acc + (tds.salary - tds.tdsAmount), 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline">Download Form 16</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
