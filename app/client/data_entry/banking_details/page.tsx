"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

interface BankAccount {
  bankName: string
  branchName: string
  accountType: string
  accountNumber: string
  ifsc: string
  accountHolderName: string
  mobileNumber: string
  upiId: string
  nomineeName: string
}

export default function BankingDetailsPage() {
  const [showForm, setShowForm] = useState(false)
  const [accounts, setAccounts] = useState<BankAccount[]>([])

  const [account, setAccount] = useState<BankAccount>({
    bankName: "",
    branchName: "",
    accountType: "",
    accountNumber: "",
    ifsc: "",
    accountHolderName: "",
    mobileNumber: "",
    upiId: "",
    nomineeName: "",
  })

  const handleChange = (field: keyof BankAccount, value: string) => {
    setAccount({ ...account, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAccounts([...accounts, account])
    setAccount({
      bankName: "",
      branchName: "",
      accountType: "",
      accountNumber: "",
      ifsc: "",
      accountHolderName: "",
      mobileNumber: "",
      upiId: "",
      nomineeName: "",
    })
    setShowForm(false)
  }

  const maskAccountNumber = (num: string) =>
    num ? `XXXXXX${num.slice(-4)}` : ""

  return (
    <ClientLayout activeTab="/client/data_entry/banking_details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Banking Details
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage your bank account information
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            + Add Account
          </Button>
        </div>

        {/* Add Bank Account Form (Conditional) */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Bank Account</CardTitle>
              <CardDescription>
                Enter your bank account details
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input
                      value={account.bankName}
                      onChange={(e) =>
                        handleChange("bankName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Branch Name</Label>
                    <Input
                      value={account.branchName}
                      onChange={(e) =>
                        handleChange("branchName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select
                      onValueChange={(v) =>
                        handleChange("accountType", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Savings">Savings</SelectItem>
                        <SelectItem value="Current">Current</SelectItem>
                        <SelectItem value="Salary">Salary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Account Holder Name</Label>
                    <Input
                      value={account.accountHolderName}
                      onChange={(e) =>
                        handleChange(
                          "accountHolderName",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      value={account.accountNumber}
                      onChange={(e) =>
                        handleChange("accountNumber", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>IFSC Code</Label>
                    <Input
                      value={account.ifsc}
                      onChange={(e) =>
                        handleChange("ifsc", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Linked Mobile Number</Label>
                    <Input
                      value={account.mobileNumber}
                      onChange={(e) =>
                        handleChange("mobileNumber", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>UPI ID (Optional)</Label>
                    <Input
                      value={account.upiId}
                      onChange={(e) =>
                        handleChange("upiId", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Nominee Name</Label>
                    <Input
                      value={account.nomineeName}
                      onChange={(e) =>
                        handleChange("nomineeName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-blue-600">
                    Save Account
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Bank Accounts List */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Accounts</CardTitle>
            <CardDescription>Added bank accounts</CardDescription>
          </CardHeader>

          <CardContent>
            {accounts.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                No bank accounts added yet
              </p>
            ) : (
              <div className="space-y-4">
                {accounts.map((acc, index) => (
                  <div
                    key={index}
                    className="flex justify-between border rounded-md p-4"
                  >
                    <div>
                      <p className="font-semibold">
                        {acc.bankName} ({acc.accountType})
                      </p>
                      <p className="text-sm text-slate-500">
                        {maskAccountNumber(acc.accountNumber)} •{" "}
                        {acc.branchName}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500">
                      {acc.mobileNumber}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
