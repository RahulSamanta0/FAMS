"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
  PieChart,
  ArrowUpRight
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
  CartesianGrid,
  Legend
} from "recharts"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA (UNCHANGED) ---------------- */

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

export default function ClientReports() {
  const [caAccess, setCaAccess] = useState(true)

  const totalAssets = assetStatements.reduce((a, b) => a + b.value, 0)
  const totalWhiteIncome = whiteIncomeSummary.reduce((a, b) => a + b.amount, 0)

  const yoyChange =
    incomeTaxReports[1].taxableIncome -
    incomeTaxReports[0].taxableIncome

  const handleDownloadReport = () => {
    // Generate comprehensive financial report
    const reportContent = `
=================================================================
              CONSOLIDATED FINANCIAL REPORT
=================================================================
Generated on: ${new Date().toLocaleDateString('en-IN', { 
  day: '2-digit', 
  month: 'long', 
  year: 'numeric' 
})}

-----------------------------------------------------------------
                    INCOME TAX HISTORY
-----------------------------------------------------------------
${incomeTaxReports.map(r => 
  `${r.year}
  Taxable Income: ₹${r.taxableIncome.toLocaleString('en-IN')}
  Tax Paid:       ₹${r.taxPaid.toLocaleString('en-IN')}`
).join('\n\n')}

Year-over-Year Change: ₹${Math.abs(yoyChange).toLocaleString('en-IN')} (${yoyChange >= 0 ? 'Increase' : 'Decrease'})

-----------------------------------------------------------------
                 WHITE INCOME SOURCES
-----------------------------------------------------------------
${whiteIncomeSummary.map(i => 
  `${i.source.padEnd(20)} ₹${i.amount.toLocaleString('en-IN')}`
).join('\n')}

Total White Income:      ₹${totalWhiteIncome.toLocaleString('en-IN')}

-----------------------------------------------------------------
                   ASSET DECLARATIONS
-----------------------------------------------------------------
${assetStatements.map(a => 
  `${a.asset.padEnd(25)} [${a.category}]
  Declared Value: ₹${a.value.toLocaleString('en-IN')}`
).join('\n\n')}

Total Declared Assets:   ₹${totalAssets.toLocaleString('en-IN')}

=================================================================
           This report is valid for CA filing purposes
=================================================================
    `.trim()

    // Create and trigger download
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Financial_Report_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <ClientLayout activeTab="/client/reports">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >

        {/* HEADER */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Financial Reports
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Consolidated views for tax planning, auditing, and asset tracking.
          </p>
        </motion.div>

        {/* TOP ROW: CA REPORT & YOY */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
          
          {/* CA Ready Consolidated Report */}
          <Card className="md:col-span-2 relative overflow-hidden border-indigo-100 bg-gradient-to-br from-indigo-50 to-white shadow-lg dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute top-0 right-0 p-3 opacity-5">
              <FileText className="h-32 w-32 text-indigo-600" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                CA-Ready Consolidated Report
              </CardTitle>
              <CardDescription className="text-indigo-600/80 dark:text-slate-400">
                Single downloadable report covering tax, assets, and income history.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Button 
                onClick={handleDownloadReport}
                className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none dark:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Consolidated Report
              </Button>
              <span className="text-sm font-medium text-slate-500 bg-white/50 px-3 py-1 rounded-full border border-indigo-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400">
                Valid for CA Filing
              </span>
            </CardContent>
          </Card>

          {/* Year-over-Year Comparison */}
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-md dark:bg-slate-900 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-base">
                <TrendingUp className="h-5 w-5" />
                YoY Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  ₹{Math.abs(yoyChange).toLocaleString()}
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "w-fit mt-2 px-2 py-1 text-sm font-medium border-0",
                    yoyChange >= 0
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  )}
                >
                  {yoyChange >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1 rotate-180" />}
                  {yoyChange >= 0 ? "Increase" : "Decrease"} in Income
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* MIDDLE ROW: TABLES */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Income Tax Reports */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-blue-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
              <CardHeader className="bg-blue-50/30 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Income Tax History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-blue-50/50 dark:bg-slate-900/80">
                    <TableRow>
                      <TableHead className="pl-6 h-12 text-slate-600 dark:text-slate-300">Financial Year</TableHead>
                      <TableHead className="text-right h-12 text-slate-600 dark:text-slate-300">Taxable Income</TableHead>
                      <TableHead className="text-right h-12 pr-6 text-slate-600 dark:text-slate-300">Tax Paid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeTaxReports.map((r, i) => (
                      <TableRow key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-b border-slate-100 dark:border-slate-800 transition-colors">
                        <TableCell className="pl-6 font-medium text-slate-700 dark:text-slate-300">{r.year}</TableCell>
                        <TableCell className="text-right text-slate-600 dark:text-slate-400">
                          ₹{r.taxableIncome.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right pr-6 font-semibold text-blue-600 dark:text-blue-400">
                          ₹{r.taxPaid.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* White-Income Summary */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-emerald-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
              <CardHeader className="bg-emerald-50/30 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  White Income Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-emerald-50/50 dark:bg-slate-900/80">
                    <TableRow>
                      <TableHead className="pl-6 h-12 text-slate-600 dark:text-slate-300">Source</TableHead>
                      <TableHead className="text-right h-12 pr-6 text-slate-600 dark:text-slate-300">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {whiteIncomeSummary.map((i, idx) => (
                      <TableRow key={idx} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 border-b border-slate-100 dark:border-slate-800 transition-colors">
                        <TableCell className="pl-6 font-medium text-slate-700 dark:text-slate-300">{i.source}</TableCell>
                        <TableCell className="text-right pr-6 text-slate-600 dark:text-slate-400">
                          ₹{i.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-50/80 dark:bg-slate-900/30">
                      <TableCell className="pl-6 font-bold text-slate-800 dark:text-white">Total White Income</TableCell>
                      <TableCell className="text-right pr-6 font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                        ₹{totalWhiteIncome.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ASSET STATEMENTS */}
        <motion.div variants={itemVariants}>
          <Card className="border-sky-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="bg-sky-50/30 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Home className="h-5 w-5 text-sky-500" />
                Asset Declarations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-sky-50/50 dark:bg-slate-900/80">
                  <TableRow>
                    <TableHead className="pl-6 h-12 text-slate-600 dark:text-slate-300">Asset</TableHead>
                    <TableHead className="h-12 text-slate-600 dark:text-slate-300">Category</TableHead>
                    <TableHead className="text-right pr-6 h-12 text-slate-600 dark:text-slate-300">Declared Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetStatements.map((a, i) => (
                    <TableRow key={i} className="hover:bg-sky-50/30 dark:hover:bg-sky-900/10 border-b border-slate-100 dark:border-slate-800 transition-colors">
                      <TableCell className="pl-6 font-medium text-slate-700 dark:text-slate-300">{a.asset}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700">
                          {a.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 font-medium text-slate-800 dark:text-white">
                        ₹{a.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-slate-50/80 dark:bg-slate-900/30">
                    <TableCell className="pl-6 font-bold text-slate-800 dark:text-white">Total Declared Assets</TableCell>
                    <TableCell />
                    <TableCell className="text-right pr-6 font-bold text-sky-600 dark:text-sky-400 text-lg">
                      ₹{totalAssets.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* CHARTS SECTION */}
        <motion.div variants={itemVariants}>
          <Card className="border-slate-200 dark:border-slate-800 shadow-md bg-gradient-to-br from-white to-blue-50/20 dark:from-slate-900 dark:to-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <PieChart className="h-5 w-5 text-indigo-500" />
                Financial Overview Charts
              </CardTitle>
              <CardDescription className="dark:text-slate-400">Visual trends for quick CA and client review</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-8 md:grid-cols-2 p-6">
              
              {/* Line Chart */}
              <div className="h-72 bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-sm">
                <h4 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" /> Taxable Income Trend
                </h4>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={incomeTaxReports}>
                    <defs>
                      <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="year" axisLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line type="monotone" dataKey="taxableIncome" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: "#3b82f6"}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="h-72 bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-sm">
                <h4 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-indigo-500" /> Tax Paid History
                </h4>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={incomeTaxReports}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="year" axisLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="taxPaid" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </CardContent>
          </Card>
        </motion.div>

        
      </motion.div>
    </ClientLayout>
  )
}