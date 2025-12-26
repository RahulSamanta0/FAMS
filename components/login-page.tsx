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
  Building2, IndianRupee, Shield, Key, Users, Settings,
  GraduationCap, Briefcase, Banknote, Globe,
  Smartphone, Mail, CreditCard, TrendingUp
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
    color: "text-indigo-600",
    gradient: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    description: "Access salary, taxes, pensions, and financial management"
  },
  {
    id: 2,
    name: "Financial Advisor",
    role: "admin",
    icon: GraduationCap,
    color: "text-teal-600",
    gradient: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
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
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-3 border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border border-white/90 rounded-full" />
              </div>
            </div>
            <div className="text-white">
              <div className="font-bold text-sm tracking-wide">भारत सरकार | GOVERNMENT OF INDIA</div>
              <div className="text-xs opacity-80">Ministry of Finance - Financial Intelligence Platform</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-white/80 text-xs bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Secure Session Active
              </span>
            </div>
            <div className="hidden sm:block text-xs text-white/60">
              Last Sync: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
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
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {USER_TYPES.map((userType) => {
          const Icon = userType.icon
          const isSelected = selectedUserType === userType.id
          
          return (
            <button
              key={userType.id}
              onClick={() => setSelectedUserType(userType.id)}
              className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${
                isSelected 
                  ? `border-${userType.color.split('-')[1]}-300 shadow-lg ${userType.bgColor} border-2` 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${userType.gradient} flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className={`font-semibold text-base ${isSelected ? userType.color : 'text-gray-800'}`}>
                      {userType.role === 'client' ? 'Employee Portal' : 'Advisor Portal'}
                    </h3>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {userType.name}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
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
    <div className="flex items-center justify-center mb-6">
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-50 to-gray-50 px-5 py-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Shield className="h-5 w-5 text-emerald-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <span className="text-sm font-medium text-slate-700">
            256-bit SSL Encryption
          </span>
        </div>
        <div className="h-4 w-px bg-gray-300" />
        <div className="text-xs text-gray-500 font-medium">
          ISO 27001:2022 Certified
        </div>
      </div>
    </div>
  )

  // Footer Component
  const Footer = () => (
    <div className="w-full mt-10">
      <div className="text-center text-xs text-gray-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            Official Government Portal
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3 h-3" />
            Servers in India 🇮🇳
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Live System
          </span>
        </div>
        <div className="text-gray-600">
          © {new Date().getFullYear()} Ministry of Finance, Government of India. All rights reserved.
        </div>
        <div className="text-gray-400 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>For technical assistance: </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                support@finance.gov.in
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                Toll Free: 1800-11-2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Features Grid Component
  const FeaturesGrid = () => (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { icon: Banknote, label: 'Salary Management', color: 'text-blue-600' },
        { icon: CreditCard, label: 'Tax Planning', color: 'text-emerald-600' },
        { icon: TrendingUp, label: 'Investment', color: 'text-purple-600' },
        { icon: ShieldCheck, label: 'Pension', color: 'text-amber-600' },
      ].map((feature, index) => (
        <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color.replace('text-', '')}-50 mb-3`}>
            <feature.icon className={`w-5 h-5 ${feature.color}`} />
          </div>
          <div className="text-xs font-medium text-gray-700">{feature.label}</div>
        </div>
      ))}
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
        className: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border-emerald-200",
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
      className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-slate-50"
    >
      {/* Government Banner */}
      <GovernmentBanner />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <Card 
            ref={cardRef}
            className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm"
          >
            <CardHeader className="pb-8 pt-10 px-10 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50">
              <div className="text-center">
                {/* Logo and Title */}
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-xl">
                      <div className="w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">
                      Arthayantra 
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base mt-2">
                      Government Financial Intelligence Platform
                    </CardDescription>
                  </div>
                </div>
                
                {/* Security Indicator */}
                <SecurityIndicator />
                
                {/* User Type Selector */}
                <UserTypeSelector />
              </div>
            </CardHeader>

            <CardContent className="p-10">
              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-7">
                {/* Selected Portal Info */}
                <div className="mb-6 p-5 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-4">
                    {selectedUserTypeData && (() => {
                      const Icon = selectedUserTypeData.icon
                      return (
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${selectedUserTypeData.gradient} shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      )
                    })()}
                    <div>
                      <div className="text-sm font-semibold text-gray-800 mb-1">
                        {selectedUserTypeData?.role === 'client' ? 'Employee Portal Access' : 'Advisor Portal Access'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {selectedUserTypeData?.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Username Field */}
                <div className="space-y-2.5">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircle className="w-4 h-4 text-slate-600" />
                      <span>
                        {selectedUserType === 1 ? 'Government Employee ID' : 'Financial Advisor ID'}
                      </span>
                    </div>
                  </Label>
                  <Input
                    id="username"
                    placeholder={
                      selectedUserType === 1 
                        ? "Enter your government employee ID"
                        : "Enter your certified advisor ID"
                    }
                    className="h-12 bg-white border border-gray-300 focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 rounded-lg transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedUserType === 1 
                      ? "Format: GOV-XXXXX or official email"
                      : "Format: AD-XXXXX or registered email"
                    }
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2.5">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <LockKeyhole className="w-4 h-4 text-slate-600" />
                      Password
                    </div>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your secure password"
                      className="h-12 bg-white border border-gray-300 focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 rounded-lg pr-12 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    Minimum 8 characters with special characters
                  </div>
                </div>

                {/* Login Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-950 text-white text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Key className="mr-3 h-5 w-5" />
                        {selectedUserTypeData?.role === 'client' ? 'Access Employee Portal' : 'Access Advisor Portal'}
                      </>
                    )}
                  </Button>
                </div>

                {/* Help Link */}
                <div className="text-center pt-4">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-gray-600 hover:text-indigo-600 hover:no-underline"
                    onClick={() => {
                      toast({
                        title: "Help Requested",
                        description: "Our support team has been notified. You will receive assistance shortly.",
                        className: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 border-blue-200",
                      })
                    }}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Need help with login credentials?
                  </Button>
                </div>

                {/* Security Notice */}
               
              </form>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <FeaturesGrid />

          {/* System Status */}
         

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Background Elements - Fixed version without SVG pattern */}
     
    </div>
  )
}