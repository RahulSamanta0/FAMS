"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Home,
  FileText,
  Users,
  CreditCard,
  Package,
  Building2,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Wallet,
  Receipt,
  TrendingUp,
  Shield,
  Calculator,
  BarChart3,
  Bell,
  MessageSquare,
  HelpCircle,
  Database,
  DatabaseBackup,
  ClipboardEdit,
  MessageCircle,
  LineChart,
  Bot,
  Search,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { removeUserData, getUserData } from "@/lib/cookies"

// --- Menu Items ---
const menuItems = [
  // Client Portal (UserTypeID: 1)
  {
    href: "/client/dashboard",
    icon: Home,
    label: "Dashboard",
    routeAllowed: [1],
  },
  {
    href: "/client/profile",
    icon: User,
    label: "Profile",
    routeAllowed: [1],
  },
  {
    href: "/client/data_entry",
    icon: ClipboardEdit,
    label: "Data Entry",
    routeAllowed: [1],
  },
  {
    href: "/client/my_salary",
    icon: Building2,
    label: "My salary & Bank Accounts",
    routeAllowed: [1],
  },
  {
    href: "/client/Receipts_Expenses",
    icon: Receipt,
    label: "Receipts & Expenses",
    routeAllowed: [1],
  },
  {
    href: "/client/investments",
    icon: TrendingUp,
    label: "My Investments",
    routeAllowed: [1],
  },

  {
    href: "/client/my_insurance",
    icon: Shield,
    label: "My Insurance",
    routeAllowed: [1],
  },
  {
    href: "/client/tax",
    icon: Calculator,
    label: "Tax & TDS",
    routeAllowed: [1],
  },
  {
    href: "/client/assets_statement",
    icon: FileText,
    label: "Assets Statement",
    routeAllowed: [1],
  },
  {
    href: "/client/reports",
    icon: BarChart3,
    label: "Reports",
    routeAllowed: [1],
  },
  {
    href: "/client/help_support",
    icon: HelpCircle,
    label: "Help & Support",
    routeAllowed: [1],
  },

  // Admin Portal (UserTypeID: 2)
  {
    href: "/admin/dashboard",
    icon: Home,
    label: "Dashboard",
    routeAllowed: [2],
  },
  {
    href: "/admin/clients",
    icon: Users,
    label: "Clients",
    routeAllowed: [2],
  },
  {
    href: "/admin/compliance",
    icon: Shield,
    label: "Compliance & Audit Logs",
    routeAllowed: [2],
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Settings",
    routeAllowed: [2],
  },
   {
    href: "/admin/Approval",
    icon: Users,
    label: "Approval",
    routeAllowed: [2],
  },
  {
    href: "/admin/help",
    icon: HelpCircle,
    label: "Help & Documentation",
    routeAllowed: [2],
  },
]

// --- User Type Config ---
const userTypeConfig = {
  1: { name: "Client (Government Employee)", icon: User, color: "from-blue-500 to-cyan-500" },
  2: { name: "Admin (Financial Advisor)", icon: Shield, color: "from-purple-500 to-pink-500" },
}

type MenuItem = {
  href?: string
  icon?: React.ElementType
  label: string
  routeAllowed: number[]
  children?: MenuItem[]
}

export function CommonSidebar({ menu = menuItems }: { menu?: MenuItem[] } = {}) {
  const pathname = usePathname()
  const router = useRouter()
  const [userTypeID, setUserTypeID] = useState<number | null>(null)
  const [userData, setUserDataState] = useState<any>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const user = getUserData()
    if (user) {
      setUserTypeID(user.UserTypeID)
      setUserDataState(user)
    }
  }, [])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const handleLogout = () => {
    removeUserData()
    router.replace("/")
  }

  const filteredMenuItems = menu.filter((item) => item.routeAllowed && item.routeAllowed.includes(userTypeID as number))

  const userType = userTypeConfig[userTypeID as keyof typeof userTypeConfig]
  const UserTypeIcon = userType?.icon

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-transparent text-blue-600 p-2 rounded-lg transition-all duration-300"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
                bg-white border-r shadow-sm transition-all duration-300 flex flex-col h-screen w-64
                fixed lg:sticky inset-y-0 lg:top-0 left-0 z-40
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
      >
        {/* Header */}
        <div className="flex flex-col items-start p-0 border-b-2 border-blue-300 bg-blue-100 text-black">
          <div className="px-6 py-4 w-full flex items-center gap-2">
            <div className={`rounded-lg p-2 bg-linear-to-br ${userType?.color || "from-gray-400 to-gray-600"}`}>
              {UserTypeIcon && <UserTypeIcon className="text-white w-6 h-6" />}
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">{userData?.UserName || "Demo User"}</div>
              <div className="text-xs text-slate-600">{userType?.name || "User"}</div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {filteredMenuItems.map((item) => {
            // Dropdown menu item
            if (item.children) {
              const isOpen = openDropdown === item.label
              return (
                <div key={item.label} className="mb-2">
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg font-bold text-black bg-blue-100 cursor-pointer transition-all duration-200 ${isOpen ? "ring-2 ring-blue-400" : "hover:bg-blue-200"}`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  >
                    {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                    <span className="capitalize">{item.label}</span>
                    <ChevronDown
                      className={`ml-auto h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
                  >
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map(({ href, icon: ChildIcon, label }) => (
                        <Link
                          key={href ?? label}
                          href={href ?? "#"}
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors shadow-sm border border-blue-100 mb-1 ${
                            pathname === href
                              ? "bg-blue-700 text-white font-bold"
                              : "bg-blue-50 text-blue-900 hover:bg-blue-200 hover:text-blue-900"
                          }`}
                        >
                          {ChildIcon && (
                            <ChildIcon
                              className={`h-5 w-5 ${pathname === href ? "text-white" : "text-blue-700"} mr-3`}
                            />
                          )}
                          <span>{label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            // Standard menu item
            return (
              <Link
                key={item.href ?? item.label}
                href={item.href ?? "#"}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors mb-2 ${
                  pathname === item.href
                    ? "bg-blue-700 text-white font-bold"
                    : "text-black hover:bg-blue-200 hover:text-black"
                }`}
              >
                {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        {/* Logout */}
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold shadow-md hover:from-red-600 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
