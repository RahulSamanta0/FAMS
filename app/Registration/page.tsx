"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  User, Mail, Phone, Briefcase, Building, Calendar, IndianRupee,
  FileSignature, Fingerprint, CheckCircle, ArrowRight, ArrowLeft,
  AlertCircle, Loader2, ShieldCheck, FileText, LogOut,
  HelpCircle, Menu, X, ChevronRight, Database, Clock, Shield,
  ClipboardCheck, FileCheck, Verified
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Government Departments
const DEPARTMENTS = [
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

// Government Designations
const DESIGNATIONS = [
  "Deputy Secretary", "Under Secretary", "Section Officer",
  "Assistant Section Officer", "Director", "Joint Secretary",
  "Additional Secretary", "Secretary", "Principal Secretary",
  "Chief Secretary", "Deputy Director", "Assistant Director",
  "Senior Consultant", "Consultant", "Technical Officer",
  "Scientist", "Engineer", "Accountant", "Auditor",
  "Administrative Officer", "Executive Engineer", "Medical Officer"
]

// Validation function
const validateStep = (step: number, formData: any): Record<string, string> => {
  const errors: Record<string, string> = {}

  switch (step) {
    case 1:
      if (!formData.personal.fullName.trim()) {
        errors.fullName = 'Full name is required'
      } else if (formData.personal.fullName.trim().length < 3) {
        errors.fullName = 'Name must be at least 3 characters'
      }
      
      if (!formData.personal.email) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personal.email)) {
        errors.email = 'Enter a valid email address'
      }
      
      if (!formData.personal.phone) {
        errors.phone = 'Phone number is required'
      } else if (!/^[6-9]\d{9}$/.test(formData.personal.phone)) {
        errors.phone = 'Enter a valid 10-digit phone number'
      }
      
      if (!formData.personal.pan) {
        errors.pan = 'PAN is required'
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.personal.pan)) {
        errors.pan = 'Enter a valid PAN (e.g., ABCDE1234F)'
      }
      
      if (!formData.personal.aadhaar) {
        errors.aadhaar = 'Aadhaar is required'
      } else if (!/^\d{12}$/.test(formData.personal.aadhaar)) {
        errors.aadhaar = 'Enter a valid 12-digit Aadhaar number'
      }
      
      if (!formData.personal.dob) {
        errors.dob = 'Date of birth is required'
      } else {
        const dob = new Date(formData.personal.dob)
        const age = new Date().getFullYear() - dob.getFullYear()
        if (age < 18 || age > 70) {
          errors.dob = 'Age must be between 18 and 70 years'
        }
      }
      break
      
    case 2:
      if (!formData.employment.department) {
        errors.department = 'Department is required'
      }
      
      if (!formData.employment.designation) {
        errors.designation = 'Designation is required'
      }
      
      if (!formData.employment.employeeId) {
        errors.employeeId = 'Employee ID is required'
      }
      
      if (!formData.employment.dateOfJoining) {
        errors.dateOfJoining = 'Date of joining is required'
      }
      
      if (!formData.employment.salaryStructure.basic) {
        errors.basic = 'Basic pay is required'
      } else if (parseFloat(formData.employment.salaryStructure.basic) < 18000) {
        errors.basic = 'Basic pay must be at least ₹18,000'
      }
      break
      
    case 3:
      if (!formData.termsAccepted) {
        errors.terms = 'You must accept the terms and conditions'
      }
      
      if (!formData.declarationSigned) {
        errors.declaration = 'You must sign the declaration'
      }
      break
  }
  
  return errors
}

