"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  BookOpen, UserCircle, Shield, Loader2, Sparkles, CheckCircle2,
  LockKeyhole, Fingerprint, Building2, IndianRupee, ShieldCheck,
  Users, Globe, Server, Database, Cpu, Award, TrendingUp,
  FileText, Calendar, MapPin, Phone, Mail, ArrowRight,
  BadgeCheck, FileSignature, Scale, GraduationCap, Heart,
  Truck, Train, Plane, Wifi, Banknote, Home
} from "lucide-react"
import { setUserData } from "@/lib/cookies"
import { useToast } from "@/hooks/use-toast"
import { loginUser } from "@/app/actions/auth"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

interface LoginPageProps {
  onBack: () => void
  onLogin: (userData: { role: string; name: string; id: string; userTypeID: number }) => void
}

const stakeholders = [
  {
    id: 1,
    name: "Government Employee",
    description: "Financial Management Portal",
    icon: UserCircle,
    iconSecondary: Building2,
    color: "from-blue-700 to-blue-900",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    badgeColor: "bg-blue-100 text-blue-700",
    role: "employee",
    departments: [
      { name: "Education", icon: GraduationCap },
      { name: "Health", icon: Heart },
      { name: "Revenue", icon: Scale },
      { name: "Police", icon: Shield }
    ]
  },
  {
    id: 2,
    name: "Financial Advisor",
    description: "Administrative Portal",
    icon: ShieldCheck,
    iconSecondary: TrendingUp,
    color: "from-emerald-700 to-emerald-900",
    bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    badgeColor: "bg-emerald-100 text-emerald-700",
    role: "advisor",
    certifications: ["RBI Certified", "SEBI Registered", "Ministry Approved"]
  },
]

