"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

import {
  ShieldCheck,
  Calendar,
  Bell,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

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
  {
    type: "Vehicle Insurance",
    provider: "ICICI Lombard",
    policyName: "Car Protect 360",
    coverage: 800000,
    premium: 5500,
    dueDate: "12 Sep 2025",
    status: "Active",
    reminder: true,
  },
]

const claims = [
  {
    policy: "Health Suraksha",
    claimId: "CLM-2025-001",
    amount: 45000,
    date: "10 Mar 2025",
    status: "Approved",
  },
  {
    policy: "Family Floater",
    claimId: "CLM-2025-002",
    amount: 22000,
    date: "22 Jun 2025",
    status: "In Review",
  },
]

/* ---------------- ANIMATION VARIANTS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/* ---------------- COMPONENT ---------------- */

export default function ClientInsurance() {
  const [policies, setPolicies] = useState(insurancePolicies)

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
    <ClientLayout activeTab="/client/my_insurance">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >


        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
          
          {/* Total Policies Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-400 to-blue-600 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <ShieldCheck className="h-24 w-24 text-white" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Total Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{policies.length}</div>
              <p className="text-xs text-white/90 mt-1">Active Plans</p>
            </CardContent>
          </Card>

          {/* Total Coverage Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-400 to-teal-500 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Activity className="h-24 w-24 text-white" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Total Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                ₹{totalCoverage.toLocaleString()}
              </div>
              <p className="text-xs text-white/90 mt-1">Sum Assured</p>
            </CardContent>
          </Card>

          {/* Premium Due Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-400 to-purple-600 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Calendar className="h-24 w-24 text-white" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Next Premium Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">15 Jul 2025</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-white/90">
                <Bell className="h-3 w-3" />
                <span>Reminder Set</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* INSURANCE POLICIES TABLE */}
        <motion.div variants={itemVariants}>
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">Insurance Policies</CardTitle>
                  <CardDescription className="text-blue-600/80 dark:text-slate-400">Policy details, premiums, and reminders</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Type & Provider</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Policy Name</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right h-12">Coverage</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right h-12">Premium</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Due Date</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12 pr-6">Reminder</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {policies.map((policy, index) => (
                    <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                      <TableCell className="pl-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900 dark:text-slate-100">{policy.provider}</span>
                          <Badge variant="outline" className="w-fit mt-1 text-xs border-blue-200 text-blue-600 bg-white/50 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                            {policy.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                        {policy.policyName}
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-700 dark:text-slate-300">
                        ₹{policy.coverage.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-700 dark:text-slate-300">
                        ₹{policy.premium.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {policy.dueDate}
                      </TableCell>
                      <TableCell className="pr-6">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={policy.reminder}
                            onCheckedChange={() => toggleReminder(index)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                          <span className={cn("text-xs font-medium", policy.reminder ? "text-blue-600" : "text-slate-400")}>
                            {policy.reminder ? "On" : "Off"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* CLAIM TRACKING TABLE */}
        <motion.div variants={itemVariants}>
          <Card className="border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">Claim Tracking</CardTitle>
                  <CardDescription className="text-blue-600/80 dark:text-slate-400">Track submitted insurance claims</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 pl-6 h-12">Policy Name</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Claim ID</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12">Date Submitted</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right h-12">Amount</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-300 h-12 pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {claims.map((claim, index) => (
                    <TableRow key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group border-b border-slate-100 dark:border-slate-800">
                      <TableCell className="pl-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                        {claim.policy}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-slate-500 dark:text-slate-400">
                        {claim.claimId}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500 dark:text-slate-400">
                        {claim.date}
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-700 dark:text-slate-300">
                        ₹{claim.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="pr-6">
                        <Badge
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-none",
                            claim.status === "Approved"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                          )}
                        >
                          {claim.status === "Approved" ? 
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Approved</span> : 
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> In Review</span>
                          }
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </ClientLayout>
  )
}