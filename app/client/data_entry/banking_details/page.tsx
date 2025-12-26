"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Landmark,
  CreditCard,
  User,
  Smartphone,
  MapPin,
  QrCode,
  Users,
  Plus,
  X,
  Wallet,
  Building2,
  Hash,
  Trash2, // Delete Icon
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- INTERFACES ---------------- */

interface BankAccount {
  id: string
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
  const [loading, setLoading] = useState(true)

  // 1. LOAD DATA ON MOUNT
  useEffect(() => {
    const savedData = localStorage.getItem("banking_details_data")
    if (savedData) {
      setAccounts(JSON.parse(savedData))
    }
    setLoading(false)
  }, [])

  // 2. SAVE DATA HELPER
  const updateLocalStorage = (updatedList: BankAccount[]) => {
    localStorage.setItem("banking_details_data", JSON.stringify(updatedList))
    setAccounts(updatedList)
  }

  const [account, setAccount] = useState<Omit<BankAccount, "id">>({
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

  const handleChange = (field: keyof Omit<BankAccount, "id">, value: string) => {
    setAccount({ ...account, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAccount = { ...account, id: Date.now().toString() }
    const updatedList = [...accounts, newAccount]
    updateLocalStorage(updatedList)
    
    // Reset Form
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

  const handleDelete = (id: string) => {
    const updatedList = accounts.filter(acc => acc.id !== id)
    updateLocalStorage(updatedList)
  }

  const maskAccountNumber = (num: string) =>
    num && num.length > 4 ? `•••• •••• ${num.slice(-4)}` : num

  if (loading) return null

  return (
    <ClientLayout activeTab="/client/data_entry/banking_details">
      <div className="space-y-8 max-w-6xl mx-auto pb-10 px-4 md:px-0">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Banking Details
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your bank accounts and financial information.
            </p>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className={cn(
              "shadow-lg transition-all duration-300",
              showForm 
                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400" 
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
            )}
          >
            {showForm ? (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel Adding
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Account
              </>
            )}
          </Button>
        </motion.div>

        {/* ================= ADD FORM ================= */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Card className="border-blue-100 shadow-md bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-950 dark:to-slate-900 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Landmark className="h-5 w-5" />
                    New Account Details
                  </CardTitle>
                  <CardDescription>
                    Enter your banking details carefully for future transactions.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      
                      {/* Bank Name */}
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="e.g. HDFC Bank"
                            value={account.bankName}
                            onChange={(e) => handleChange("bankName", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      {/* Branch Name */}
                      <div className="space-y-2">
                        <Label>Branch Name</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="e.g. Koramangala"
                            value={account.branchName}
                            onChange={(e) => handleChange("branchName", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      {/* Account Type */}
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <Select onValueChange={(v) => handleChange("accountType", v)}>
                          <SelectTrigger className="bg-white dark:bg-slate-900">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Savings">Savings Account</SelectItem>
                            <SelectItem value="Current">Current Account</SelectItem>
                            <SelectItem value="Salary">Salary Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Account Holder */}
                      <div className="space-y-2">
                        <Label>Holder Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="Name as per Passbook"
                            value={account.accountHolderName}
                            onChange={(e) => handleChange("accountHolderName", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      {/* Account Number */}
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900 font-mono" 
                            placeholder="0000 0000 0000"
                            value={account.accountNumber}
                            onChange={(e) => handleChange("accountNumber", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      {/* IFSC */}
                      <div className="space-y-2">
                        <Label>IFSC Code</Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900 uppercase" 
                            placeholder="HDFC0001234"
                            value={account.ifsc}
                            onChange={(e) => handleChange("ifsc", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="space-y-2">
                        <Label>Linked Mobile</Label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="+91 98765 43210"
                            value={account.mobileNumber}
                            onChange={(e) => handleChange("mobileNumber", e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                       {/* UPI ID */}
                       <div className="space-y-2">
                        <Label>UPI ID (Optional)</Label>
                        <div className="relative">
                          <QrCode className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="user@bank"
                            value={account.upiId}
                            onChange={(e) => handleChange("upiId", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Nominee */}
                      <div className="space-y-2">
                        <Label>Nominee Name</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            className="pl-9 bg-white dark:bg-slate-900" 
                            placeholder="Nominee Name"
                            value={account.nomineeName}
                            onChange={(e) => handleChange("nomineeName", e.target.value)}
                          />
                        </div>
                      </div>

                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                        Save Account
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        className="w-full md:w-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= DATA TABLE VIEW ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {accounts.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 dark:border-slate-800">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <Wallet className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                No Bank Accounts Added
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 mb-6">
                Add your Savings or Current accounts to streamline your payouts and records.
              </p>
              <Button onClick={() => setShowForm(true)} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Add First Account
              </Button>
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#0f172a] overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="w-[250px] font-semibold text-slate-700 dark:text-slate-200">Bank Details</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Account Info</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Branch & IFSC</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Holder & Contact</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((acc) => (
                    <TableRow key={acc.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                      
                      {/* Bank Details */}
                      <TableCell className="align-top py-4">
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2 rounded-lg mt-1", 
                             acc.accountType === "Savings" ? "bg-blue-50 text-blue-600" :
                             acc.accountType === "Current" ? "bg-orange-50 text-orange-600" :
                             "bg-emerald-50 text-emerald-600"
                          )}>
                            <Landmark className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{acc.bankName}</p>
                            <Badge variant="outline" className="mt-1 border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400">
                              {acc.accountType}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>

                      {/* Account Info */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-mono text-slate-700 dark:text-slate-300">
                            <CreditCard className="h-4 w-4 text-slate-400" />
                            <span>{maskAccountNumber(acc.accountNumber)}</span>
                          </div>
                          {acc.upiId && (
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <QrCode className="h-3 w-3" />
                              <span>{acc.upiId}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Branch & IFSC */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            <span>{acc.branchName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Hash className="h-3.5 w-3.5 text-slate-400" />
                            <span className="font-mono">{acc.ifsc}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Holder & Contact */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-200">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <span>{acc.accountHolderName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-3.5 w-3.5 text-slate-400" />
                            <span>{acc.mobileNumber}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="align-top py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(acc.id)}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>
    </ClientLayout>
  )
}