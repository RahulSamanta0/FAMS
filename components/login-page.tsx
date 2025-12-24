"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  BookOpen, UserCircle, Shield, Loader2, CheckCircle2,
  LockKeyhole, Fingerprint, Building2, ShieldCheck,
  GraduationCap, Heart, Scale, Truck, Train, Plane,
  Wifi, ArrowRight, ChevronLeft, AlertCircle, Eye,
  EyeOff, AlertTriangle, IndianRupee, Globe,
  FileText, Calendar, MapPin, Phone, Mail
} from "lucide-react"
import { setUserData } from "@/lib/cookies"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface LoginPageProps {
  onBack: () => void
  onLogin: (userData: { role: string; name: string; id: string; userTypeID: number }) => void
}

interface Stakeholder {
  id: number
  name: string
  description: string
  icon: any
  iconSecondary: any
  color: string
  bgColor: string
  badgeColor: string
  role: string
  departments?: Array<{ name: string; icon: any }>
  certifications?: string[]
}

const STAKEHOLDERS: Stakeholder[] = [
  {
    id: 1,
    name: "Government Employee",
    description: "Financial Management & Department Portal",
    icon: UserCircle,
    iconSecondary: Building2,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50",
    badgeColor: "bg-blue-100 text-blue-700",
    role: "employee",
    departments: [
      { name: "Education", icon: GraduationCap },
      { name: "Health", icon: Heart },
      { name: "Revenue", icon: Scale },
      { name: "Transport", icon: Truck },
      { name: "Railways", icon: Train },
      { name: "Aviation", icon: Plane },
      { name: "Telecom", icon: Wifi }
    ]
  },
  {
    id: 2,
    name: "Financial Advisor",
    description: "Administrative & Analytics Portal",
    icon: ShieldCheck,
    iconSecondary: Globe,
    color: "from-emerald-600 to-green-700",
    bgColor: "bg-gradient-to-br from-emerald-50 via-white to-green-50",
    badgeColor: "bg-emerald-100 text-emerald-700",
    role: "advisor",
    certifications: ["RBI Certified", "SEBI Registered", "Ministry Approved"]
  },
]

