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
  User,
  Building2,
  Receipt,
  TrendingUp,
  Shield,
  Calculator,
  FileText,
  BarChart3,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ClipboardEdit,
  ChevronDown,
  FileUser,
  Landmark,
  Home as HomeIcon,
  PieChart,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ClientLayoutProps {
  children: ReactNode
  activeTab?: string
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/client/dashboard" },
  { icon: User, label: "Profile", href: "/client/profile" },
  {
    icon: ClipboardEdit,
    label: "Data Entry",
    href: "/client/data_entry",
    children: [
      { icon: FileUser, label: "Family Details", href: "/client/data_entry/family_details" },
      { icon: Landmark, label: "Banking Details", href: "/client/data_entry/banking_details" },
      { icon: HomeIcon, label: "Asset Declaration", href: "/client/data_entry/asset_declaration" },
      { icon: PieChart, label: "Investments", href: "/client/data_entry/investments" },
    ]
  },
  { icon: Building2, label: "Salary & Bank Accounts", href: "/client/my_salary" },
  { icon: Receipt, label: "Receipts & Expenses", href: "/client/Receipts_Expenses" },
  { icon: TrendingUp, label: "Investments", href: "/client/investments" },
  { icon: Shield, label: "Insurance", href: "/client/my_insurance" },
  { icon: Calculator, label: "Tax & TDS", href: "/client/tax" },
  { icon: FileText, label: "Assets Statement", href: "/client/assets_statement" },
  { icon: BarChart3, label: "Reports", href: "/client/reports" },
  { icon: HelpCircle, label: "Help & Support", href: "/client/help_support" },
]

export function ClientLayout({ children, activeTab }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage if available
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
    menuItems.find((item) => item.href === activeTab)?.label || "Dashboard"

  // Prevent flash of unstyled content
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-slate-900">

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64",
          "bg-gradient-to-b from-slate-50 via-blue-50 to-slate-50",
          "dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
          "text-slate-700 dark:text-white",
          "border-r border-slate-200 dark:border-slate-700",
          "shadow-lg dark:shadow-2xl",
          "transition-all duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">

          {/* Header */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Financial Information Portal</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Government of India</p>
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
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg"
                            : "text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
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
                                      ? "bg-blue-600 text-white font-semibold"
                                      : "text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
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
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg"
                          : "text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
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

          {/* Logout */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white/50 dark:bg-slate-800/50">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-700 border border-transparent transition-all"
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

          <h1 className="text-lg font-semibold text-[#00356B] dark:text-white">
            {currentPageTitle}
          </h1>

          <div className="flex-1" />

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
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
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-white">
                  John Doe
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <DropdownMenuLabel className="text-slate-900 dark:text-white">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              <DropdownMenuItem className="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200" asChild>
                <Link href="/client/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                onClick={handleLogout}
              >
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
