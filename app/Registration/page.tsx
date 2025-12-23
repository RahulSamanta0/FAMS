"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { 
  User, Lock, Mail, Phone, MapPin, Briefcase, 
  Users as FamilyIcon, Home, Car, Landmark, 
  Shield, TrendingUp, Building, FileText, 
  ArrowRight, ArrowLeft, CheckCircle, Plus,
  Upload, Calendar, DollarSign, Percent,
  IndianRupee, UserCheck, ChevronRight,
  Sparkles, Zap, Target, Loader2,
  ShieldCheck, FileCheck, Banknote, Scale,
  Award, Globe, Database, Server, Clock,
  Building2 as GovernmentBuilding,
  BadgeCheck, FileSignature, Fingerprint,
  Smartphone, CreditCard, PieChart,
  BarChart3, Target as TargetIcon,
  GraduationCap, Heart, Truck, Train,
  Plane, Wifi, IndianRupee as RupeeIcon,
  FileLock2, Database as DatabaseIcon,
  Cpu, Shield as SecurityShield,
  LockKeyhole, FileKey, Eye,
  EyeOff, AlertCircle, Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

type FamilyMember = {
  id: number
  name: string
  relationship: string
  profession: string
  businessInterest?: string
}

type Property = {
  id: number
  type: string
  address: string
  acquisitionDate: string
  value: string
  ownership: string
}

type Investment = {
  id: number
  type: string
  name: string
  amount: string
  date: string
}

type Insurance = {
  id: number
  type: string
  provider: string
  premium: string
  sumAssured: string
  dueDate: string
}