export default function GovernmentEmployeeRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const emblemRef = useRef<HTMLDivElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      pan: '',
      aadhaar: '',
      dob: '',
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
        ta: '',
        ma: '',
        otherAllowances: '',
        grossSalary: '',
        deductions: '',
        netSalary: '',
      }
    },
    termsAccepted: false,
    declarationSigned: false
  })

  const totalSteps = 3

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize animations
    const initAnimations = () => {
      // National emblem entrance
      if (emblemRef.current) {
        gsap.from(emblemRef.current, {
          duration: 1.5,
          scale: 0,
          rotation: 360,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Add continuous subtle rotation
            gsap.to(emblemRef.current, {
              rotation: 5,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            })
          }
        })
      }

      // Header entrance
      gsap.from(headerRef.current, {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
      })

      // Progress bar animation
      gsap.to('.progress-fill', {
        width: `${progress}%`,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          // Add glow effect when nearing completion
          if (progress > 90) {
            gsap.to('.progress-fill', {
              boxShadow: '0 0 20px rgba(4, 106, 56, 0.5)',
              duration: 0.5,
              yoyo: true,
              repeat: 1
            })
          }
        }
      })

      // Flag color reveal
      gsap.from('.flag-color', {
        width: 0,
        duration: 1,
        stagger: {
          each: 0.2,
          from: "start"
        },
        ease: "power2.out"
      })
    }

    initAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Update progress when step changes
  useEffect(() => {
    setProgress(((step - 1) / totalSteps) * 100)
  }, [step])

  const handleNext = () => {
    // Validate current step
    const currentErrors = validateStep(step, formData)
    
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors)
      toast.error('Validation Failed', {
        description: 'Please correct the errors before proceeding',
        icon: <AlertCircle className="h-5 w-5" />
      })
      
      // Scroll to first error
      const firstError = Object.keys(currentErrors)[0]
      const element = document.querySelector(`[name="${firstError}"]`) || 
                      document.querySelector(`[id="${firstError}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    
    // Clear errors if validation passes
    setErrors({})
    
    if (step < totalSteps && !isAnimating) {
      setIsAnimating(true)
      
      // Animate current step out
      gsap.to(`.step-${step}`, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setStep(step + 1)
          setProgress((step / totalSteps) * 100)
          
          // Animate new step in
          gsap.fromTo(`.step-${step + 1}`,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                setIsAnimating(false)
              }
            }
          )
        }
      })
    }
  }

  const handleBack = () => {
    if (step > 1 && !isAnimating) {
      setIsAnimating(true)
      
      // Clear errors when going back
      setErrors({})
      
      gsap.to(`.step-${step}`, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setStep(step - 1)
          setProgress(((step - 2) / totalSteps) * 100)
          
          gsap.fromTo(`.step-${step - 1}`,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                setIsAnimating(false)
              }
            }
          )
        }
      })
    }
  }

  // Auto-calculate salary
  useEffect(() => {
    const basic = parseFloat(formData.employment.salaryStructure.basic) || 0
    const hra = basic * 0.24 // 24% of basic
    const da = basic * 0.17 // 17% of basic
    const ta = 3600 // Fixed travel allowance
    const ma = 1800 // Fixed medical allowance
    const otherAllowances = parseFloat(formData.employment.salaryStructure.otherAllowances) || 0
    
    const grossSalary = basic + hra + da + ta + ma + otherAllowances
    const deductions = grossSalary * 0.10 // 10% deductions
    const netSalary = grossSalary - deductions

    setFormData(prev => ({
      ...prev,
      employment: {
        ...prev.employment,
        salaryStructure: {
          ...prev.employment.salaryStructure,
          hra: hra.toFixed(2),
          da: da.toFixed(2),
          ta: ta.toFixed(2),
          ma: ma.toFixed(2),
          grossSalary: grossSalary.toFixed(2),
          deductions: deductions.toFixed(2),
          netSalary: netSalary.toFixed(2)
        }
      }
    }))
  }, [formData.employment.salaryStructure.basic, formData.employment.salaryStructure.otherAllowances])

  // Handle form submission
  const handleSubmit = async () => {
    // Validate step 3
    const currentErrors = validateStep(3, formData)
    
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors)
      toast.error('Validation Failed', {
        description: 'Please complete all required fields',
        icon: <AlertCircle className="h-5 w-5" />
      })
      
      // Scroll to errors
      const firstError = Object.keys(currentErrors)[0]
      const element = document.querySelector(`[name="${firstError}"]`) || 
                      document.querySelector(`[id="${firstError}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Success
      toast.success('Application Submitted Successfully', {
        description: `Reference Number: GOV/EMP/${Date.now()}`,
        duration: 5000,
        icon: <Verified className="h-5 w-5" />
      })

      // Redirect after success
      setTimeout(() => {
        router.push('/government/dashboard')
      }, 2000)

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

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderPersonalInfo()
      case 2:
        return renderEmploymentInfo()
      case 3:
        return renderReviewSubmit()
      default:
        return null
    }
  }

  const renderPersonalInfo = () => (
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 step-1"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <User className="h-5 w-5" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" /> Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.personal.fullName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, fullName: e.target.value }
                  }))}
                  className={cn(
                    errors.fullName && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <Label htmlFor="dob" className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" /> Date of Birth *
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.personal.dob}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, dob: e.target.value }
                  }))}
                  className={cn(
                    errors.dob && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" /> Official Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, email: e.target.value }
                  }))}
                  className={cn(
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4" /> Mobile Number *
                </Label>
                <div className="flex">
                  <div className="flex items-center justify-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    +91
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.personal.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, phone: e.target.value }
                    }))}
                    className={cn(
                      "rounded-l-none",
                      errors.phone && "border-red-500 focus:border-red-500"
                    )}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="pan" className="flex items-center gap-2 mb-2">
                  <FileSignature className="h-4 w-4" /> PAN Number *
                </Label>
                <Input
                  id="pan"
                  name="pan"
                  value={formData.personal.pan}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, pan: e.target.value.toUpperCase() }
                  }))}
                  className={cn(
                    "uppercase",
                    errors.pan && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
              </div>

              <div>
                <Label htmlFor="aadhaar" className="flex items-center gap-2 mb-2">
                  <Fingerprint className="h-4 w-4" /> Aadhaar Number *
                </Label>
                <Input
                  id="aadhaar"
                  name="aadhaar"
                  value={formData.personal.aadhaar}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, aadhaar: e.target.value }
                  }))}
                  className={cn(
                    errors.aadhaar && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.aadhaar && <p className="text-red-500 text-xs mt-1">{errors.aadhaar}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const renderEmploymentInfo = () => (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 step-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Information */}
        <Card className="md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <CardTitle className="text-indigo-800 flex items-center gap-2">
              <Building className="h-5 w-5" /> Employment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="department" className="flex items-center gap-2 mb-2">
                  <Building className="h-4 w-4" /> Ministry/Department *
                </Label>
                <Select
                  value={formData.employment.department}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    employment: { ...prev.employment, department: value }
                  }))}
                >
                  <SelectTrigger id="department" className={cn(
                    errors.department && "border-red-500 focus:border-red-500"
                  )}>
                    <SelectValue placeholder="Select Ministry/Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>

              <div>
                <Label htmlFor="designation" className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4" /> Designation *
                </Label>
                <Select
                  value={formData.employment.designation}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    employment: { ...prev.employment, designation: value }
                  }))}
                >
                  <SelectTrigger id="designation" className={cn(
                    errors.designation && "border-red-500 focus:border-red-500"
                  )}>
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESIGNATIONS.map((designation) => (
                      <SelectItem key={designation} value={designation}>{designation}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
              </div>

              <div>
                <Label htmlFor="employeeId" className="flex items-center gap-2 mb-2">
                  <FileSignature className="h-4 w-4" /> Employee ID *
                </Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employment.employeeId}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    employment: { ...prev.employment, employeeId: e.target.value }
                  }))}
                  className={cn(
                    errors.employeeId && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
              </div>

              <div>
                <Label htmlFor="dateOfJoining" className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" /> Date of Joining *
                </Label>
                <Input
                  id="dateOfJoining"
                  name="dateOfJoining"
                  type="date"
                  value={formData.employment.dateOfJoining}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    employment: { ...prev.employment, dateOfJoining: e.target.value }
                  }))}
                  className={cn(
                    errors.dateOfJoining && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.dateOfJoining && <p className="text-red-500 text-xs mt-1">{errors.dateOfJoining}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Calculator */}
        <Card className="md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-emerald-800 flex items-center gap-2">
              <IndianRupee className="h-5 w-5" /> Salary Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="basic" className="text-gray-700">Basic Pay *</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="basic"
                    name="basic"
                    type="number"
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
                    className="pl-10"
                    placeholder="50000"
                  />
                </div>
                {errors.basic && <p className="text-red-500 text-xs mt-1">{errors.basic}</p>}
              </div>

              <div>
                <Label className="text-gray-700">HRA (24%)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={formData.employment.salaryStructure.hra}
                    readOnly
                    className="pl-10 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-700">DA (17%)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={formData.employment.salaryStructure.da}
                    readOnly
                    className="pl-10 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Salary Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gross Salary</p>
                  <p className="text-xl font-bold text-green-700">
                    ₹{parseFloat(formData.employment.salaryStructure.grossSalary || '0').toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deductions (10%)</p>
                  <p className="text-xl font-bold text-red-700">
                    ₹{parseFloat(formData.employment.salaryStructure.deductions || '0').toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Salary</p>
                  <p className="text-xl font-bold text-blue-700">
                    ₹{parseFloat(formData.employment.salaryStructure.netSalary || '0').toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const renderReviewSubmit = () => (
    <motion.div
      key="step-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 step-3"
    >
      {/* Success Preview */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-green-800 bg-clip-text text-transparent mb-3">
          Application Ready for Submission
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your application has been validated and is ready for submission to the Government Database. 
          Review all information before finalizing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Summary */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { label: 'Full Name', value: formData.personal.fullName },
                { label: 'Email', value: formData.personal.email },
                { label: 'Phone', value: formData.personal.phone },
                { label: 'PAN', value: formData.personal.pan },
                { label: 'Aadhaar', value: formData.personal.aadhaar },
                { label: 'Date of Birth', value: formData.personal.dob }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value || 'Not provided'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employment Summary */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Employment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { label: 'Department', value: formData.employment.department },
                { label: 'Designation', value: formData.employment.designation },
                { label: 'Employee ID', value: formData.employment.employeeId },
                { label: 'Date of Joining', value: formData.employment.dateOfJoining },
                { label: 'Basic Pay', value: `₹${formData.employment.salaryStructure.basic || '0'}` },
                { label: 'Net Salary', value: `₹${formData.employment.salaryStructure.netSalary || '0'}` }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value || 'Not provided'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Declaration */}
        <Card className="lg:col-span-2 border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <Label htmlFor="terms" className="text-gray-700">
                    <strong>Terms & Conditions:</strong> I agree to abide by all government rules and regulations. 
                    I understand that my data will be stored securely and used only for official purposes as per 
                    the Government of India's data protection policies.
                  </Label>
                  {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  checked={formData.declarationSigned}
                  onChange={(e) => setFormData(prev => ({ ...prev, declarationSigned: e.target.checked }))}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <Label htmlFor="declaration" className="text-gray-700">
                    <strong>Official Declaration:</strong> I hereby declare that all information provided is true, 
                    complete, and correct to the best of my knowledge. I understand that providing false information 
                    is punishable under IPC Section 177 and may result in disciplinary action, termination of 
                    employment, and legal consequences.
                  </Label>
                  {errors.declaration && <p className="text-red-500 text-xs mt-1">{errors.declaration}</p>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Protocol */}
      <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800 font-bold">Government Submission Protocol</AlertTitle>
        <AlertDescription className="text-green-700 space-y-2">
          <p>✓ Application will be encrypted and stored on secure government servers</p>
          <p>✓ Acknowledgement with reference number will be sent to registered email</p>
          <p>✓ Standard processing time: 3-5 working days</p>
          <p>✓ Status tracking available using application reference number</p>
          <p>✓ For queries, contact: 1800-11-1969 or support@digitalindia.gov.in</p>
        </AlertDescription>
      </Alert>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* National Flag Header */}
      <div className="h-3 flex shadow-md">
        <div className="flag-color flex-1 bg-gradient-to-r from-[#FF671F] to-[#FF8C42]" />
        <div className="flag-color flex-1 bg-gradient-to-r from-white to-gray-100" />
        <div className="flag-color flex-1 bg-gradient-to-r from-[#046A38] to-[#058C42]" />
      </div>

      {/* Official Government Header */}
      <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Government Identity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center gap-3">
                {/* Animated National Emblem */}
                <div ref={emblemRef} className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#06038D] to-[#1E3A8A] rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-10 h-10 border-4 border-gold rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#06038D] to-[#1E3A8A] bg-clip-text text-transparent">
                      भारत सरकार
                    </h1>
                    <p className="text-sm font-medium text-gray-700">GOVERNMENT OF INDIA</p>
                    <p className="text-xs text-gray-500">Employee Self Registration Portal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex items-center gap-2 text-gray-600 hover:text-[#06038D]"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="text-sm">Help Desk</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Contact: 1800-11-1969</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button
                variant="outline"
                size="sm"
                className="border-[#06038D] text-[#06038D] hover:bg-[#06038D] hover:text-white transition-all"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Portal Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm">
            {[
              { label: 'Home', active: false },
              { label: 'Employee Services', active: false },
              { label: 'Registration', active: false },
              { label: 'New Employee Registration', active: true }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-3 w-3 text-gray-400" />}
                <span className={cn(
                  "px-3 py-1 rounded-full",
                  item.active 
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium"
                    : "text-gray-600 hover:text-blue-600"
                )}>
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Portal Title with Status */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#06038D] via-[#1E3A8A] to-[#046A38] bg-clip-text text-transparent">
                Government Employee Registration Portal
              </h2>
              <p className="text-gray-600">
                Ministry of Personnel, Public Grievances and Pensions | Department of Administrative Reforms
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none px-4 py-2">
                <Shield className="h-3 w-3 mr-2" />
                Official Government Portal
              </Badge>
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-700 text-white border-none px-4 py-2">
                <Database className="h-3 w-3 mr-2" />
                Data Encrypted & Protected
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none px-4 py-2">
                <Clock className="h-3 w-3 mr-2" />
                Processing Time: 3-5 Days
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Registration Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Registration Steps */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-gray-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#06038D] to-[#1E3A8A] text-white">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5" />
                  Registration Steps
                </CardTitle>
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
                        "p-4 flex items-center gap-3 transition-all",
                        stepItem.status === 'current' && "bg-gradient-to-r from-blue-50 to-cyan-50",
                        stepItem.status === 'complete' && "bg-gradient-to-r from-green-50 to-emerald-50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                        stepItem.status === 'complete' && "bg-green-100 text-green-700 shadow-sm",
                        stepItem.status === 'current' && "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg",
                        stepItem.status === 'pending' && "bg-gray-100 text-gray-500"
                      )}>
                        {stepItem.status === 'complete' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          stepItem.number
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{stepItem.label}</div>
                        <div className="text-xs text-gray-500">
                          {stepItem.status === 'complete' && '✓ Completed'}
                          {stepItem.status === 'current' && '🔄 In Progress'}
                          {stepItem.status === 'pending' && '⏳ Pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Progress Summary */}
                <div className="p-4 border-t border-gray-100">
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Registration Progress</span>
                      <span className="font-bold text-blue-700">{Math.round(progress)}%</span>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="progress-fill absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {step === totalSteps ? (
                      <span className="text-green-600 font-medium">✓ Ready to submit</span>
                    ) : (
                      `${totalSteps - step} steps remaining`
                    )}
                  </div>
                </div>
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
              <Card className="border-2 border-gray-300 shadow-2xl bg-white/95 backdrop-blur-sm">
                {/* Form Header */}
                <CardHeader className="bg-gradient-to-r from-[#06038D] via-[#1E3A8A] to-[#046A38] text-white border-b-4 border-gold">
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
                        Government of India - Official Registration Portal | Form: GOI/EMP/FORM/2024
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/20 backdrop-blur-sm border-white/30">
                        Step {step} of {totalSteps}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                    {renderStepContent()}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={step === 1 || isAnimating}
                      className={cn(
                        "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3",
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
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-10 py-3 shadow-lg hover:shadow-xl transition-all"
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || isAnimating || !formData.termsAccepted || !formData.declarationSigned}
                        className={cn(
                          "submit-button px-10 py-3 shadow-lg hover:shadow-xl transition-all",
                          "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white",
                          (!formData.termsAccepted || !formData.declarationSigned) && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing Submission...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-4 w-4 mr-2" /> 
                            Submit to Government Database
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Government Footer */}
      <footer className="mt-12 bg-gradient-to-b from-[#06038D] to-[#0A0569] text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                title: 'Government of India',
                links: ['President of India', 'Prime Minister of India', 'Cabinet Ministers', 'Parliament of India']
              },
              {
                title: 'Digital Services',
                links: ['Digital India', 'MyGov.in', 'e-Governance', 'Grievance Redressal']
              },
              {
                title: 'Departments',
                links: ['Ministry List', 'State Governments', 'Autonomous Bodies', 'Public Sector Units']
              },
              {
                title: 'Contact & Support',
                links: ['Help Desk: 1800-11-1969', 'Email: support@digitalindia.gov.in', 'Website: www.india.gov.in', 'Emergency: 24x7 Support']
              }
            ].map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-bold text-lg mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        <ChevronRight className="h-3 w-3" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        .government-portal {
          position: relative;
          overflow-x: hidden;
        }

        .progress-fill {
          position: relative;
          overflow: hidden;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .flag-color {
          animation: slide-in 1s ease-out forwards;
        }

        @keyframes slide-in {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }

        /* Form focus styles */
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 3px rgba(6, 3, 141, 0.1);
          border-color: #06038D;
        }

        /* Loading animation */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}