"use client"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Wallet, AlertCircle, Calendar } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const incomeExpenseData = [
	{ month: "Jan", income: 75000, expense: 45000 },
	{ month: "Feb", income: 75000, expense: 48000 },
	{ month: "Mar", income: 75000, expense: 42000 },
	{ month: "Apr", income: 75000, expense: 50000 },
	{ month: "May", income: 80000, expense: 46000 },
	{ month: "Jun", income: 75000, expense: 44000 },
]

const investmentData = [
	{ month: "Jan", value: 250000 },
	{ month: "Feb", value: 265000 },
	{ month: "Mar", value: 270000 },
	{ month: "Apr", value: 280000 },
	{ month: "May", value: 295000 },
	{ month: "Jun", value: 310000 },
]

export default function ClientDashboard() {
	return (
		<ClientLayout activeTab="/client/dashboard">
			<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
				{/* Summary Cards */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-900/50 dark:via-blue-800/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
								Monthly Income
							</CardTitle>
							<div className="p-2 bg-blue-200 dark:bg-blue-700 rounded-full">
								<DollarSign className="h-4 w-4 text-blue-700 dark:text-blue-200" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-blue-900 dark:text-blue-50">₹75,000</div>
							<p className="text-xs text-blue-700 dark:text-blue-200 flex items-center gap-1 mt-1">
								<TrendingUp className="h-3 w-3" />
								+5% from last month
							</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 dark:from-green-900/50 dark:via-green-800/50 dark:to-green-900/50 border-green-200 dark:border-green-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
								Monthly Expenses
							</CardTitle>
							<div className="p-2 bg-green-200 dark:bg-green-700 rounded-full">
								<Wallet className="h-4 w-4 text-green-700 dark:text-green-200" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-900 dark:text-green-50">₹44,000</div>
							<p className="text-xs text-green-700 dark:text-green-200 flex items-center gap-1 mt-1">
								<TrendingDown className="h-3 w-3" />
								-8% from last month
							</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 dark:from-purple-900/50 dark:via-purple-800/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
								Savings Rate
							</CardTitle>
							<div className="p-2 bg-purple-200 dark:bg-purple-700 rounded-full">
								<TrendingUp className="h-4 w-4 text-purple-700 dark:text-purple-200" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-purple-900 dark:text-purple-50">41.3%</div>
							<p className="text-xs text-purple-700 dark:text-purple-200 mt-1">Excellent progress</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 dark:from-orange-900/50 dark:via-orange-800/50 dark:to-orange-900/50 border-orange-200 dark:border-orange-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">
								Est. Tax (FY 2024-25)
							</CardTitle>
							<div className="p-2 bg-orange-200 dark:bg-orange-700 rounded-full">
								<AlertCircle className="h-4 w-4 text-orange-700 dark:text-orange-200" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-orange-900 dark:text-orange-50">₹45,600</div>
							<p className="text-xs text-orange-700 dark:text-orange-200 mt-1">Under old regime</p>
						</CardContent>
					</Card>
				</div>

				{/* Alerts & Reminders */}
				<div className="grid gap-4 lg:grid-cols-2">
					<Card className="hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 backdrop-blur">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-700 dark:to-indigo-600 rounded-lg">
									<Calendar className="h-4 w-4 text-indigo-700 dark:text-indigo-100" />
								</div>
								Alerts & Reminders
							</CardTitle>
							<CardDescription>Important notifications</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<Alert className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200">
								<Calendar className="h-4 w-4 text-blue-600 dark:text-blue-300" />
								<AlertTitle className="text-blue-900 dark:text-blue-100">Tax Filing Due</AlertTitle>
								<AlertDescription className="text-blue-700 dark:text-blue-200">
									Your tax filing for FY 2023-24 is due in 7 days. Complete your ITR now.
								</AlertDescription>
							</Alert>
							<Alert className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40 border-green-200 dark:border-green-700 hover:shadow-md transition-all duration-200">
								<TrendingUp className="h-4 w-4 text-green-600 dark:text-green-300" />
								<AlertTitle className="text-green-900 dark:text-green-100">SIP Payment</AlertTitle>
								<AlertDescription className="text-green-700 dark:text-green-200">
									Your monthly SIP of ₹10,000 will be debited on 1st July.
								</AlertDescription>
							</Alert>
							<Alert className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/40 border-orange-200 dark:border-orange-700 hover:shadow-md transition-all duration-200">
								<AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-300" />
								<AlertTitle className="text-orange-900 dark:text-orange-100">Insurance Premium</AlertTitle>
								<AlertDescription className="text-orange-700 dark:text-orange-200">
									Life insurance premium payment is due on 15th July 2024.
								</AlertDescription>
							</Alert>
						</CardContent>
					</Card>

					<Card className="hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 backdrop-blur overflow-hidden">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg">
									<TrendingUp className="h-4 w-4 text-emerald-700" />
								</div>
								Investment Performance
							</CardTitle>
							<CardDescription>Total portfolio value: ₹3,10,000</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={{
									value: {
										label: "Portfolio Value",
										color: "hsl(142, 76%, 36%)",
									},
								}}
								className="h-[200px]"
							>
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={investmentData}>
										<defs>
											<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
												<stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
											</linearGradient>
										</defs>
										<CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
										<XAxis dataKey="month" stroke="#64748b" className="dark:stroke-slate-400" />
										<YAxis stroke="#64748b" className="dark:stroke-slate-400" />
										<ChartTooltip content={<ChartTooltipContent />} />
										<Line
											type="monotone"
											dataKey="value"
											stroke="hsl(142, 76%, 36%)"
											strokeWidth={3}
											dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }}
											activeDot={{ r: 6 }}
											fill="url(#colorValue)"
										/>
									</LineChart>
								</ResponsiveContainer>
							</ChartContainer>
							<div className="mt-4 flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border border-green-200 dark:border-green-700">
								<div>
									<p className="text-sm text-muted-foreground dark:text-slate-300">Returns (6M)</p>
									<p className="text-3xl font-bold text-green-600 dark:text-green-400">+24%</p>
								</div>
								<Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-900/70 px-3 py-1 border border-green-300 dark:border-green-700">
									<TrendingUp className="mr-1 h-3 w-3" />
									Performing Well
								</Badge>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Income vs Expense Chart */}
				<Card className="hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 backdrop-blur overflow-hidden">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<div className="p-2 bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-700 dark:to-violet-600 rounded-lg">
								<BarChart className="h-4 w-4 text-violet-700 dark:text-violet-100" />
							</div>
							Income vs Expense (Last 6 Months)
						</CardTitle>
						<CardDescription>Track your monthly cash flow</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={{
								income: {
									label: "Income",
									color: "hsl(142, 76%, 36%)",
								},
								expense: {
									label: "Expense",
									color: "hsl(346, 77%, 49%)",
								},
							}}
							className="h-[300px]"
						>
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={incomeExpenseData}>
									<defs>
										<linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8} />
											<stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.4} />
										</linearGradient>
										<linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="hsl(346, 77%, 49%)" stopOpacity={0.8} />
											<stop offset="95%" stopColor="hsl(346, 77%, 49%)" stopOpacity={0.4} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
									<XAxis dataKey="month" stroke="#64748b" className="dark:stroke-slate-400" />
									<YAxis stroke="#64748b" className="dark:stroke-slate-400" />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Legend />
									<Bar dataKey="income" fill="url(#colorIncome)" radius={[8, 8, 0, 0]} />
									<Bar dataKey="expense" fill="url(#colorExpense)" radius={[8, 8, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</ClientLayout>
	)
}

// Note: This file uses the same button styling pattern for consistency
// Primary buttons use: bg-[#00356B] hover:bg-[#002147] (Government blue)
// Secondary buttons use: border-2 border-[#00356B] with hover effects
// All buttons have: h-12 text-base px-8 font-medium rounded-md