export default function GovernmentProfessionalRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const stepCardsRef = useRef<HTMLDivElement[]>([])
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
    },
    employment: {
      department: '',
      designation: '',
      employeeId: '',
      dateOfJoining: '',
      salaryStructure: {
        basic: '',
        hra: '',
        da: '',
        otherAllowances: '',
        netSalary: '',
      }
    },
    family: {
      spouseName: '',
      spouseProfession: '',
      children: [] as FamilyMember[],
      otherDependents: [] as FamilyMember[],
    },
    assets: {
      immovableProperties: [] as Property[],
      movableProperties: [] as Property[],
      bankAccounts: [] as Array<{ id: number, bankName: string, ifsc: string, accountNumber: string, confirmAccountNumber: string, accountHolderName: string, accountType: string, accountOpeningDate: string }>,
      primaryBankAccount: {
        bankName: '',
        ifsc: '',
        accountNumber: '',
        confirmAccountNumber: '',
        accountHolderName: '',
        accountType: '',
        accountOpeningDate: ''
      },
      investments: [] as Investment[],
      insuranceDetails: [] as Insurance[],
      insurancePolicies: [] as Insurance[],
      dematAccounts: [] as Array<{ provider: string, accountNumber: string }>,
    }
  })

  const totalSteps = 7

  // Government department options
  const governmentDepartments = [
    "Education Department",
    "Health Department",
    "Revenue Department",
    "Police Department",
    "Transport Department",
    "Finance Department",
    "Defense Department",
    "Rural Development",
    "Urban Development",
    "Railways",
    "Aviation",
    "Telecom",
    "Agriculture",
    "Forest Department",
    "Water Resources",
    "Energy Department",
    "Law Department",
    "Tourism Department",
    "Industry Department",
    "Labor Department"
  ]

  // GSAP Animations Setup
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create timeline for coordinated animations
    timelineRef.current = gsap.timeline()

    // Official government seal animation
    gsap.fromTo('.government-seal',
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 0.3
      }
    )

    // National flag animation
    gsap.fromTo('.flag-stripe',
      { width: 0 },
      {
        width: '100%',
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }
    )

    // Header animation
    gsap.from(headerRef.current, {
      duration: 1,
      y: -30,
      opacity: 0,
      ease: "power3.out"
    })

    // Create animated Ashoka Chakra
    const chakra = document.querySelector('.ashoka-chakra')
    if (chakra) {
      gsap.to(chakra, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      })
    }

    // Progress bar animation
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.8,
        ease: "power2.out"
      })
    }

    // Security indicator animation
    gsap.to('.security-indicator', {
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    return () => {
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [progress])

  // Step transition animation
  useEffect(() => {
    setIsAnimating(true)
    
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: "power3.out",
          onComplete: () => setIsAnimating(false)
        }
      )
    }

    // Animate step indicators
    gsap.fromTo('.step-indicator',
      { scale: 0.8, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    )

    // Scroll to top on step change
    gsap.to(window, {
      duration: 0.3,
      scrollTo: { y: 0 },
      ease: "power2.inOut"
    })
  }, [step])

  const handleNext = () => {
    if (step < totalSteps && !isAnimating) {
      setIsAnimating(true)
      
      gsap.to(`.step-${step}`, {
        x: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setStep(step + 1)
          setProgress(((step) / totalSteps) * 100)
          
          // Celebration animation for step completion
          if (step < totalSteps) {
            // Create success particles
            for (let i = 0; i < 5; i++) {
              const particle = document.createElement('div')
              particle.className = 'absolute w-2 h-2 bg-green-500 rounded-full'
              particle.style.left = '50%'
              particle.style.top = '50%'
              
              document.querySelector('.form-container')?.appendChild(particle)
              
              gsap.to(particle, {
                x: gsap.utils.random(-50, 50),
                y: gsap.utils.random(-50, 50),
                opacity: 0,
                scale: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => particle.remove()
              })
            }
          }
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
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setStep(step - 1)
          setProgress(((step - 2) / totalSteps) * 100)
        }
      })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // Submission animation
    const submissionTimeline = gsap.timeline()
    
    submissionTimeline
      .to('.submit-button', {
        scale: 1.05,
        duration: 0.2,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut"
      })
      .to('.form-container', {
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out"
      })

    try {
      const response = await fetch('/api/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Success animation
        gsap.to('.success-animation', {
          scale: 1.5,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        })

        toast.success('Registration Submitted Successfully', {
          description: 'Your application has been received and is pending verification.',
          duration: 5000
        })
        
        setTimeout(() => {
          router.push('/registration-success')
        }, 1500)
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'Please check your connection and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  // Form field helper functions
  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now(),
      name: '',
      relationship: '',
      profession: '',
      businessInterest: ''
    }
    
    setFormData(prev => ({
      ...prev,
      family: {
        ...prev.family,
        children: [...prev.family.children, newMember]
      }
    }))
  }

  const addProperty = (type: 'immovable' | 'movable') => {
    const newProperty: Property = {
      id: Date.now(),
      type: '',
      address: '',
      acquisitionDate: '',
      value: '',
      ownership: ''
    }
    
    if (type === 'immovable') {
      setFormData(prev => ({
        ...prev,
        assets: {
          ...prev.assets,
          immovableProperties: [...prev.assets.immovableProperties, newProperty]
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        assets: {
          ...prev.assets,
          movableProperties: [...prev.assets.movableProperties, newProperty]
        }
      }))
    }
  }

  const addImmovableProperty = () => addProperty('immovable')
  const addMovableProperty = () => addProperty('movable')

  const addInvestment = () => {
    const newInvestment: Investment = {
      id: Date.now(),
      type: '',
      name: '',
      amount: '',
      date: ''
    }
    
    setFormData(prev => ({
      ...prev,
      assets: {
        ...prev.assets,
        investments: [...prev.assets.investments, newInvestment]
      }
    }))
  }

  const addInsurance = () => {
    const newInsurance: Insurance = {
      id: Date.now(),
      type: '',
      provider: '',
      premium: '',
      sumAssured: '',
      dueDate: ''
    }
    
    setFormData(prev => ({
      ...prev,
      assets: {
        ...prev.assets,
        insurancePolicies: [...prev.assets.insurancePolicies, newInsurance]
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white government-portal">
      {/* Government Header Banner */}
      <div className="bg-gradient-to-r from-saffron-500 via-white to-green-500 py-1.5">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-saffron-600"></div>
              <div className="w-3 h-3 rounded-full bg-white border border-saffron-600"></div>
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
            </div>
            <span className="text-xs font-bold text-gray-900 tracking-wide">
              भारत सरकार | GOVERNMENT OF INDIA
            </span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <div className="w-3 h-3 rounded-full bg-white border border-green-600"></div>
              <div className="w-3 h-3 rounded-full bg-saffron-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Header */}
      <header className="border-b border-blue-800 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              {/* Official Government Seal */}
              <div className="relative">
                <div className="government-seal w-16 h-16 bg-gradient-to-b from-blue-900 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <div className="ashoka-chakra w-10 h-10 border-4 border-white rounded-full flex items-center justify-center relative">
                    <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-90"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-xl md:text-2xl font-bold text-blue-900">
                    आर्थयंत्र वित्तीय प्रबंधन
                  </h1>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm">
                  <span className="text-gray-700 font-medium">Financial Management Portal</span>
                  <span className="hidden md:inline text-gray-500">|</span>
                  <span className="text-blue-700 font-semibold">Ministry of Finance</span>
                </div>
              </div>
            </div>
            
            {/* Security Status */}
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <div className="security-indicator flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Secure Connection</span>
              </div>
              <LockKeyhole className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Official Registration Header */}
        <div className="text-center mb-10" ref={headerRef}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg mb-6 border border-blue-200">
            <FileSignature className="h-5 w-5 text-blue-700" />
            <span className="text-sm font-semibold text-blue-800">
              OFFICIAL REGISTRATION PORTAL
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Government Employee <span className="text-blue-700">Registration</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Complete financial profile registration for access to government financial management services
            </p>
            
            {/* Security Assurance */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge variant="outline" className="bg-blue-50 border-blue-200">
                <ShieldCheck className="h-3 w-3 mr-2 text-blue-600" />
                Data Encrypted
              </Badge>
              <Badge variant="outline" className="bg-green-50 border-green-200">
                <DatabaseIcon className="h-3 w-3 mr-2 text-green-600" />
                Indian Servers
              </Badge>
              <Badge variant="outline" className="bg-amber-50 border-amber-200">
                <Fingerprint className="h-3 w-3 mr-2 text-amber-600" />
                Aadhaar Verified
              </Badge>
              <Badge variant="outline" className="bg-purple-50 border-purple-200">
                <FileLock2 className="h-3 w-3 mr-2 text-purple-600" />
                RBI Compliant
              </Badge>
            </div>
          </div>
        </div>

        {/* Registration Progress */}
        <div className="mb-10 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Registration Progress
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            
            {/* Progress Bar with Government Theme */}
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Step Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mt-6">
            {[
              'Personal Details',
              'Employment Info',
              'Family Details',
              'Asset Declaration',
              'Banking Details',
              'Investments',
              'Review & Submit'
            ].map((label, index) => (
              <div key={label} className="text-center">
                <div 
                  className={`step-indicator w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    index + 1 <= step 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white' 
                      : index + 1 === step 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-200' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index + 1 <= step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Container */}
        <motion.div
          ref={formRef}
          initial={false}
          className="form-container"
        >
          <Card className="border border-gray-200 shadow-lg overflow-hidden bg-white">
            {/* Form Header */}
            <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-900 text-white border-b border-blue-800">
              <CardTitle className="text-2xl flex items-center gap-3">
                {step === 1 && <><User className="h-6 w-6" /> Personal Information</>}
                {step === 2 && <><GovernmentBuilding className="h-6 w-6" /> Employment Details</>}
                {step === 3 && <><FamilyIcon className="h-6 w-6" /> Family Information</>}
                {step === 4 && <><Home className="h-6 w-6" /> Asset Declaration</>}
                {step === 5 && <><Landmark className="h-6 w-6" /> Banking Details</>}
                {step === 6 && <><TrendingUp className="h-6 w-6" /> Investments & Insurance</>}
                {step === 7 && <><FileCheck className="h-6 w-6" /> Review & Submit</>}
              </CardTitle>
              <CardDescription className="text-blue-200">
                {step === 1 && "Official government employee details (Section 1 of 7)"}
                {step === 2 && "Government service and employment information (Section 2 of 7)"}
                {step === 3 && "Family and dependent information (Section 3 of 7)"}
                {step === 4 && "Declaration of assets as per government norms (Section 4 of 7)"}
                {step === 5 && "Financial account information (Section 5 of 7)"}
                {step === 6 && "Investments and insurance policies (Section 6 of 7)"}
                {step === 7 && "Final review and submission (Section 7 of 7)"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 step-1"
                  >
                    {/* Government ID Alert */}
                    <Alert className="bg-blue-50 border-blue-200">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Important Notice</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        All information provided will be verified with government databases. Ensure accuracy as per your official documents.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <Label htmlFor="fullName" className="flex items-center gap-2 mb-2 text-gray-700">
                          <User className="h-4 w-4" /> Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="As per government records"
                          value={formData.personal.fullName}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, fullName: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      
                      {/* Official Email */}
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Mail className="h-4 w-4" /> Official Email *
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                Use your official government email address
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@department.gov.in"
                          value={formData.personal.email}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, email: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Phone className="h-4 w-4" /> Mobile Number *
                        </Label>
                        <div className="flex">
                          <div className="flex items-center justify-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-600">
                            +91
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="9876543210"
                            value={formData.personal.phone}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, phone: e.target.value }
                            }))}
                            className="rounded-l-none border-gray-300 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* PAN Number */}
                      <div>
                        <Label htmlFor="pan" className="flex items-center gap-2 mb-2 text-gray-700">
                          <FileText className="h-4 w-4" /> PAN Number *
                        </Label>
                        <Input
                          id="pan"
                          placeholder="ABCDE1234F"
                          value={formData.personal.pan}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, pan: e.target.value.toUpperCase() }
                          }))}
                          className="uppercase border-gray-300 focus:border-blue-500"
                        />
                      </div>

                      {/* Aadhaar Number */}
                      <div>
                        <Label htmlFor="aadhaar" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Fingerprint className="h-4 w-4" /> Aadhaar Number *
                        </Label>
                        <Input
                          id="aadhaar"
                          placeholder="1234 5678 9012"
                          value={formData.personal.aadhaar}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, aadhaar: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>

                      {/* Residential Address */}
                      <div className="md:col-span-2">
                        <Label htmlFor="address" className="flex items-center gap-2 mb-2 text-gray-700">
                          <MapPin className="h-4 w-4" /> Residential Address *
                        </Label>
                        <Textarea
                          id="address"
                          placeholder="As per current official address"
                          rows={3}
                          value={formData.personal.address}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, address: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <Label htmlFor="password" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Lock className="h-4 w-4" /> Create Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimum 8 characters"
                            value={formData.personal.password}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, password: e.target.value }
                            }))}
                            className="border-gray-300 focus:border-blue-500 pr-10"
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
                        <div className="mt-1 text-xs text-gray-500">
                          Must include uppercase, lowercase, number, and special character
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <Label htmlFor="confirmPassword" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Lock className="h-4 w-4" /> Confirm Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            value={formData.personal.confirmPassword}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, confirmPassword: e.target.value }
                            }))}
                            className="border-gray-300 focus:border-blue-500 pr-10"
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
                  </motion.div>
                )}

                {/* Step 2: Employment Details */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 step-2"
                  >
                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Employment Verification</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Details will be verified with your department records
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Department */}
                      <div>
                        <Label htmlFor="department" className="flex items-center gap-2 mb-2 text-gray-700">
                          <GovernmentBuilding className="h-4 w-4" /> Department *
                        </Label>
                        <Select
                          value={formData.employment.department}
                          onValueChange={(value) => setFormData(prev => ({
                            ...prev,
                            employment: { ...prev.employment, department: value }
                          }))}
                        >
                          <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            {governmentDepartments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Designation */}
                      <div>
                        <Label htmlFor="designation" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Briefcase className="h-4 w-4" /> Designation *
                        </Label>
                        <Input
                          id="designation"
                          placeholder="Official designation"
                          value={formData.employment.designation}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            employment: { ...prev.employment, designation: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>

                      {/* Employee ID */}
                      <div>
                        <Label htmlFor="employeeId" className="flex items-center gap-2 mb-2 text-gray-700">
                          <BadgeCheck className="h-4 w-4" /> Government Employee ID *
                        </Label>
                        <Input
                          id="employeeId"
                          placeholder="As per service book"
                          value={formData.employment.employeeId}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            employment: { ...prev.employment, employeeId: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>

                      {/* Date of Joining */}
                      <div>
                        <Label htmlFor="dateOfJoining" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Calendar className="h-4 w-4" /> Date of Joining *
                        </Label>
                        <Input
                          id="dateOfJoining"
                          type="date"
                          value={formData.employment.dateOfJoining}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            employment: { ...prev.employment, dateOfJoining: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Salary Structure */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                        <RupeeIcon className="h-5 w-5" /> Monthly Salary Structure
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="basic" className="text-gray-700">Basic Pay *</Label>
                          <div className="relative">
                            <RupeeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="basic"
                              type="number"
                              className="pl-10 border-gray-300 focus:border-blue-500"
                              placeholder="Basic salary"
                              value={formData.employment.salaryStructure.basic}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                employment: { 
                                  ...prev.employment, 
                                  salaryStructure: { 
                                    ...prev.employment.salaryStructure, 
                                    basic: e.target.value 
                                  }
                                }
                              }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="hra" className="text-gray-700">House Rent Allowance</Label>
                          <div className="relative">
                            <RupeeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="hra"
                              type="number"
                              className="pl-10 border-gray-300 focus:border-blue-500"
                              placeholder="HRA amount"
                              value={formData.employment.salaryStructure.hra}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                employment: { 
                                  ...prev.employment, 
                                  salaryStructure: { 
                                    ...prev.employment.salaryStructure, 
                                    hra: e.target.value 
                                  }
                                }
                              }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="da" className="text-gray-700">Dearness Allowance</Label>
                          <div className="relative">
                            <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="da"
                              type="number"
                              className="pl-10 border-gray-300 focus:border-blue-500"
                              placeholder="DA percentage"
                              value={formData.employment.salaryStructure.da}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                employment: { 
                                  ...prev.employment, 
                                  salaryStructure: { 
                                    ...prev.employment.salaryStructure, 
                                    da: e.target.value 
                                  }
                                }
                              }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="otherAllowances" className="text-gray-700">Other Allowances</Label>
                          <div className="relative">
                            <RupeeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="otherAllowances"
                              type="number"
                              className="pl-10 border-gray-300 focus:border-blue-500"
                              placeholder="Other allowances"
                              value={formData.employment.salaryStructure.otherAllowances}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                employment: { 
                                  ...prev.employment, 
                                  salaryStructure: { 
                                    ...prev.employment.salaryStructure, 
                                    otherAllowances: e.target.value 
                                  }
                                }
                              }))}
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2 lg:col-span-1">
                          <Label htmlFor="netSalary" className="text-gray-700">Net Salary *</Label>
                          <div className="relative">
                            <RupeeIcon className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                            <Input
                              id="netSalary"
                              type="number"
                              className="pl-10 border-green-300 focus:border-green-500 font-semibold"
                              placeholder="Net take-home salary"
                              value={formData.employment.salaryStructure.netSalary}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                employment: { 
                                  ...prev.employment, 
                                  salaryStructure: { 
                                    ...prev.employment.salaryStructure, 
                                    netSalary: e.target.value 
                                  }
                                }
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Family Details */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 step-3"
                  >
                    <Alert className="bg-purple-50 border-purple-200">
                      <FamilyIcon className="h-4 w-4 text-purple-600" />
                      <AlertTitle className="text-purple-800">Family Information</AlertTitle>
                      <AlertDescription className="text-purple-700">
                        Required for government records and dependent benefits
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="spouseName" className="flex items-center gap-2 mb-2 text-gray-700">
                          <User className="h-4 w-4" /> Spouse Name
                        </Label>
                        <Input
                          id="spouseName"
                          placeholder="Spouse's full name"
                          value={formData.family.spouseName}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            family: { ...prev.family, spouseName: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="spouseProfession" className="flex items-center gap-2 mb-2 text-gray-700">
                          <Briefcase className="h-4 w-4" /> Spouse Profession
                        </Label>
                        <Input
                          id="spouseProfession"
                          placeholder="Profession or business"
                          value={formData.family.spouseProfession}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            family: { ...prev.family, spouseProfession: e.target.value }
                          }))}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Children Details */}
                    <div className="mt-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                          <GraduationCap className="h-5 w-5" /> Children Details
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addFamilyMember}
                          className="border-blue-600 text-blue-700 hover:bg-blue-50"
                        >
                          <User className="h-4 w-4 mr-2" /> Add Child
                        </Button>
                      </div>

                      {formData.family.children.map((child, index) => (
                        <Card key={child.id} className="mb-4 border-gray-200">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <Label>Name</Label>
                                <Input
                                  placeholder="Child's name"
                                  value={child.name}
                                  onChange={(e) => {
                                    const newChildren = [...formData.family.children]
                                    newChildren[index] = { ...child, name: e.target.value }
                                    setFormData(prev => ({
                                      ...prev,
                                      family: { ...prev.family, children: newChildren }
                                    }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Relationship</Label>
                                <Select
                                  value={child.relationship}
                                  onValueChange={(value) => {
                                    const newChildren = [...formData.family.children]
                                    newChildren[index] = { ...child, relationship: value }
                                    setFormData(prev => ({
                                      ...prev,
                                      family: { ...prev.family, children: newChildren }
                                    }))
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="son">Son</SelectItem>
                                    <SelectItem value="daughter">Daughter</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Profession</Label>
                                <Input
                                  placeholder="Profession"
                                  value={child.profession}
                                  onChange={(e) => {
                                    const newChildren = [...formData.family.children]
                                    newChildren[index] = { ...child, profession: e.target.value }
                                    setFormData(prev => ({
                                      ...prev,
                                      family: { ...prev.family, children: newChildren }
                                    }))
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Business Interest</Label>
                                <Input
                                  placeholder="Business interests"
                                  value={child.businessInterest || ''}
                                  onChange={(e) => {
                                    const newChildren = [...formData.family.children]
                                    newChildren[index] = { ...child, businessInterest: e.target.value }
                                    setFormData(prev => ({
                                      ...prev,
                                      family: { ...prev.family, children: newChildren }
                                    }))
                                  }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* White Money Declaration */}
                    <Card className="border-green-200 bg-green-50/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                          <FileCheck className="h-5 w-5" /> White Money Declaration
                        </CardTitle>
                        <CardDescription className="text-green-700">
                          Declare income sources that can be converted to white money
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                            <div>
                              <div className="font-medium text-gray-700">Agricultural Income</div>
                              <div className="text-sm text-gray-500">Income from agricultural activities</div>
                            </div>
                            <Switch className="data-[state=checked]:bg-green-600" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                            <div>
                              <div className="font-medium text-gray-700">Professional Fees</div>
                              <div className="text-sm text-gray-500">Income from professional services</div>
                            </div>
                            <Switch className="data-[state=checked]:bg-green-600" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                            <div>
                              <div className="font-medium text-gray-700">Consultancy Income</div>
                              <div className="text-sm text-gray-500">Income from consultancy services</div>
                            </div>
                            <Switch className="data-[state=checked]:bg-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 7: Review & Submit */}
                {/* Step 4: Asset Declaration */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 step-4"
                  >
                    <Alert className="bg-blue-50 border-blue-200">
                      <FileSignature className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Asset Declaration Form</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        As per government regulations, declare all movable and immovable assets
                      </AlertDescription>
                    </Alert>

                    {/* Immovable Properties */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Home className="h-5 w-5 text-blue-600" />
                          Immovable Properties
                        </CardTitle>
                        <CardDescription>Land, buildings, apartments, etc.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {formData.assets.immovableProperties.map((property, index) => (
                          <Card key={property.id} className="bg-gray-50 border-gray-200">
                            <CardContent className="p-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Property Type</Label>
                                  <Select 
                                    defaultValue={property.type}
                                    onValueChange={(value) => {
                                      const newProperties = [...formData.assets.immovableProperties]
                                      newProperties[index] = { ...property, type: value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, immovableProperties: newProperties }
                                      }))
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="apartment">Apartment</SelectItem>
                                      <SelectItem value="house">House</SelectItem>
                                      <SelectItem value="land">Land</SelectItem>
                                      <SelectItem value="commercial">Commercial Property</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Value (₹)</Label>
                                  <Input 
                                    placeholder="Property value" 
                                    value={property.value}
                                    onChange={(e) => {
                                      const newProperties = [...formData.assets.immovableProperties]
                                      newProperties[index] = { ...property, value: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, immovableProperties: newProperties }
                                      }))
                                    }}
                                    type="number" 
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Address</Label>
                                <Textarea 
                                  placeholder="Complete property address" 
                                  value={property.address}
                                  onChange={(e) => {
                                    const newProperties = [...formData.assets.immovableProperties]
                                    newProperties[index] = { ...property, address: e.target.value }
                                    setFormData(prev => ({
                                      ...prev,
                                      assets: { ...prev.assets, immovableProperties: newProperties }
                                    }))
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Acquisition Date</Label>
                                  <Input 
                                    type="date" 
                                    value={property.acquisitionDate}
                                    onChange={(e) => {
                                      const newProperties = [...formData.assets.immovableProperties]
                                      newProperties[index] = { ...property, acquisitionDate: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, immovableProperties: newProperties }
                                      }))
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Ownership Type</Label>
                                  <Select 
                                    defaultValue={property.ownership}
                                    onValueChange={(value) => {
                                      const newProperties = [...formData.assets.immovableProperties]
                                      newProperties[index] = { ...property, ownership: value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, immovableProperties: newProperties }
                                      }))
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="individual">Individual</SelectItem>
                                      <SelectItem value="joint">Joint</SelectItem>
                                      <SelectItem value="spouse">Spouse Name</SelectItem>
                                      <SelectItem value="minor">Minor Child</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={addImmovableProperty}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Property
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Movable Properties */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Car className="h-5 w-5 text-green-600" />
                          Movable Properties
                        </CardTitle>
                        <CardDescription>Vehicles, jewelry, equipment, etc.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {formData.assets.movableProperties.map((property, index) => (
                          <Card key={property.id} className="bg-gray-50 border-gray-200">
                            <CardContent className="p-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Item Type</Label>
                                  <Select 
                                    defaultValue={property.type}
                                    onValueChange={(value) => {
                                      const newProperties = [...formData.assets.movableProperties]
                                      newProperties[index] = { ...property, type: value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, movableProperties: newProperties }
                                      }))
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="vehicle">Vehicle</SelectItem>
                                      <SelectItem value="jewelry">Jewelry</SelectItem>
                                      <SelectItem value="equipment">Equipment</SelectItem>
                                      <SelectItem value="antique">Antique</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Value (₹)</Label>
                                  <Input 
                                    placeholder="Item value" 
                                    value={property.value}
                                    onChange={(e) => {
                                      const newProperties = [...formData.assets.movableProperties]
                                      newProperties[index] = { ...property, value: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, movableProperties: newProperties }
                                      }))
                                    }}
                                    type="number" 
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Input 
                                  placeholder="Item description, make, model, etc." 
                                  value={property.address}
                                  onChange={(e) => {
                                    const newProperties = [...formData.assets.movableProperties]
                                    newProperties[index] = { ...property, address: e.target.value }
                                    setFormData(prev => ({
                                      ...prev,
                                      assets: { ...prev.assets, movableProperties: newProperties }
                                    }))
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Acquisition Date</Label>
                                  <Input 
                                    type="date" 
                                    value={property.acquisitionDate}
                                    onChange={(e) => {
                                      const newProperties = [...formData.assets.movableProperties]
                                      newProperties[index] = { ...property, acquisitionDate: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, movableProperties: newProperties }
                                      }))
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Ownership Type</Label>
                                  <Select 
                                    defaultValue={property.ownership}
                                    onValueChange={(value) => {
                                      const newProperties = [...formData.assets.movableProperties]
                                      newProperties[index] = { ...property, ownership: value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, movableProperties: newProperties }
                                      }))
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="individual">Individual</SelectItem>
                                      <SelectItem value="joint">Joint</SelectItem>
                                      <SelectItem value="spouse">Spouse Name</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={addMovableProperty}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Item
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 5: Banking Details */}
                {step === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 step-5"
                  >
                    <Alert className="bg-blue-50 border-blue-200">
                      <Landmark className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Banking Details</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        Provide complete banking information for salary and investment management
                      </AlertDescription>
                    </Alert>

                    {/* Primary Bank Account */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          Primary Salary Account
                        </CardTitle>
                        <CardDescription>Bank account for salary credit</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Bank Name *</Label>
                            <Select 
                              value={formData.assets.primaryBankAccount.bankName}
                              onValueChange={(value) => {
                                setFormData(prev => ({
                                  ...prev,
                                  assets: {
                                    ...prev.assets,
                                    primaryBankAccount: { ...prev.assets.primaryBankAccount, bankName: value }
                                  }
                                }))
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select bank" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sbi">State Bank of India (SBI)</SelectItem>
                                <SelectItem value="icici">ICICI Bank</SelectItem>
                                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                <SelectItem value="axis">Axis Bank</SelectItem>
                                <SelectItem value="pnb">Punjab National Bank</SelectItem>
                                <SelectItem value="boi">Bank of India</SelectItem>
                                <SelectItem value="other">Other Bank</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>IFSC Code *</Label>
                            <Input 
                              placeholder="e.g., SBIN0001234"
                              value={formData.assets.primaryBankAccount.ifsc}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  assets: {
                                    ...prev.assets,
                                    primaryBankAccount: { ...prev.assets.primaryBankAccount, ifsc: e.target.value }
                                  }
                                }))
                              }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Account Number *</Label>
                            <Input 
                              placeholder="12345678901234" 
                              type="text"
                              value={formData.assets.primaryBankAccount.accountNumber}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  assets: {
                                    ...prev.assets,
                                    primaryBankAccount: { ...prev.assets.primaryBankAccount, accountNumber: e.target.value }
                                  }
                                }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>Confirm Account Number *</Label>
                            <Input 
                              placeholder="12345678901234" 
                              type="text"
                              value={formData.assets.primaryBankAccount.confirmAccountNumber}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  assets: {
                                    ...prev.assets,
                                    primaryBankAccount: { ...prev.assets.primaryBankAccount, confirmAccountNumber: e.target.value }
                                  }
                                }))
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Account Holder Name *</Label>
                          <Input 
                            placeholder="Name as per bank records"
                            value={formData.assets.primaryBankAccount.accountHolderName}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                assets: {
                                  ...prev.assets,
                                  primaryBankAccount: { ...prev.assets.primaryBankAccount, accountHolderName: e.target.value }
                                }
                              }))
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Account Type *</Label>
                            <Select 
                              value={formData.assets.primaryBankAccount.accountType}
                              onValueChange={(value) => {
                                setFormData(prev => ({
                                  ...prev,
                                  assets: {
                                    ...prev.assets,
                                    primaryBankAccount: { ...prev.assets.primaryBankAccount, accountType: value }
                                  }
                                }))
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="saving">Savings Account</SelectItem>
                                <SelectItem value="current">Current Account</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Account Opening Date *</Label>
                            <Input 
                              type="date"
                              value={formData.assets.primaryBankAccount.accountOpeningDate}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  assets: {
                                    ...prev.assets,
                                    primaryBankAccount: { ...prev.assets.primaryBankAccount, accountOpeningDate: e.target.value }
                                  }
                                }))
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Additional Bank Accounts */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Banknote className="h-5 w-5 text-green-600" />
                          Other Bank Accounts
                        </CardTitle>
                        <CardDescription>Investment and savings accounts</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[1, 2].map((i) => (
                          <Card key={i} className="bg-gray-50 border-gray-200">
                            <CardContent className="p-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Bank Name</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="sbi">State Bank of India (SBI)</SelectItem>
                                      <SelectItem value="icici">ICICI Bank</SelectItem>
                                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                      <SelectItem value="axis">Axis Bank</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Account Number</Label>
                                  <Input placeholder="Account number" type="number" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Account Type</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="saving">Savings</SelectItem>
                                      <SelectItem value="current">Current</SelectItem>
                                      <SelectItem value="fixed">Fixed Deposit</SelectItem>
                                      <SelectItem value="recurring">Recurring Deposit</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Balance (₹)</Label>
                                  <Input placeholder="Current balance" type="number" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 6: Investments & Insurance */}
                {step === 6 && (
                  <motion.div
                    key="step-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 step-6"
                  >
                    <Alert className="bg-blue-50 border-blue-200">
                      <PieChart className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Investments & Insurance</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        Declare your investments and insurance policies for financial planning
                      </AlertDescription>
                    </Alert>

                    {/* Investments */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          Investments
                        </CardTitle>
                        <CardDescription>Shares, mutual funds, bonds, NPS, PPF, etc.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {formData.assets.investments.map((investment, index) => (
                          <Card key={investment.id} className="bg-gray-50 border-gray-200">
                            <CardContent className="p-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Investment Type *</Label>
                                  <Select 
                                    value={investment.type}
                                    onValueChange={(value) => {
                                      const newInvestments = [...formData.assets.investments]
                                      newInvestments[index] = { ...investment, type: value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, investments: newInvestments }
                                      }))
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="shares">Shares / Equity</SelectItem>
                                      <SelectItem value="mutual">Mutual Funds</SelectItem>
                                      <SelectItem value="bonds">Government Bonds</SelectItem>
                                      <SelectItem value="nps">NPS / Pension Fund</SelectItem>
                                      <SelectItem value="ppf">PPF</SelectItem>
                                      <SelectItem value="fd">Fixed Deposits</SelectItem>
                                      <SelectItem value="gold">Gold / Bullion</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Name / Description *</Label>
                                  <Input 
                                    placeholder="e.g., HDFC Bank Shares" 
                                    value={investment.name}
                                    onChange={(e) => {
                                      const newInvestments = [...formData.assets.investments]
                                      newInvestments[index] = { ...investment, name: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, investments: newInvestments }
                                      }))
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Amount (₹) *</Label>
                                  <Input 
                                    placeholder="Investment amount" 
                                    value={investment.amount}
                                    onChange={(e) => {
                                      const newInvestments = [...formData.assets.investments]
                                      newInvestments[index] = { ...investment, amount: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, investments: newInvestments }
                                      }))
                                    }}
                                    type="number" 
                                  />
                                </div>
                                <div>
                                  <Label>Date of Investment *</Label>
                                  <Input 
                                    type="date" 
                                    value={investment.date}
                                    onChange={(e) => {
                                      const newInvestments = [...formData.assets.investments]
                                      newInvestments[index] = { ...investment, date: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, investments: newInvestments }
                                      }))
                                    }}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={addInvestment}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Investment
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Insurance Policies */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-600" />
                          Insurance Policies
                        </CardTitle>
                        <CardDescription>Life, health, property insurance, etc.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {formData.assets.insuranceDetails && formData.assets.insuranceDetails.map((insurance, index) => (
                          <Card key={insurance.id} className="bg-gray-50 border-gray-200">
                            <CardContent className="p-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Policy Type *</Label>
                                  <Select 
                                    value={insurance.type}
                                    onValueChange={(value) => {
                                      const newInsurances = [...(formData.assets.insuranceDetails || [])]
                                      newInsurances[index] = { ...insurance, type: value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, insuranceDetails: newInsurances }
                                      }))
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="life">Life Insurance</SelectItem>
                                      <SelectItem value="health">Health Insurance</SelectItem>
                                      <SelectItem value="property">Property Insurance</SelectItem>
                                      <SelectItem value="auto">Auto Insurance</SelectItem>
                                      <SelectItem value="travel">Travel Insurance</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Provider / Company *</Label>
                                  <Input 
                                    placeholder="e.g., LIC, HDFC Life" 
                                    value={insurance.provider}
                                    onChange={(e) => {
                                      const newInsurances = [...(formData.assets.insuranceDetails || [])]
                                      newInsurances[index] = { ...insurance, provider: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, insuranceDetails: newInsurances }
                                      }))
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Premium Amount (₹) *</Label>
                                  <Input 
                                    placeholder="Annual premium" 
                                    value={insurance.premium}
                                    onChange={(e) => {
                                      const newInsurances = [...(formData.assets.insuranceDetails || [])]
                                      newInsurances[index] = { ...insurance, premium: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, insuranceDetails: newInsurances }
                                      }))
                                    }}
                                    type="number" 
                                  />
                                </div>
                                <div>
                                  <Label>Sum Assured (₹) *</Label>
                                  <Input 
                                    placeholder="Coverage amount" 
                                    value={insurance.sumAssured}
                                    onChange={(e) => {
                                      const newInsurances = [...(formData.assets.insuranceDetails || [])]
                                      newInsurances[index] = { ...insurance, sumAssured: e.target.value }
                                      setFormData(prev => ({
                                        ...prev,
                                        assets: { ...prev.assets, insuranceDetails: newInsurances }
                                      }))
                                    }}
                                    type="number" 
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Premium Due Date *</Label>
                                <Input 
                                  type="date" 
                                  value={insurance.dueDate}
                                  onChange={(e) => {
                                    const newInsurances = [...(formData.assets.insuranceDetails || [])]
                                    newInsurances[index] = { ...insurance, dueDate: e.target.value }
                                    setFormData(prev => ({
                                      ...prev,
                                      assets: { ...prev.assets, insuranceDetails: newInsurances }
                                    }))
                                  }}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            const newInsurance: Insurance = {
                              id: Date.now(),
                              type: 'life',
                              provider: '',
                              premium: '',
                              sumAssured: '',
                              dueDate: ''
                            }
                            setFormData(prev => ({
                              ...prev,
                              assets: {
                                ...prev.assets,
                                insuranceDetails: [...(prev.assets.insuranceDetails || []), newInsurance]
                              }
                            }))
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Insurance Policy
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 7: Review & Submit */}
                {step === 7 && (
                  <motion.div
                    key="step-7"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 step-7"
                  >
                    <div className="text-center mb-8 success-animation">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Review Your Application</h3>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        Please review all information before submission. Your application will be processed within 3-5 working days.
                      </p>
                    </div>

                    {/* Application Summary */}
                    <Card className="border-blue-200 bg-blue-50/30">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-800">Application Summary</CardTitle>
                        <CardDescription>Complete overview of your registration</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm font-medium text-gray-500">Personal Information</div>
                              <div className="mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Name:</span>
                                  <span className="font-medium">{formData.personal.fullName || 'Not provided'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">PAN:</span>
                                  <span className="font-medium">{formData.personal.pan || 'Not provided'}</span>
                                </div>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <div className="text-sm font-medium text-gray-500">Employment Details</div>
                              <div className="mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Department:</span>
                                  <span className="font-medium">{formData.employment.department || 'Not provided'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Designation:</span>
                                  <span className="font-medium">{formData.employment.designation || 'Not provided'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm font-medium text-gray-500">Family Details</div>
                              <div className="mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Spouse:</span>
                                  <span className="font-medium">{formData.family.spouseName || 'Not provided'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Children:</span>
                                  <span className="font-medium">{formData.family.children.length}</span>
                                </div>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <div className="text-sm font-medium text-gray-500">Financial Summary</div>
                              <div className="mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Net Salary:</span>
                                  <span className="font-medium">₹{formData.employment.salaryStructure.netSalary || '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Assets Declared:</span>
                                  <span className="font-medium">{formData.assets.immovableProperties.length + formData.assets.movableProperties.length}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Terms and Conditions */}
                    <Card className="border-gray-200 bg-gray-50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <input
                              type="checkbox"
                              id="terms"
                              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="terms" className="text-sm text-gray-700">
                              I hereby declare that all information provided is true and correct to the best of my knowledge and belief. 
                              I understand that providing false information may lead to disciplinary action as per government rules. 
                              I consent to the collection and processing of my personal data as per the Government Data Protection Policy.
                            </Label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Government Certification */}
                    <Alert className="bg-blue-50 border-blue-200">
                      <SecurityShield className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Government Certification</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        This is an official government portal. All data is encrypted and stored on secure Indian servers.
                      </AlertDescription>
                    </Alert>
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
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || isAnimating}
                    className="submit-button bg-green-600 hover:bg-green-700 text-white px-8"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileCheck className="h-4 w-4 mr-2" /> Submit Application
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Registration Process Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: FileSignature,
              title: "Step 1: Complete Form",
              description: "Fill all sections with accurate information as per government records",
              color: "blue"
            },
            {
              icon: ShieldCheck,
              title: "Step 2: Verification",
              description: "Admin verifies details with government databases",
              color: "green"
            },
            {
              icon: UserCheck,
              title: "Step 3: Activation",
              description: "Account activated with access to financial services",
              color: "purple"
            }
          ].map((item, index) => (
            <Card key={item.title} className="border-gray-200 hover:border-blue-200 transition-colors">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Government Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">© {new Date().getFullYear()} Ministry of Finance, Government of India</p>
            <p>This is an official government portal. For assistance, contact: support@finance.gov.in</p>
          </div>
        </div>
      </div>

      {/* Success Animation Overlay */}
      <div className="success-animation absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-96 h-96 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .government-portal {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.05) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.03) 1px, transparent 0);
          background-size: 50px 50px, 100px 100px;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        /* National Flag Stripes Animation */
        .flag-stripe:nth-child(1) {
          animation-delay: 0s;
        }
        .flag-stripe:nth-child(2) {
          animation-delay: 0.2s;
        }
        .flag-stripe:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        /* Official government seal animation */
        @keyframes seal-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
        }
        
        .government-seal {
          animation: seal-glow 3s infinite;
        }
      `}</style>
    </div>
  )
}