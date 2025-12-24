"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Loader2, CheckCircle2, LockKeyhole, Eye, EyeOff,
  ArrowRight, AlertCircle, UserCircle, ShieldCheck,
  Building2, IndianRupee, Shield, Key, Users, Settings
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
  description: string
}

const USER_TYPES: UserType[] = [
  {
    id: 1,
    name: "Government Employee",
    role: "client",
    icon: Users,
    color: "from-blue-600 to-blue-800",
    description: "Access salary, taxes, pensions, and financial management"
  },
  {
    id: 2,
    name: "Financial Advisor",
    role: "admin",
    icon: Settings,
    color: "from-emerald-600 to-green-700",
    description: "Administrative access for certified advisors"
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
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 border-b border-blue-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border border-white rounded-full" />
              </div>
            </div>
            <div className="text-white">
              <div className="font-bold text-sm">भारत सरकार | GOVERNMENT OF INDIA</div>
              <div className="text-xs opacity-90">Ministry of Finance - ArthYantra Portal</div>
            </div>
          </div>
          <div className="text-white text-xs bg-white/10 px-3 py-1 rounded-full">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Secure Access v2.1
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  // User Type Selector Component
  const UserTypeSelector = () => {
    const selectedUser = USER_TYPES.find(u => u.id === selectedUserType)
    
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {USER_TYPES.map((userType) => {
          const Icon = userType.icon
          const isSelected = selectedUserType === userType.id
          
          return (
            <button
              key={userType.id}
              onClick={() => setSelectedUserType(userType.id)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected 
                  ? `border-blue-500 bg-gradient-to-br ${userType.color} bg-opacity-10 shadow-md` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${userType.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                      {userType.role === 'client' ? 'Client Portal' : 'Admin Portal'}
                    </h3>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {userType.name}
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
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">
          ISO 27001 Certified • 256-bit Encryption
        </span>
      </div>
    </div>
  )

  // Footer Component
  const Footer = () => (
    <div className="w-full mt-8">
      <div className="text-center text-xs text-gray-500 space-y-1">
        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <IndianRupee className="w-3 h-3" />
            Official Government Portal
          </span>
          <span>•</span>
          <span>🇮🇳 Servers in India</span>
        </div>
        <div>
          © {new Date().getFullYear()} Ministry of Finance, Government of India. All rights reserved.
        </div>
        <div className="text-gray-400">
          For assistance: helpdesk@finance.gov.in • Toll Free: 1800-11-2024
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
      // Simulate API call
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
        className: "bg-green-50 text-green-800 border-green-200",
      })

      // Route to appropriate dashboard
      setTimeout(() => {
        router.push(selectedUserType === 1 ? "/client/dashboard" : "/admin/dashboard")
      }, 500)

    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials or network error. Please try again.",
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
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-blue-50/20"
    >
      {/* Government Banner */}
      <GovernmentBanner />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <Card 
            ref={cardRef}
            className="border-0 shadow-xl rounded-xl overflow-hidden bg-white"
          >
            <CardHeader className="pb-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-blue-50">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Arthayantra 
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Government Financial Management System
                    </CardDescription>
                  </div>
                </div>
                
                {/* Security Indicator */}

                <SecurityIndicator />
                
                {/* User Type Selector */}
                <UserTypeSelector />
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Selected Portal Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-50/30 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    {selectedUserTypeData && (() => {
                      const Icon = selectedUserTypeData.icon
                      return <Icon className="w-5 h-5 text-blue-600" />
                    })()}
                    <div>
                      <div className="text-sm font-semibold text-blue-800">
                        {selectedUserTypeData?.role === 'client' ? 'Client Portal' : 'Admin Portal'}
                      </div>
                      <div className="text-xs text-blue-600">
                        {selectedUserTypeData?.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircle className="w-4 h-4 text-blue-600" />
                      {selectedUserType === 1 ? 'Government ID / Email' : 'Advisor ID'}
                    </div>
                  </Label>
                  <Input
                    id="username"
                    placeholder={
                      selectedUserType === 1 
                        ? "e.g., DOE12345 or name@department.gov.in"
                        : "Enter your advisor ID"
                    }
                    className="h-11 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <LockKeyhole className="w-4 h-4 text-blue-600" />
                      Password
                    </div>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-5 w-5" />
                        Login to {selectedUserTypeData?.role === 'client' ? 'Client' : 'Admin'} Portal
                      </>
                    )}
                  </Button>
                </div>

                {/* Help Link */}
                <div className="text-center pt-4">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-gray-500 hover:text-blue-600"
                    onClick={() => {
                      toast({
                        title: "Help Requested",
                        description: "IT support team has been notified. You will receive an email shortly.",
                      })
                    }}
                  >
                    <AlertCircle className="mr-1 h-4 w-4" />
                    Forgot Password or Need Help?
                  </Button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3 bg-gradient-to-r from-gray-50 to-gray-50/30 p-4 rounded-lg border border-gray-200">
                    <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700">
                      <span className="font-medium">Security Notice:</span> This portal is for authorized government personnel only. 
                      Unauthorized access attempts are logged and may be prosecuted under the IT Act, 2000. 
                      All data is encrypted and stored on secure Indian government servers.
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Status Indicators */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>System: Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Last Updated: {new Date().toLocaleDateString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              <span>Users Online: 2,847</span>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}