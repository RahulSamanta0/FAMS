"use client"

import { type ReactNode, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  FileText,
  Database,
  BarChart3,
  LineChart,
  Bot,
  Shield,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Calculator,
  Target,
  PieChart,
  Bell,
  UserCheck,
  ClipboardList,
  Landmark,
  Receipt,
  FileUser,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: ReactNode
  activeTab?: string
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { 
    icon: Users, 
    label: "Clients", 
    href: "/admin/clients",
    children: [
      { icon: UserCheck, label: "Approved Clients", href: "/admin/clients/approved" },
      { icon: ClipboardList, label: "Pending Approvals", href: "/admin/clients/pending" },
      { icon: Users, label: "All Clients", href: "/admin/clients/all" },
      { icon: FileUser, label: "Client Fact Sheets", href: "/admin/clients/factsheets" },
    ]
  },
  { 
    icon: TrendingUp, 
    label: "Investments", 
    href: "/admin/investments",
    children: [
      { icon: PieChart, label: "Portfolio Overview", href: "/admin/investments/portfolio" },
      { icon: BarChart3, label: "Performance Reports", href: "/admin/investments/performance" },
      { icon: Target, label: "Investment Offers", href: "/admin/investments/offers" },
    ]
  },
  { 
    icon: ShieldCheck, 
    label: "Insurance", 
    href: "/admin/insurance",
    children: [
      { icon: Shield, label: "Policies Overview", href: "/admin/insurance/policies" },
      { icon: FileText, label: "Claims Tracking", href: "/admin/insurance/claims" },
      { icon: Calculator, label: "Premium Analysis", href: "/admin/insurance/premiums" },
    ]
  },
  { 
    icon: FileText, 
    label: "Reports", 
    href: "/admin/reports",
    children: [
      { icon: BarChart3, label: "Client Reports", href: "/admin/reports/clients" },
      { icon: LineChart, label: "Financial Reports", href: "/admin/reports/financial" },
      { icon: Calculator, label: "Tax Reports", href: "/admin/reports/tax" },
      { icon: Receipt, label: "White Income Reports", href: "/admin/reports/white-income" },
    ]
  },
  { 
    icon: Database, 
    label: "Analytics", 
    href: "/admin/analytics",
    children: [
      { icon: Bot, label: "AI Assistant", href: "/admin/analytics/ai" },
      { icon: LineChart, label: "Market Analysis", href: "/admin/analytics/market" },
      { icon: Target, label: "Performance Metrics", href: "/admin/analytics/metrics" },
    ]
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/admin/settings",
    children: [
      { icon: Users, label: "User Management", href: "/admin/settings/users" },
      { icon: Shield, label: "Security Settings", href: "/admin/settings/security" },
      { icon: Database, label: "Integration Settings", href: "/admin/settings/integrations" },
      { icon: Landmark, label: "Compliance Rules", href: "/admin/settings/compliance" },
    ]
  },
  { icon: HelpCircle, label: "Help & Support", href: "/admin/help" },
]

export function AdminLayout({ children, activeTab }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      return saved === 'true'
    }
    return false
  })
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const handleLogout = () => router.push("/")

  // Mount check to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load and apply dark mode from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode !== null) {
        const isDark = savedDarkMode === 'true'
        setDarkMode(isDark)
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  }, [])

  // Save and apply dark mode changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('darkMode', darkMode.toString())
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkMode, mounted])

  const currentPageTitle =
    menuItems.find((item) => item.href === activeTab)?.label || "Admin Dashboard"

  // Prevent flash of unstyled content
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-slate-900">

      {/* Sidebar - FIXED: Now properly changes with dark mode */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64",
          // Light mode sidebar - LIGHT PURPLE/BLUE
          "bg-gradient-to-b from-slate-50 via-purple-50/50 to-slate-50",
          "dark:bg-gradient-to-b dark:from-slate-950 dark:via-gray-950 dark:to-slate-950",
          "text-slate-800 dark:text-white",
          "border-r border-slate-200 dark:border-slate-800",
          "shadow-lg dark:shadow-2xl",
          "transition-all duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">

          {/* Header */}
          <div className={cn(
            "h-16 flex items-center gap-3 px-6 border-b",
            "border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80",
            "backdrop-blur-sm"
          )}>
            <div className="p-1.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-md">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">ArthYantra Admin</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Financial Management System</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-3">
            <ul className="space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.href
                const hasChildren = item.children && item.children.length > 0
                const isOpen = openDropdown === item.label

                if (hasChildren) {
                  return (
                    <li key={item.href} className="mb-2">
                      <div
                        onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                        className={cn(
                          "flex items-center gap-3 px-5 py-3 text-sm transition-all duration-200 mx-2 rounded-lg cursor-pointer",
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg"
                            : "text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform duration-300",
                            isOpen ? "rotate-180" : ""
                          )}
                        />
                      </div>
                      <div
                        className={cn(
                          "overflow-hidden transition-[max-height] duration-500 ease-in-out",
                          isOpen ? "max-h-screen" : "max-h-0"
                        )}
                      >
                        <ul className="ml-6 mt-2 space-y-1">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={cn(
                                    "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-all duration-200 mx-2",
                                    activeTab === child.href
                                      ? "bg-purple-600 dark:bg-indigo-600 text-white font-semibold"
                                      : "text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                  )}
                                >
                                  {ChildIcon && <ChildIcon className="h-4 w-4" />}
                                  {child.label}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-5 py-3 text-sm transition-all duration-200 mx-2 rounded-lg",
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg"
                          : "text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className={cn(
            "border-t p-4",
            "border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80",
            "backdrop-blur-sm"
          )}>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-700">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-white">Admin User</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Super Administrator</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 h-16 flex items-center gap-4 px-4 lg:px-6
          bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>

          <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
            {currentPageTitle}
          </h1>

          <div className="flex-1" />

          {/* Search Bar */}
          <div className="hidden md:flex items-center w-64">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search clients, reports..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const newDarkMode = !darkMode
              setDarkMode(newDarkMode)
              localStorage.setItem('darkMode', newDarkMode.toString())
              if (newDarkMode) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            }}
            className="transition hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 transition hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-600">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-white">
                  Admin User
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">superadmin@arthyantra.gov.in</p>
                </div>
              </div>
              
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              
              <DropdownMenuItem className="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200" asChild>
                <Link href="/admin/profile">
                  <UserCheck className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200" asChild>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              
              <DropdownMenuItem 
                className="hover:bg-slate-100 dark:hover:bg-slate-700 text-red-600 dark:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}