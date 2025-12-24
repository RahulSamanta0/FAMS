"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientLayout } from "@/components/client-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InvestmentForm {
  investmentType: string
  institution: string
  investedAmount: string
  currentValue: string
  startDate: string
  maturityDate: string
  expectedReturns: string
  referenceNumber: string
}

export default function InvestmentsPage() {
  const [investment, setInvestment] = useState<InvestmentForm>({
    investmentType: "",
    institution: "",
    investedAmount: "",
    currentValue: "",
    startDate: "",
    maturityDate: "",
    expectedReturns: "",
    referenceNumber: "",
  })

  const handleChange = (field: keyof InvestmentForm, value: string) => {
    setInvestment({ ...investment, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Investment Data:", investment)
    alert("Investment added successfully!")
  }

  return (
    <ClientLayout activeTab="/client/data_entry/investments">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Investments
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Track your investment portfolio
          </p>
        </div>

        {/* Add Investment */}
        <Card>
          <CardHeader>
            <CardTitle>Add Investment</CardTitle>
            <CardDescription>Enter your investment details</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Investment Type */}
                <div className="space-y-2">
                  <Label>Investment Type</Label>
                  <Select onValueChange={(v) => handleChange("investmentType", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                      <SelectItem value="fd">Fixed Deposit (FD)</SelectItem>
                      <SelectItem value="rd">Recurring Deposit (RD)</SelectItem>
                      <SelectItem value="stocks">Stocks / Shares</SelectItem>
                      <SelectItem value="bonds">Bonds / Debentures</SelectItem>
                      <SelectItem value="epf">Provident Fund (EPF)</SelectItem>
                      <SelectItem value="ppf">Public Provident Fund (PPF)</SelectItem>
                      <SelectItem value="nps">National Pension Scheme (NPS)</SelectItem>
                      <SelectItem value="insurance">Insurance (Life / ULIP)</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Institution */}
                <div className="space-y-2">
                  <Label>Institution / Company Name</Label>
                  <Input
                    placeholder="Enter institution name"
                    value={investment.institution}
                    onChange={(e) =>
                      handleChange("institution", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Invested Amount */}
                <div className="space-y-2">
                  <Label>Invested Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter invested amount"
                    value={investment.investedAmount}
                    onChange={(e) =>
                      handleChange("investedAmount", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Current Value */}
                <div className="space-y-2">
                  <Label>Current Value (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter current value"
                    value={investment.currentValue}
                    onChange={(e) =>
                      handleChange("currentValue", e.target.value)
                    }
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={investment.startDate}
                    onChange={(e) =>
                      handleChange("startDate", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Maturity Date */}
                <div className="space-y-2">
                  <Label>Maturity Date</Label>
                  <Input
                    type="date"
                    value={investment.maturityDate}
                    onChange={(e) =>
                      handleChange("maturityDate", e.target.value)
                    }
                  />
                </div>

                {/* Expected Returns */}
                <div className="space-y-2">
                  <Label>Expected Returns (%)</Label>
                  <Input
                    type="number"
                    placeholder="Expected return percentage"
                    value={investment.expectedReturns}
                    onChange={(e) =>
                      handleChange("expectedReturns", e.target.value)
                    }
                  />
                </div>

                {/* Reference / Folio / Policy Number */}
                <div className="space-y-2">
                  <Label>Reference / Folio / Policy No.</Label>
                  <Input
                    placeholder="Enter reference number"
                    value={investment.referenceNumber}
                    onChange={(e) =>
                      handleChange("referenceNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Investment
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Investment Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Portfolio</CardTitle>
            <CardDescription>View and manage your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No investments added yet
            </p>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
