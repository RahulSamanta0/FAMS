"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientLayout } from "@/components/client-layout"
import Link from "next/link"
import { FileUser, Landmark, Home, TrendingUp } from "lucide-react"

const dataEntryOptions = [
  {
    title: "Family Details",
    description: "Manage your family member information",
    href: "/client/data_entry/family_details",
    icon: FileUser,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Banking Details",
    description: "Update your bank account information",
    href: "/client/data_entry/banking_details",
    icon: Landmark,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Asset Declaration",
    description: "Declare your assets and properties",
    href: "/client/data_entry/asset_declaration",
    icon: Home,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Investments",
    description: "Track your investment portfolio",
    href: "/client/data_entry/investments",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500"
  },
]

export default function DataEntryPage() {
  return (
    <ClientLayout activeTab="/client/data_entry">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Data Entry</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Select a category to manage your financial information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dataEntryOptions.map((option) => {
            const Icon = option.icon
            return (
              <Link key={option.href} href={option.href}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full border-2 hover:border-blue-500 dark:hover:border-blue-400">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900 dark:text-white">{option.title}</CardTitle>
                    <CardDescription className="dark:text-slate-400">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </ClientLayout>
  )
}
