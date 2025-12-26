"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  User, Lock, Mail, Phone, MapPin, Briefcase, 
  Building, FileText, ArrowRight, ArrowLeft, 
  CheckCircle, Calendar, IndianRupee, ShieldCheck, 
  FileSignature, Fingerprint, Smartphone, FileLock2, Eye,
  EyeOff, AlertCircle, Info, Loader2, Shield, Database,
  Globe, Cpu, LockKeyhole, FileCheck, Clock, Server,
  BarChart3, TrendingUp, BadgeCheck, CreditCard,
  Home, Percent, Award, Upload, Download, Printer,
  Search, Filter, Settings, HelpCircle, LogOut,
  Bell, Menu, X, CheckSquare, Circle, Triangle,
  ChevronRight, ChevronDown, ExternalLink, Link,
  Copy, QrCode, Battery, Wifi, Shield as SecurityShield,
  AlertTriangle, Info as InfoIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GovernmentEmployeeRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const nationalEmblemRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  // Form state
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      pan: '',
      aadhaar: '',
      address: '',
      dob: '',
      gender: '',
      category: ''
    },
    employment: {
      department: '',
      designation: '',
      employeeId: '',
      dateOfJoining: '',
      officeAddress: '',
      reportingOfficer: '',
      salaryStructure: {
        basic: '',
        hra: '',
        da: '',
        otherAllowances: '',
        netSalary: '',
      }
    }
  })

  const totalSteps = 3
  const departments = [
    "Ministry of Finance", "Ministry of Home Affairs", "Ministry of Defence",
    "Ministry of Education", "Ministry of Health & Family Welfare", 
    "Ministry of Agriculture & Farmers Welfare", "Ministry of Railways",
    "Ministry of Road Transport & Highways", "Ministry of Civil Aviation",
    "Ministry of Electronics & IT", "Ministry of Petroleum & Natural Gas",
    "Ministry of Power", "Ministry of Commerce & Industry",
    "Ministry of External Affairs", "Ministry of Law & Justice",
    "Ministry of Rural Development", "Ministry of Urban Development",
    "Ministry of Women & Child Development", "Ministry of Labour & Employment",
    "Ministry of Environment, Forest & Climate Change"
  ]

  // Government color scheme
  const govtColors = {
    saffron: '#FF671F',
    white: '#FFFFFF',
    green: '#046A38',
    navy: '#06038D',
    lightBlue: '#E2E8F0',
    darkBlue: '#1E3A8A'
  }

  // GSAP Animations for Government Portal
  useEffect(() => {
    if (typeof window === 'undefined') return

    // National Emblem animation
    if (nationalEmblemRef.current) {
      gsap.from(nationalEmblemRef.current, {
        duration: 1.5,
        scale: 0,
        rotation: 360,
        ease: "back.out(1.7)"
      })
    }

    // Government header animation
    gsap.from(headerRef.current, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out"
    })

    // Progress animation
    gsap.to('.progress-fill', {
      width: `${progress}%`,
      duration: 0.8,
      ease: "power2.out"
    })

    // Security indicator pulse
    gsap.to('.security-pulse', {
      scale: 1.2,
      opacity: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // National flag colors animation
    gsap.from('.flag-color', {
      width: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out"
    })

    return () => {
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [progress])

  const handleNext = () => {
    if (step < totalSteps && !isAnimating) {
      setIsAnimating(true)
      
      gsap.to(`.step-${step}`, {
        x: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setStep(step + 1)
          setProgress(((step) / totalSteps) * 100)
          
          // Government stamp animation
          createStampAnimation()
        }
      })
    }
  }

  const handleBack = () => {
    if (step > 1 && !isAnimating) {
      setIsAnimating(true)
      
      gsap.to(`.step-${step}`, {
        x: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setStep(step - 1)
          setProgress(((step - 2) / totalSteps) * 100)
        }
      })
    }
  }

  const createStampAnimation = () => {
    const stamp = document.createElement('div')
    stamp.className = 'absolute z-50 flex items-center justify-center'
    stamp.innerHTML = `
      <div class="relative">
        <div class="w-20 h-20 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <div class="text-white text-xs font-bold text-center">गणतंत्र<br/>भारत</div>
        </div>
        <div class="absolute inset-0 animate-ping bg-red-600 rounded-full opacity-30"></div>
      </div>
    `
    
    stamp.style.left = '50%'
    stamp.style.top = '50%'
    stamp.style.transform = 'translate(-50%, -50%)'
    
    document.querySelector('.form-container')?.appendChild(stamp)
    
    gsap.to(stamp, {
      scale: 1.5,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => stamp.remove()
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // Government submission animation
    const timeline = gsap.timeline()
    
    timeline
      .to('.submit-button', {
        backgroundColor: govtColors.green,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to('.form-container', {
        borderColor: govtColors.green,
        duration: 0.5,
        ease: "power2.out"
      })

    try {
      const response = await fetch('/api/government/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Government-Portal': 'official'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Success with government seal
        toast.success('Application Submitted Successfully', {
          description: 'Reference Number: GOV/EMP/' + Date.now(),
          duration: 5000,
          icon: <ShieldCheck className="h-5 w-5" />
        })
        
        setTimeout(() => {
          router.push('/government/dashboard')
        }, 2000)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'Please contact your department administrator',
        duration: 5000,
        icon: <AlertCircle className="h-5 w-5" />
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 government-portal">
      {/* National Flag Header */}
      <div className="h-2 flex">
        <div className="flag-color flex-1 bg-[#FF671F]" />
        <div className="flag-color flex-1 bg-white" />
        <div className="flag-color flex-1 bg-[#046A38]" />
      </div>

      {/* Official Government Header */}
      <header ref={headerRef} className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Left: Government Identity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center gap-3">
                {/* National Emblem */}
                <div ref={nationalEmblemRef} className="relative">
                  <div className="w-12 h-12 bg-[#06038D] rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-xl font-bold text-[#06038D]">
                      भारत सरकार
                    </h1>
                    <span className="text-xs text-gray-500">|</span>
                    <span className="text-sm font-medium text-gray-700">GOVERNMENT OF INDIA</span>
                  </div>
                  <p className="text-sm text-gray-600">Employee Registration Portal</p>
                </div>
              </div>
            </div>

            {/* Center: Security Status */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="security-pulse w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">Secure Session</span>
                <ShieldCheck className="h-4 w-4 text-green-600" />
              </div>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 text-gray-600 hover:text-[#06038D]"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm">Help Desk</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-[#06038D] text-[#06038D] hover:bg-[#06038D] hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>

          {/* Portal Navigation */}
<div>
  <div></div>
            
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Bell className="h-4 w-4" />
                <span>Last Updated: {new Date().toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Portal Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="#" className="hover:text-[#06038D]">Home</a>
            <ChevronRight className="h-3 w-3" />
            <a href="#" className="hover:text-[#06038D]">Employee Services</a>
            <ChevronRight className="h-3 w-3" />
            <a href="#" className="hover:text-[#06038D]">Registration</a>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-[#06038D]">New Employee Registration</span>
          </nav>
        </div>

        {/* Portal Title with Official Stamp */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#06038D] mb-2">
                Employee Self Registration Portal
              </h2>
              <p className="text-gray-600">
                Ministry of Personnel, Public Grievances and Pensions
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                <Shield className="h-3 w-3 mr-2" />
                Official Government Portal
              </Badge>
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                <Database className="h-3 w-3 mr-2" />
                Data Protected
              </Badge>
            </div>
          </div>
        </div>

        {/* Government Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#06038D] rounded-lg flex items-center justify-center">
                  <InfoIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#06038D]">Important Notice</h4>
                  <p className="text-sm text-gray-600">Read before proceeding</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Use official government email only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Information verified with Aadhaar database</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Data encrypted as per government standards</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#046A38] rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#046A38]">Processing Time</h4>
                  <p className="text-sm text-gray-600">Service Level Agreement</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Verification</span>
                    <span className="font-medium text-[#046A38]">24-48 hours</span>
                  </div>
                  <Progress value={60} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Account Activation</span>
                    <span className="font-medium text-[#046A38]">3-5 working days</span>
                  </div>
                  <Progress value={30} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#FF671F] rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#FF671F]">Support Contact</h4>
                  <p className="text-sm text-gray-600">Government Help Desk</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Toll Free: 1800-11-1969</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">support@digitalindia.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">www.digitalindia.gov.in</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Registration Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Registration Steps */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-gray-200">
              <CardHeader className="bg-[#06038D] text-white">
                <CardTitle className="text-lg">Registration Steps</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {[
                    { number: 1, label: 'Personal Details', status: step >= 1 ? 'complete' : step === 1 ? 'current' : 'pending' },
                    { number: 2, label: 'Employment Details', status: step >= 2 ? 'complete' : step === 2 ? 'current' : 'pending' },
                    { number: 3, label: 'Review & Submit', status: step >= 3 ? 'complete' : step === 3 ? 'current' : 'pending' }
                  ].map((stepItem) => (
                    <div
                      key={stepItem.number}
                      className={cn(
                        "p-4 flex items-center gap-3",
                        stepItem.status === 'current' && "bg-blue-50",
                        stepItem.status === 'complete' && "bg-green-50"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        stepItem.status === 'complete' && "bg-green-100 text-green-700",
                        stepItem.status === 'current' && "bg-[#06038D] text-white",
                        stepItem.status === 'pending' && "bg-gray-100 text-gray-500"
                      )}>
                        {stepItem.status === 'complete' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          stepItem.number
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{stepItem.label}</div>
                        <div className="text-xs text-gray-500">
                          {stepItem.status === 'complete' && 'Completed'}
                          {stepItem.status === 'current' && 'In Progress'}
                          {stepItem.status === 'pending' && 'Pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Progress Summary */}
                <div className="p-4 border-t border-gray-100">
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Registration Progress</span>
                      <span className="font-medium text-[#06038D]">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Estimated completion: {step === 3 ? 'Ready to submit' : `${3 - step} steps remaining`}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Government Guidelines */}
            <Card className="mt-6 border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Important Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <Circle className="h-2 w-2 text-gray-400 mt-1" />
                    <span>Fill all fields as per government records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-2 w-2 text-gray-400 mt-1" />
                    <span>Keep supporting documents ready</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-2 w-2 text-gray-400 mt-1" />
                    <span>Use strong password (min 12 characters)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-2 w-2 text-gray-400 mt-1" />
                    <span>Save your application reference number</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <motion.div
              ref={formRef}
              initial={false}
              className="form-container"
            >
              <Card className="border-2 border-gray-300 shadow-sm bg-white">
                {/* Form Header with Government Style */}
                <CardHeader className="bg-gradient-to-r from-[#06038D] to-[#1E3A8A] text-white border-b-4 border-[#FF671F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-3">
                        {step === 1 && <>
                          <User className="h-6 w-6" />
                          <span>Section 1: Personal Information</span>
                        </>}
                        {step === 2 && <>
                          <Briefcase className="h-6 w-6" />
                          <span>Section 2: Employment Details</span>
                        </>}
                        {step === 3 && <>
                          <FileCheck className="h-6 w-6" />
                          <span>Section 3: Review & Submission</span>
                        </>}
                      </CardTitle>
                      <CardDescription className="text-blue-200">
                        Government of India - Official Registration Form
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white text-[#06038D]">
                      Form No: GOI/EMP/FORM/2024
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8 step-1"
                      >
                        {/* Government Warning */}
                        <Alert className="bg-red-50 border-red-200">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <AlertTitle className="text-red-800">Government Notice</AlertTitle>
                          <AlertDescription className="text-red-700">
                            Providing false information is punishable under Indian Penal Code Section 177
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-8">
                          {/* Basic Information Section */}
                          <div>
                            <h3 className="text-lg font-semibold text-[#06038D] mb-4 pb-2 border-b border-gray-200">
                              Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <User className="h-4 w-4" /> Full Name (As per Aadhaar) *
                                </Label>
                                <Input
                                  value={formData.personal.fullName}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, fullName: e.target.value }
                                  }))}
                                  placeholder="Enter full name"
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Calendar className="h-4 w-4" /> Date of Birth *
                                </Label>
                                <Input
                                  type="date"
                                  value={formData.personal.dob}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, dob: e.target.value }
                                  }))}
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <User className="h-4 w-4" /> Gender *
                                </Label>
                                <Select
                                  value={formData.personal.gender}
                                  onValueChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, gender: value }
                                  }))}
                                >
                                  <SelectTrigger className="border-gray-300 focus:border-[#06038D]">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <User className="h-4 w-4" /> Category *
                                </Label>
                                <Select
                                  value={formData.personal.category}
                                  onValueChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, category: value }
                                  }))}
                                >
                                  <SelectTrigger className="border-gray-300 focus:border-[#06038D]">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="obc">OBC</SelectItem>
                                    <SelectItem value="sc">SC</SelectItem>
                                    <SelectItem value="st">ST</SelectItem>
                                    <SelectItem value="ews">EWS</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          {/* Contact Information Section */}
                          <div>
                            <h3 className="text-lg font-semibold text-[#06038D] mb-4 pb-2 border-b border-gray-200">
                              Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Mail className="h-4 w-4" /> Official Email ID *
                                </Label>
                                <Input
                                  type="email"
                                  value={formData.personal.email}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, email: e.target.value }
                                  }))}
                                  placeholder="name@gov.in"
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                                <p className="text-xs text-gray-500 mt-1">Use government provided email only</p>
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Phone className="h-4 w-4" /> Mobile Number *
                                </Label>
                                <div className="flex">
                                  <div className="flex items-center justify-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-600">
                                    +91
                                  </div>
                                  <Input
                                    type="tel"
                                    value={formData.personal.phone}
                                    onChange={(e) => setFormData(prev => ({
                                      ...prev,
                                      personal: { ...prev.personal, phone: e.target.value }
                                    }))}
                                    placeholder="9876543210"
                                    className="rounded-l-none border-gray-300 focus:border-[#06038D]"
                                  />
                                </div>
                              </div>

                              <div className="md:col-span-2">
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <MapPin className="h-4 w-4" /> Permanent Address *
                                </Label>
                                <Textarea
                                  value={formData.personal.address}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, address: e.target.value }
                                  }))}
                                  placeholder="Complete permanent address as per government records"
                                  rows={3}
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Government ID Section */}
                          <div>
                            <h3 className="text-lg font-semibold text-[#06038D] mb-4 pb-2 border-b border-gray-200">
                              Government Identification
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <FileSignature className="h-4 w-4" /> PAN Number *
                                </Label>
                                <Input
                                  value={formData.personal.pan}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, pan: e.target.value.toUpperCase() }
                                  }))}
                                  placeholder="ABCDE1234F"
                                  className="uppercase border-gray-300 focus:border-[#06038D]"
                                />
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Fingerprint className="h-4 w-4" /> Aadhaar Number *
                                </Label>
                                <Input
                                  value={formData.personal.aadhaar}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    personal: { ...prev.personal, aadhaar: e.target.value }
                                  }))}
                                  placeholder="1234 5678 9012"
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Security Section */}
                          <div>
                            <h3 className="text-lg font-semibold text-[#06038D] mb-4 pb-2 border-b border-gray-200">
                              Security Credentials
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Lock className="h-4 w-4" /> Create Password *
                                </Label>
                                <div className="relative">
                                  <Input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.personal.password}
                                    onChange={(e) => setFormData(prev => ({
                                      ...prev,
                                      personal: { ...prev.personal, password: e.target.value }
                                    }))}
                                    placeholder="Minimum 12 characters"
                                    className="border-gray-300 focus:border-[#06038D] pr-10"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  <p>• Minimum 12 characters</p>
                                  <p>• Include uppercase, lowercase, numbers, and special characters</p>
                                </div>
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Lock className="h-4 w-4" /> Confirm Password *
                                </Label>
                                <div className="relative">
                                  <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.personal.confirmPassword}
                                    onChange={(e) => setFormData(prev => ({
                                      ...prev,
                                      personal: { ...prev.personal, confirmPassword: e.target.value }
                                    }))}
                                    placeholder="Re-enter password"
                                    className="border-gray-300 focus:border-[#06038D] pr-10"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Employment Details */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8 step-2"
                      >
                        {/* Government Notice */}
                        <Alert className="bg-blue-50 border-blue-200">
                          <InfoIcon className="h-5 w-5 text-blue-600" />
                          <AlertTitle className="text-blue-800">Employment Verification</AlertTitle>
                          <AlertDescription className="text-blue-700">
                            Details will be verified with the concerned Ministry/Department
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-8">
                          {/* Department Information */}
                          <div>
                            <h3 className="text-lg font-semibold text-[#06038D] mb-4 pb-2 border-b border-gray-200">
                              Department Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Building className="h-4 w-4" /> Ministry/Department *
                                </Label>
                                <Select
                                  value={formData.employment.department}
                                  onValueChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    employment: { ...prev.employment, department: value }
                                  }))}
                                >
                                  <SelectTrigger className="border-gray-300 focus:border-[#06038D]">
                                    <SelectValue placeholder="Select Ministry/Department" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {departments.map((dept) => (
                                      <SelectItem key={dept} value={dept}>
                                        {dept}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Briefcase className="h-4 w-4" /> Designation/Post *
                                </Label>
                                <Input
                                  value={formData.employment.designation}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    employment: { ...prev.employment, designation: e.target.value }
                                  }))}
                                  placeholder="Official designation"
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <BadgeCheck className="h-4 w-4" /> Employee ID *
                                </Label>
                                <Input
                                  value={formData.employment.employeeId}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    employment: { ...prev.employment, employeeId: e.target.value }
                                  }))}
                                  placeholder="Government employee ID"
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>

                              <div>
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <Calendar className="h-4 w-4" /> Date of Joining *
                                </Label>
                                <Input
                                  type="date"
                                  value={formData.employment.dateOfJoining}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    employment: { ...prev.employment, dateOfJoining: e.target.value }
                                  }))}
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <Label className="flex items-center gap-2 mb-2 text-gray-700">
                                  <MapPin className="h-4 w-4" /> Office Address *
                                </Label>
                                <Textarea
                                  value={formData.employment.officeAddress}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    employment: { ...prev.employment, officeAddress: e.target.value }
                                  }))}
                                  placeholder="Complete office address"
                                  rows={2}
                                  className="border-gray-300 focus:border-[#06038D]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Salary Structure */}
                          <div>
                            <h3 className="text-lg font-semibold text-[#06038D] mb-4 pb-2 border-b border-gray-200">
                              Salary Structure (Monthly)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {[
                                { id: 'basic', label: 'Basic Pay', icon: IndianRupee },
                                { id: 'hra', label: 'HRA', icon: Home },
                                { id: 'da', label: 'DA', icon: Percent },
                                { id: 'otherAllowances', label: 'Other Allowances', icon: Award },
                                { id: 'netSalary', label: 'Net Salary', icon: TrendingUp }
                              ].map((field) => (
                                <div key={field.id}>
                                  <Label className="text-gray-700">{field.label} *</Label>
                                  <div className="relative">
                                    <field.icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                      type="number"
                                      value={formData.employment.salaryStructure[field.id as keyof typeof formData.employment.salaryStructure]}
                                      onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        employment: {
                                          ...prev.employment,
                                          salaryStructure: {
                                            ...prev.employment.salaryStructure,
                                            [field.id]: e.target.value
                                          }
                                        }
                                      }))}
                                      placeholder={`Enter ${field.label}`}
                                      className="pl-10 border-gray-300 focus:border-[#06038D]"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8 step-3"
                      >
                        {/* Success Preview */}
                        <div className="text-center mb-8">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#06038D] mb-3">Application Ready for Submission</h3>
                          <p className="text-gray-600">
                            Review all information before final submission to Government Database
                          </p>
                        </div>

                        {/* Application Summary */}
                        <div className="space-y-6">
                          {/* Personal Details Summary */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-[#06038D]">
                                <User className="h-5 w-5" /> Personal Information Summary
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Full Name:</span>
                                    <span className="font-medium">{formData.personal.fullName || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Date of Birth:</span>
                                    <span className="font-medium">{formData.personal.dob || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Gender:</span>
                                    <span className="font-medium">{formData.personal.gender || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="font-medium">{formData.personal.category || 'Not provided'}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">PAN:</span>
                                    <span className="font-medium">{formData.personal.pan || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Aadhaar:</span>
                                    <span className="font-medium">{formData.personal.aadhaar || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium">{formData.personal.email || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="font-medium">{formData.personal.phone || 'Not provided'}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Employment Details Summary */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-[#06038D]">
                                <Briefcase className="h-5 w-5" /> Employment Information Summary
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Department:</span>
                                    <span className="font-medium">{formData.employment.department || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Designation:</span>
                                    <span className="font-medium">{formData.employment.designation || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Employee ID:</span>
                                    <span className="font-medium">{formData.employment.employeeId || 'Not provided'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Date of Joining:</span>
                                    <span className="font-medium">{formData.employment.dateOfJoining || 'Not provided'}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Basic Pay:</span>
                                    <span className="font-medium">₹{formData.employment.salaryStructure.basic || '0'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">HRA:</span>
                                    <span className="font-medium">₹{formData.employment.salaryStructure.hra || '0'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">DA:</span>
                                    <span className="font-medium">{formData.employment.salaryStructure.da || '0'}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Net Salary:</span>
                                    <span className="font-medium">₹{formData.employment.salaryStructure.netSalary || '0'}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Declaration */}
                          <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    id="declaration"
                                    className="h-5 w-5 rounded border-gray-300 text-[#06038D] focus:ring-[#06038D]"
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="declaration" className="text-gray-700">
                                    <strong>Declaration:</strong> I hereby declare that the information furnished above is true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, my application is liable to be rejected/cancelled and appropriate disciplinary action may be taken against me as per Government rules and regulations.
                                  </Label>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Government Submission Notice */}
                          <Alert className="bg-green-50 border-green-200">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <AlertTitle className="text-green-800">Government Submission Protocol</AlertTitle>
                            <AlertDescription className="text-green-700">
                              • Your application will be encrypted and stored on secure government servers<br/>
                              • You will receive an acknowledgment with reference number<br/>
                              • Processing time: 3-5 working days<br/>
                              • Status can be tracked using your application reference number
                            </AlertDescription>
                          </Alert>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={step === 1 || isAnimating}
                      className={cn(
                        "border-gray-300 text-gray-700 hover:bg-gray-50",
                        step === 1 && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>

                    {step < totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={isAnimating}
                        className="bg-[#06038D] hover:bg-[#1E3A8A] text-white px-8"
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || isAnimating}
                        className="submit-button bg-[#046A38] hover:bg-[#03582D] text-white px-8"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FileCheck className="h-4 w-4 mr-2" /> Submit to Government Database
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Government Footer Note */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>This is an official Government of India portal. All transactions are monitored and logged.</p>
              <p className="mt-1">© {new Date().getFullYear()} National Informatics Centre, Government of India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Government Footer */}
      <footer className="mt-12 bg-[#06038D] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Government of India</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">President of India</a></li>
                <li><a href="#" className="hover:text-white">Prime Minister of India</a></li>
                <li><a href="#" className="hover:text-white">Cabinet Ministers</a></li>
                <li><a href="#" className="hover:text-white">Parliament of India</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Digital India</a></li>
                <li><a href="#" className="hover:text-white">MyGov.in</a></li>
                <li><a href="#" className="hover:text-white">e-Governance</a></li>
                <li><a href="#" className="hover:text-white">Grievance Redressal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Departments</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Ministry List</a></li>
                <li><a href="#" className="hover:text-white">State Governments</a></li>
                <li><a href="#" className="hover:text-white">Autonomous Bodies</a></li>
                <li><a href="#" className="hover:text-white">PSUs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact & Help</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Help Desk: 1800-11-1969</li>
                <li>Email: support@digitalindia.gov.in</li>
                <li>Website: www.india.gov.in</li>
                <li>Emergency: 24x7 Support</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Government of India. All Rights Reserved.</p>
            <p className="mt-2">This site is designed, developed and hosted by National Informatics Centre</p>
          </div>
        </div>
      </footer>

      {/* Custom Government Styles */}
      <style jsx global>{`
        .government-portal {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .progress-fill {
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .security-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* Government seal animation */
        @keyframes seal-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* National flag animation */
        .flag-color {
          animation: flag-expand 1s ease-out forwards;
        }
        
        @keyframes flag-expand {
          from { width: 0; }
          to { width: 100%; }
        }
        
        /* Government form styling */
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 3px rgba(6, 3, 141, 0.1);
        }
        
        /* Government badge styling */
        .government-badge {
          background: linear-gradient(135deg, #06038D 0%, #1E3A8A 100%);
          color: white;
          border: none;
        }
      `}</style>
    </div>
  )
}