export function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [selectedStakeholder, setSelectedStakeholder] = useState<number>(1)
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showGovDepartments, setShowGovDepartments] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create animated background pattern
    const createBackgroundPattern = () => {
      if (!containerRef.current) return
      
      // Government seal animation
      const seal = document.createElement('div')
      seal.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5'
      seal.innerHTML = `
        <div class="absolute inset-0 rounded-full border-4 border-blue-800"></div>
        <div class="absolute inset-12 rounded-full border-2 border-blue-800"></div>
      `
      containerRef.current.appendChild(seal)
      
      // Animate seal rotation
      gsap.to(seal, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
      })
      
      // Create floating elements
      const symbols = [UserCircle, Building2, ShieldCheck, IndianRupee]
      symbols.forEach((Symbol, index) => {
        const element = document.createElement('div')
        element.className = 'absolute text-blue-300/20'
        element.innerHTML = `<svg class="w-12 h-12"><use xlink:href="#${Symbol}" /></svg>`
        element.style.left = `${Math.random() * 100}%`
        element.style.top = `${Math.random() * 100}%`
        
        containerRef.current?.appendChild(element)
        
        gsap.to(element, {
          y: (Math.random() - 0.5) * 100,
          x: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 2
        })
      })
    }

    // Create particles effect
    const createParticles = () => {
      if (!particlesRef.current) return
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute rounded-full bg-blue-400/20'
        particle.style.width = `${Math.random() * 4 + 2}px`
        particle.style.height = particle.style.width
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        
        particlesRef.current.appendChild(particle)
        
        gsap.to(particle, {
          y: -100,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          delay: Math.random() * 5,
          ease: "power1.out"
        })
      }
    }

    // Card entrance animation
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      })
    }

    createBackgroundPattern()
    createParticles()

    return () => {
      gsap.killTweensOf('.absolute')
    }
  }, [])

  const handleStakeholderSelect = (id: number) => {
    setSelectedStakeholder(id)
    
    // Animate selection
    const buttons = document.querySelectorAll('.stakeholder-button')
    buttons.forEach((btn, index) => {
      if (index + 1 === id) {
        gsap.to(btn, {
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        gsap.to(btn, {
          scale: 1,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out"
        })
      }
    })
  }

  const handleLogin = async () => {
    if (!selectedStakeholder) return

    setIsLoading(true)
    
    // Login animation
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.2,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut"
      })
    }

    try {
      // Create success particles
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div')
        particle.className = `absolute w-2 h-2 rounded-full ${
          selectedStakeholder === 1 ? 'bg-blue-500' : 'bg-emerald-500'
        }`
        particle.style.left = '50%'
        particle.style.top = '50%'
        
        cardRef.current?.appendChild(particle)
        
        gsap.to(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => particle.remove()
        })
      }

      const userData = {
        UserTypeID: selectedStakeholder,
        role: selectedStakeholder === 1 ? "employee" : "advisor",
        name: username || stakeholders.find(s => s.id === selectedStakeholder)?.name || "User",
        id: `GOV${Date.now().toString().slice(-6)}`,
        UserName: username || stakeholders.find(s => s.id === selectedStakeholder)?.name || "User",
      }

      setUserData(userData)
      onLogin(userData)

      toast({
        title: "Access Granted",
        description: `Welcome to the ${selectedStakeholder === 1 ? "Government Employee Portal" : "Financial Advisor Dashboard"}`,
        variant: "default",
      })

      // Enhanced route transition
      setTimeout(() => {
        if (selectedStakeholder === 1) {
          router.push("/client/dashboard")
        } else if (selectedStakeholder === 2) {
          router.push("/admin/dashboard")
        }
      }, 800)

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Authentication failed. Please try again."
      toast({
        title: "Access Denied",
        description: errorMsg,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedStakeholderData = stakeholders.find((s) => s.id === selectedStakeholder)

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50/30 to-white px-4 py-12 relative overflow-hidden"
    >
      {/* Government Top Banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-saffron-500 via-white to-green-500 py-1 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-saffron-600"></div>
              <div className="w-2 h-2 rounded-full bg-white border border-saffron-600"></div>
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
            </div>
            <span className="text-xs font-bold text-gray-900">भारत सरकार | GOVERNMENT OF INDIA</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <div className="w-2 h-2 rounded-full bg-white border border-green-600"></div>
              <div className="w-2 h-2 rounded-full bg-saffron-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Government seal pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1e40af 1px, transparent 1px),
              linear-gradient(to bottom, #1e40af 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating particles */}
        <div ref={particlesRef} className="absolute inset-0" />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Security grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-transparent" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
        <Card className="border-0 shadow-2xl shadow-indigo-500/10 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          {/* Header with gradient hhdhh */}
          <CardHeader className="text-center pt-10 pb-8 space-y-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50" />
            <div className="relative z-10">
              <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 mb-4 animate-glow">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                ArthYantra Financial Portal
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium text-lg">
                Financial Management System
              </CardDescription>
              
              {/* Security status */}
              <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border border-blue-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-800">Secure Government Portal</span>
                <LockKeyhole className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-10 space-y-8">
            {/* Portal Selection */}
            <div className="space-y-5">
              <div className="text-center mb-2">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Select Portal Access</h3>
                <p className="text-sm text-gray-600">Choose your role to continue</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {stakeholders.map((stakeholder) => {
                  const Icon = stakeholder.icon
                  const IconSecondary = stakeholder.iconSecondary
                  const isSelected = selectedStakeholder === stakeholder.id
                  
                  return (
                    <button
                      key={stakeholder.id}
                      onClick={() => handleStakeholderSelect(stakeholder.id)}
                      className={`stakeholder-button relative p-6 rounded-xl transition-all duration-300 ${stakeholder.bgColor} border-2 ${
                        isSelected 
                          ? `border-blue-500 shadow-lg shadow-blue-500/20` 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className="flex items-start gap-4">
                        {/* Primary icon */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br ${stakeholder.color} flex items-center justify-center shadow-md`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-lg font-bold ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                              {stakeholder.name}
                            </h4>
                            <div className={`text-xs px-2 py-1 rounded-full ${stakeholder.badgeColor}`}>
                              {stakeholder.role === 'employee' ? 'Govt' : 'Admin'}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">
                            {stakeholder.description}
                          </p>
                          
                          {/* Additional info */}
                          <div className="flex items-center gap-2">
                            <IconSecondary className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500 font-medium">
                              {stakeholder.role === 'employee' ? '28+ Departments' : 'Certified Advisor'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Department badges for government employees */}
                      {stakeholder.role === 'employee' && isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-gray-200/50"
                        >
                          <div className="flex flex-wrap gap-2">
                            {stakeholder.departments?.slice(0, 3).map((dept, idx) => (
                              <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-white/50 rounded-md text-xs text-gray-700">
                                <dept.icon className="w-3 h-3" />
                                {dept.name}
                              </div>
                            ))}
                            {stakeholder.departments && stakeholder.departments.length > 3 && (
                              <div className="px-2 py-1 bg-white/50 rounded-md text-xs text-gray-700">
                                +{stakeholder.departments.length - 3} more
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Certifications for advisors */}
                      {stakeholder.role === 'advisor' && isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-gray-200/50"
                        >
                          <div className="flex flex-wrap gap-2">
                            {stakeholder.certifications?.map((cert, idx) => (
                              <div key={idx} className="px-2 py-1 bg-emerald-50 rounded-md text-xs text-emerald-700 font-medium">
                                {cert}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* User Information */}
            <AnimatePresence>
              {selectedStakeholder && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Enter Your Information
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedStakeholder === 1 
                        ? 'For government employee verification'
                        : 'For advisor portal access'
                      }
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <Label htmlFor="username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <UserCircle className="w-4 h-4 text-blue-600" />
                        Display Name
                      </Label>
                      <Input
                        id="username"
                        placeholder={selectedStakeholder === 1 ? "Enter your name as per records" : "Enter advisor name"}
                        className="h-12 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="userid" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-blue-600" />
                        Employee/Advisor ID
                      </Label>
                      <Input
                        id="userid"
                        placeholder={selectedStakeholder === 1 ? "Optional: Govt ID" : "Optional: Advisor ID"}
                        className="h-12 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                  
                  {selectedStakeholder === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowGovDepartments(!showGovDepartments)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        {showGovDepartments ? 'Hide' : 'View'} Government Departments
                      </Button>
                      
                      {showGovDepartments && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200"
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { name: 'Education', icon: GraduationCap },
                              { name: 'Health', icon: Heart },
                              { name: 'Revenue', icon: Scale },
                              { name: 'Police', icon: Shield },
                              { name: 'Transport', icon: Truck },
                              { name: 'Railways', icon: Train },
                              { name: 'Aviation', icon: Plane },
                              { name: 'Telecom', icon: Wifi }
                            ].map((dept, idx) => (
                              <div key={idx} className="flex flex-col items-center p-2 bg-white rounded-md">
                                <dept.icon className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="text-xs font-medium text-gray-700">{dept.name}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Button */}
            <div className="space-y-4">
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className={`w-full h-14 bg-gradient-to-r ${
                  selectedStakeholderData?.color || "from-blue-700 to-blue-900"
                } hover:opacity-90 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Access Portal</div>
                        <div className="text-xs opacity-90">
                          Continue as {selectedStakeholderData?.name}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Button>
              
              {/* Security notice */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  <span>Secure government authentication</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Government Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-800 py-2 z-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-blue-200 text-center">
            <div className="flex items-center gap-3">
              <Server className="w-3 h-3" />
              <span>Data Center: India</span>
            </div>
            <span>Ministry of Finance | Government of India</span>
            <div className="flex items-center gap-3">
              <Database className="w-3 h-3" />
              <span>© {new Date().getFullYear()} All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        /* Enhanced background pattern */
        .government-bg {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.05) 1px, transparent 0);
          background-size: 40px 40px, 80px 80px;
        }
      `}</style>
    </div>
  )
}