export function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [selectedStakeholder, setSelectedStakeholder] = useState<number>(1)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDepartments, setShowDepartments] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginStep, setLoginStep] = useState<"select" | "credentials" | "verification">("select")
  
  const router = useRouter()
  const { toast } = useToast()
  
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Government Banner Component
  const GovernmentBanner = () => (
    <div className="w-full bg-gradient-to-r from-saffron-500 via-white to-green-500 py-2 mb-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-saffron-600"></div>
            <div className="w-2 h-2 rounded-full bg-white border border-saffron-600"></div>
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
          <span className="text-sm font-bold text-gray-900">
            भारत सरकार | GOVERNMENT OF INDIA
          </span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            <div className="w-2 h-2 rounded-full bg-white border border-green-600"></div>
            <div className="w-2 h-2 rounded-full bg-saffron-600"></div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-700 mt-1">
          Ministry of Finance | Department of Financial Services
        </div>
      </div>
    </div>
  )

  // Security Indicator Component
  const SecurityIndicator = () => (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm font-semibold text-blue-800">
          Secure Government Portal
        </span>
      </div>
      <LockKeyhole className="h-4 w-4 text-blue-600" />
    </div>
  )

  // Stakeholder Card Component
  const StakeholderCard = ({ stakeholder, isSelected, onSelect }: { 
    stakeholder: Stakeholder, 
    isSelected: boolean, 
    onSelect: () => void 
  }) => {
    const Icon = stakeholder.icon
    const IconSecondary = stakeholder.iconSecondary
    
    return (
      <button
        data-stakeholder-id={stakeholder.id}
        onClick={onSelect}
        className={`w-full p-5 rounded-xl transition-all duration-300 ${stakeholder.bgColor} border-2 text-left ${
          isSelected 
            ? `border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/20` 
            : 'border-transparent hover:border-gray-300 hover:shadow-md'
        }`}
      >
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        )}
        
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${stakeholder.color} flex items-center justify-center shadow-md`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className={`text-lg font-bold ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                {stakeholder.name}
              </h4>
              <Badge className={stakeholder.badgeColor}>
                {stakeholder.role === 'employee' ? 'Govt' : 'Admin'}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {stakeholder.description}
            </p>
            
            <div className="flex items-center gap-2">
              <IconSecondary className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 font-medium">
                {stakeholder.role === 'employee' ? '28+ Departments' : 'Certified Advisor'}
              </span>
            </div>
          </div>
        </div>
      </button>
    )
  }

  // Footer Component
  const Footer = () => (
    <div className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <IndianRupee className="w-3 h-3" />
              <span>Govt. Financial System</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Shield className="w-3 h-3" />
              <span>ISO 27001 Certified</span>
            </div>
          </div>
          
          <div className="text-center text-gray-300">
            <div className="opacity-80">
              Ministry of Finance | Government of India
            </div>
            <div className="opacity-60 text-xs mt-1">
              © {new Date().getFullYear()} ArthYantra. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Department Selector Component
  const DepartmentSelector = () => (
    <div className="text-center">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setShowDepartments(!showDepartments)}
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        {showDepartments ? 'Hide' : 'Show'} Available Departments
      </Button>
      
      {showDepartments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STAKEHOLDERS[0].departments?.map((dept, idx) => {
              const DeptIcon = dept.icon
              return (
                <div key={idx} className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <DeptIcon className="w-5 h-5 text-blue-600 mb-2" />
                  <span className="text-xs font-medium text-gray-700">{dept.name}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )

  // Initialize animations
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !cardRef.current) return

    // Card entrance animation
    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.2
    })

    // Create government seal animation
    const createSeal = () => {
      const seal = document.createElement('div')
      seal.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] pointer-events-none'
      seal.innerHTML = `
        <div class="absolute inset-0 rounded-full border-6 border-blue-900"></div>
        <div class="absolute inset-20 rounded-full border-3 border-blue-800"></div>
        <div class="absolute inset-28 rounded-full border-2 border-blue-700"></div>
      `
      containerRef.current?.appendChild(seal)
      
      gsap.to(seal, {
        rotation: 360,
        duration: 100,
        repeat: -1,
        ease: "none"
      })
    }

    createSeal()

    return () => {
      gsap.killTweensOf(containerRef.current?.querySelectorAll('.absolute') || [])
    }
  }, [])

  const handleStakeholderSelect = (id: number) => {
    setSelectedStakeholder(id)
    setLoginStep("credentials")
    
    // Animation feedback
    const card = document.querySelector(`[data-stakeholder-id="${id}"]`)
    if (card) {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    }
  }

  const handleBack = () => {
    if (loginStep === "credentials") {
      setLoginStep("select")
    } else if (loginStep === "verification") {
      setLoginStep("credentials")
    }
  }

  const handleLogin = async () => {
    if (!selectedStakeholder || !username.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your credentials",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Show verification step
      setLoginStep("verification")
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      const userData = {
        UserTypeID: selectedStakeholder,
        role: STAKEHOLDERS.find(s => s.id === selectedStakeholder)?.role || "employee",
        name: username,
        id: `GOV${Date.now().toString().slice(-8)}`,
        UserName: username,
      }

      setUserData(userData)
      onLogin(userData)

      // Success animation
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 1.02,
          duration: 0.2,
          repeat: 3,
          yoyo: true
        })
      }

      toast({
        title: "🎉 Access Granted",
        description: `Welcome to ${STAKEHOLDERS.find(s => s.id === selectedStakeholder)?.name} Portal`,
        variant: "default",
      })

      // Route to dashboard
      setTimeout(() => {
        router.push(selectedStakeholder === 1 ? "/client/dashboard" : "/admin/dashboard")
      }, 1000)

    } catch (error) {
      toast({
        title: "Access Denied",
        description: "Invalid credentials or system error",
        variant: "destructive",
      })
      setLoginStep("credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedStakeholderData = STAKEHOLDERS.find((s) => s.id === selectedStakeholder)

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-white to-blue-50/30 px-4 py-6 relative overflow-hidden"
    >
      {/* Government Banner */}
      <GovernmentBanner />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-emerald-500/3 rounded-full blur-3xl" />
        
        {/* Very subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1e40af 1px, transparent 1px),
              linear-gradient(to bottom, #1e40af 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Login Card */}
      <motion.div
        ref={cardRef}
        className="w-full max-w-lg"
        layout
      >
        <Card className="border-0 shadow-xl shadow-blue-500/10 bg-white/95 backdrop-blur-lg rounded-xl overflow-hidden">
          {/* Card Header */}
          <CardHeader className="text-center pt-7 pb-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/50" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/20">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    ArthYantra Portal
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Government Financial System
                  </CardDescription>
                </div>
              </div>
              
              <SecurityIndicator />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Stakeholder Selection */}
              {loginStep === "select" && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  <div className="text-center mb-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Select Portal Access</h3>
                    <p className="text-gray-600 text-sm">Choose your role to continue</p>
                  </div>
                  
                  <div className="space-y-3">
                    {STAKEHOLDERS.map((stakeholder) => (
                      <StakeholderCard
                        key={stakeholder.id}
                        stakeholder={stakeholder}
                        isSelected={selectedStakeholder === stakeholder.id}
                        onSelect={() => handleStakeholderSelect(stakeholder.id)}
                      />
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={() => setLoginStep("credentials")}
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Credentials */}
              {loginStep === "credentials" && (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBack}
                      className="rounded-full h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Login Credentials</h3>
                      <p className="text-sm text-gray-600">
                        Access as {selectedStakeholderData?.name}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <UserCircle className="w-4 h-4 text-blue-600" />
                        {selectedStakeholderData?.role === 'employee' ? 'Government ID / Email' : 'Advisor ID / Email'}
                      </Label>
                      <Input
                        id="username"
                        placeholder={selectedStakeholderData?.role === 'employee' 
                          ? "Enter government email or ID"
                          : "Enter advisor credentials"
                        }
                        className="h-11 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-blue-600" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your secure password"
                          className="h-11 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 pr-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
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
                  </div>

                  {selectedStakeholder === 1 && (
                    <DepartmentSelector />
                  )}

                  <div className="space-y-3">
                    <Button
                      onClick={handleLogin}
                      disabled={isLoading || !username.trim()}
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Authenticating...
                        </>
                      ) : (
                        "Login to Portal"
                      )}
                    </Button>

                    <div className="text-center">
                      <Button
                        variant="link"
                        className="text-xs text-gray-500"
                        onClick={() => {
                          toast({
                            title: "Help Requested",
                            description: "IT support has been notified",
                          })
                        }}
                      >
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Need Help Accessing Portal?
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Verification */}
              {loginStep === "verification" && (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5 text-center py-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center mb-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ShieldCheck className="w-8 h-8 text-green-600" />
                      </motion.div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">Verifying Identity</h3>
                    <p className="text-gray-600 text-sm">
                      Authenticating with government servers...
                    </p>
                  </div>

                  <Progress value={66} className="h-1.5" />
                  
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                    <div className="text-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mx-auto mb-1" />
                      <span>Identity</span>
                    </div>
                    <div className="text-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mb-1" />
                      <span>Credentials</span>
                    </div>
                    <div className="text-center">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-auto mb-1 animate-pulse" />
                      <span>Authorization</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  )
}