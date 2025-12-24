"use client"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Plus, Lightbulb } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const investments = [
  { type: "SIP", name: "HDFC Balanced Advantage Fund", amount: 50000, returns: 12.5, status: "active" },
  { type: "Mutual Fund", name: "SBI Blue Chip Fund", amount: 75000, returns: 15.2, status: "active" },
  { type: "Fixed Deposit", name: "State Bank FD - 5 Year", amount: 100000, returns: 6.5, status: "active" },
  { type: "Stocks", name: "TCS Limited", amount: 35000, returns: -2.3, status: "active" },
  { type: "Stocks", name: "Infosys Limited", amount: 40000, returns: 8.7, status: "active" },
  { type: "PPF", name: "Public Provident Fund", amount: 150000, returns: 7.1, status: "active" },
]

export default function ClientInvestments() {
  const totalInvestment = investments.reduce((acc, inv) => acc + inv.amount, 0)
  const avgReturns = (investments.reduce((acc, inv) => acc + inv.returns, 0) / investments.length).toFixed(2)

  return (
    <ClientLayout activeTab="/client/investments">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Investment
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Across 6 instruments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{avgReturns}%</div>
              <p className="text-xs text-muted-foreground mt-1">Last 12 months</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Gains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹32,450</div>
              <p className="text-xs text-muted-foreground mt-1">Since inception</p>
            </CardContent>
          </Card>
        </div>

        {/* Investment Suggestions */}
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Investment Suggestion</AlertTitle>
          <AlertDescription>
            Based on your risk profile, consider diversifying into ELSS funds for tax benefits under Section 80C.
            Potential tax savings: ₹15,600
          </AlertDescription>
        </Alert>

        {/* Investments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Portfolio</CardTitle>
            <CardDescription>Detailed breakdown of your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Investment Name</TableHead>
                  <TableHead className="text-right">Current Value</TableHead>
                  <TableHead className="text-right">Returns</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline">{investment.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{investment.name}</TableCell>
                    <TableCell className="text-right">₹{investment.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`flex items-center justify-end gap-1 ${investment.returns >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {investment.returns >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {investment.returns >= 0 ? "+" : ""}
                        {investment.returns}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-50 text-green-700 hover:bg-green-100">{investment.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
