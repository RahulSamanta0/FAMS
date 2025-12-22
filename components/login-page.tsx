"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, UserCircle, Shield, Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import { setUserData } from "@/lib/cookies"
import { useToast } from "@/hooks/use-toast"
import { loginUser } from "@/app/actions/auth"

interface LoginPageProps {
  onBack: () => void
  onLogin: (userData: { role: string; name: string; id: string; userTypeID: number }) => void
}

const stakeholders = [
  {
    id: 1,
    name: "Client",
    description: "Government Employee",
    icon: UserCircle,
    color: "from-blue-600 to-indigo-600",
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-purple-500/10",
  },
  {
    id: 2,
    name: "Admin",
    description: "Financial Advisor",
    icon: Shield,
    color: "from-purple-600 to-pink-600",
    bgGradient: "from-purple-500/10 via-pink-500/5 to-rose-500/10",
  },
]

export function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [selectedStakeholder, setSelectedStakeholder] = useState<number>(1)
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async () => {
    if (!selectedStakeholder) return

    setIsLoading(true)
    try {
      // Direct login without authentication
      const userData = {
        UserTypeID: selectedStakeholder,
        role: selectedStakeholder === 1 ? "client" : "admin",
        name: username || (selectedStakeholder === 1 ? "Client User" : "Admin User"),
        id: `USER${Date.now()}`,
        UserName: username || (selectedStakeholder === 1 ? "Client User" : "Admin User"),
      }

      setUserData(userData)
      onLogin(userData)

      toast({
        title: "Welcome! 🎉",
        description: `Successfully logged in as ${userData.name}`,
        variant: "default",
      })

      // Route based on selected stakeholder
      if (selectedStakeholder === 1) {
        router.push("/client/dashboard")
      } else if (selectedStakeholder === 2) {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
      toast({
        title: "Login Failed",
        description: errorMsg,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedStakeholderData = stakeholders.find((s) => s.id === selectedStakeholder)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
        <Card className="border-0 shadow-2xl shadow-indigo-500/10 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          {/* Header with gradient */}
          <CardHeader className="text-center pt-10 pb-8 space-y-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50" />
            <div className="relative z-10">
              <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 mb-4 animate-glow">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Financial Management System
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-10 space-y-8">
            {/* User Type Selection - Modern Cards */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Select Your Role
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {stakeholders.map((stakeholder) => {
                  const Icon = stakeholder.icon
                  const isSelected = selectedStakeholder === stakeholder.id
                  return (
                    <button
                      key={stakeholder.id}
                      onClick={() => setSelectedStakeholder(stakeholder.id)}
                      className={`group relative p-5 rounded-2xl transition-all duration-300 transform ${
                        isSelected
                          ? "scale-105 shadow-lg shadow-indigo-500/20"
                          : "hover:scale-102 hover:shadow-md"
                      }`}
                    >
                      {/* Background with gradient */}
                      <div
                        className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-br ${stakeholder.bgGradient} border-2 border-indigo-300`
                            : "bg-white border-2 border-gray-200 group-hover:border-indigo-200"
                        }`}
                      />
                      
                      <div className="relative flex flex-col items-center space-y-3">
                        {/* Icon with enhanced styling */}
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stakeholder.color} flex items-center justify-center shadow-md transition-all duration-300 ${
                            isSelected ? "scale-110 shadow-lg" : "group-hover:scale-105"
                          }`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        
                        <div className="text-center space-y-1">
                          <h3 className={`text-base font-bold transition-colors ${
                            isSelected ? "text-indigo-900" : "text-gray-800"
                          }`}>
                            {stakeholder.name}
                          </h3>
                          <p className="text-xs text-gray-600 font-medium">
                            {stakeholder.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Username Input - Modern Design */}
            <div className="space-y-3">
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Display Name
                <span className="text-xs text-gray-400 font-normal ml-auto">(Optional)</span>
              </Label>
              <div className="relative group">
                <Input
                  id="username"
                  placeholder="Enter your name..."
                  className="h-12 bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl transition-all duration-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 group-hover:border-gray-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            {/* Login Button - Enhanced */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full h-13 bg-gradient-to-r ${
                selectedStakeholderData?.color || "from-blue-600 to-indigo-600"
              } hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl text-base group relative overflow-hidden`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entering...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Continue as {selectedStakeholderData?.name}
                </>
              )}
            </Button>

            {/* Footer text */}
            <p className="text-center text-xs text-gray-500 pt-2">
              Secure access to your financial dashboard
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.15); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.5); }
        }
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  )
}
