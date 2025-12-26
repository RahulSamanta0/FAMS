"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Loader2, CheckCircle2, LockKeyhole, Eye, EyeOff,
  AlertCircle, UserCircle, ShieldCheck, Shield,
  Briefcase, GraduationCap, Mail, Smartphone,
  IndianRupee, Key, Globe
} from "lucide-react"
import { setUserData } from "@/lib/cookies"
import { useToast } from "@/hooks/use-toast"

interface LoginPageProps {
  onBack: () => void
  onLogin: (userData: { role: string; name: string; id: string; userTypeID: number }) => void
}

interface UserType {
  id: number
  name: string
  role: string
  icon: any
  color: string
  gradient: string
  bgColor: string
  description: string
}

const USER_TYPES: UserType[] = [
  {
    id: 1,
    name: "Government Employee",
    role: "client",
    icon: Briefcase,
    color: "text-blue-600",
    gradient: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    description: "Salary, taxes, and financial management"
  },
  {
    id: 2,
    name: "Financial Advisor",
    role: "admin",
    icon: GraduationCap,
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    description: "Certified advisory access"
  },
]

export function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [selectedUserType, setSelectedUserType] = useState<number>(1)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const router = useRouter()
  const { toast } = useToast()
  
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Government Banner Component
  const GovernmentBanner = () => (
    <div className="w-full bg-gradient-to-r from-slate-800 to-slate-900 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 border border-white/90 rounded-full" />
              </div>
            </div>
            <div className="text-white">
              <div className="font-bold text-xs tracking-wide">भारत सरकार | GOVERNMENT OF INDIA</div>
              <div className="text-xs opacity-90">Ministry of Finance</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-white/80 text-xs bg-white/10 px-3 py-1 rounded-full">
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Secure Portal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // User Type Selector Component
  const UserTypeSelector = () => {
    const selectedUser = USER_TYPES.find(u => u.id === selectedUserType)
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {USER_TYPES.map((userType) => {
          const Icon = userType.icon
          const isSelected = selectedUserType === userType.id
          
          return (
            <button
              key={userType.id}
              onClick={() => setSelectedUserType(userType.id)}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isSelected 
                  ? `border-blue-400 shadow-sm ${userType.bgColor} border-2` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${userType.gradient} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className={`font-medium text-sm ${isSelected ? userType.color : 'text-gray-800'}`}>
                      {userType.role === 'client' ? 'Employee' : 'Advisor'}
                    </h3>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {userType.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  // Security Indicator Component
  const SecurityIndicator = () => (
    <div className="mb-4">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
        <Shield className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-xs font-medium text-gray-700">
          Secure • 256-bit Encryption
        </span>
      </div>
    </div>
  )

  // Footer Component
  const Footer = () => (
    <div className="w-full mt-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ministry of Finance, GOI
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              System Operational
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-400 space-y-1">
          <div>For assistance: support@finance.gov.in | 1800-11-2024</div>
          <div>Version 2.4.1 • 🇮🇳 Made in India</div>
        </div>
      </div>
    </div>
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Credentials Required",
        description: "Please enter your username and password",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const userTypeData = USER_TYPES.find(u => u.id === selectedUserType)
      const userData = {
        UserTypeID: selectedUserType,
        role: userTypeData?.role || "client",
        name: username,
        id: `GOV${Date.now().toString().slice(-6)}`,
        UserName: username,
      }

      setUserData(userData)
      onLogin(userData)

      toast({
        title: "Access Granted",
        description: `Welcome to ${userTypeData?.name} Portal`,
        className: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border-emerald-200",
      })

      setTimeout(() => {
        router.push(selectedUserType === 1 ? "/client/dashboard" : "/admin/dashboard")
      }, 500)

    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials or network error",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedUserTypeData = USER_TYPES.find((u) => u.id === selectedUserType)

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Government Banner */}
      <GovernmentBanner />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <Card 
            ref={cardRef}
            className="border-0 shadow-lg rounded-xl overflow-hidden bg-white"
          >
            <CardHeader className="pb-4 pt-8 px-6 bg-gradient-to-b from-white to-gray-50">
              <div className="text-center">
                {/* Logo and Title */}
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Arthayantra 
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm">
                      Government Financial Platform
                    </CardDescription>
                  </div>
                </div>
                
                {/* Security Indicator */}
                <SecurityIndicator />
                
                {/* User Type Selector */}
                <UserTypeSelector />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Selected Portal Info */}
                <div className="mb-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    {selectedUserTypeData && (() => {
                      const Icon = selectedUserTypeData.icon
                      return (
                        <div className={`p-2 rounded-md bg-gradient-to-br ${selectedUserTypeData.gradient}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      )
                    })()}
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">
                        {selectedUserTypeData?.role === 'client' ? 'Employee Portal' : 'Advisor Portal'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-1.5 mb-1">
                      <UserCircle className="w-3.5 h-3.5 text-gray-600" />
                      <span>
                        {selectedUserType === 1 ? 'Employee ID' : 'Advisor ID'}
                      </span>
                    </div>
                  </Label>
                  <Input
                    id="username"
                    placeholder={
                      selectedUserType === 1 
                        ? "Enter your government ID"
                        : "Enter your advisor ID"
                    }
                    className="h-10 bg-white border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                  <div className="text-xs text-gray-500">
                    {selectedUserType === 1 
                      ? "GOV-XXXXX format"
                      : "AD-XXXXX format"
                    }
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-1.5 mb-1">
                      <LockKeyhole className="w-3.5 h-3.5 text-gray-600" />
                      Password
                    </div>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-10 bg-white border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-950 text-white font-medium rounded-lg shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" />
                        Login to Portal
                      </>
                    )}
                  </Button>
                </div>

                {/* Help Link */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      toast({
                        title: "Help Requested",
                        description: "Support team will contact you shortly.",
                        className: "bg-blue-50 text-blue-800 border-blue-200",
                      })
                    }}
                  >
                    <AlertCircle className="inline w-3 h-3 mr-1" />
                    Need help with login?
                  </button>
                </div>

                {/* Security Notice */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-600">
                      This portal is for authorized personnel only. All activities are monitored.
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Simple Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-30" />
      </div>
    </div>
  )
}