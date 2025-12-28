"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2, Shield, Users, ArrowRight,
  CheckCircle, Lock, FileText, Target, Star, Quote,
  Play, Calendar, Phone, Mail, Globe,
  ShieldCheck, IndianRupee, FileCheck, CreditCard, PieChart,
  ChevronRight, BarChart, ChartLine, Building, Landmark,
  Menu, X, Search, Bell, User, Calculator, Award,
  Home, Heart, Scale, Truck, Train, Plane, Wifi, Headphones,
  Clock, Sparkles, TrendingUp as UpTrend, Check,
  Zap, Globe as GlobeIcon, Award as AwardIcon,
  Cpu, Database, Server, Users as UsersIcon,
  Wallet, Banknote, LineChart, Shield as ShieldIcon,
  MessageSquare, ThumbsUp, UserPlus, TrendingUp,
  Briefcase, GraduationCap, Rocket, Target as TargetIcon,
  ShieldOff, Brain, Network, Cloud,
  Sparkle, Gem, Crown, Medal, BarChart3
} from "lucide-react"
import Link from "next/link"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function GovernmentLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeAnnouncement, setActiveAnnouncement] = useState(0)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)
  const heroControls = useAnimation()
  const statsControls = useAnimation()
  const featuresControls = useAnimation()
  
  const isHeroInView = useInView(heroRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true })

  // Auto-rotate announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start('visible')
    }
  }, [isHeroInView, heroControls])

  useEffect(() => {
    if (isStatsInView) {
      statsControls.start('visible')
    }
  }, [isStatsInView, statsControls])

  useEffect(() => {
    if (isFeaturesInView) {
      featuresControls.start('visible')
    }
  }, [isFeaturesInView, featuresControls])

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  // Stats counter animation
  const Counter = ({ value, suffix = "", duration = 2000 }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        },
        { threshold: 0.5 }
      )

      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      if (inView) {
        let start = 0
        const end = parseInt(value.replace(/,/g, ''))
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)

        return () => clearInterval(timer)
      }
    }, [inView, value, duration])

    return (
      <span ref={ref} className="font-bold">
        {count.toLocaleString()}{suffix}
      </span>
    )
  }

  // Announcements data
  const announcements = [
    { text: "New Feature: Automated Tax Filing Assistance Now Available", icon: Zap, color: "from-blue-500 to-cyan-500" },
    { text: "Security Update: Enhanced AES-256 Encryption Implemented", icon: Shield, color: "from-emerald-500 to-green-500" },
    { text: "Training: Join our webinar on Retirement Planning - 15th Dec", icon: Calendar, color: "from-purple-500 to-pink-500" },
    { text: "Alert: Last date for ITR filing extension is 31st December", icon: Bell, color: "from-amber-500 to-orange-500" },
    { text: "Update: New GPF interest rates announced for Q4", icon: TrendingUp, color: "from-rose-500 to-red-500" }
  ]

  // Stats data
  const stats = [
    { 
      value: "1,25,000", 
      label: "Active Employees", 
      suffix: "+", 
      description: "Registered government professionals", 
      change: "+12% growth", 
      icon: UsersIcon,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      duration: 2500
    },
    { 
      value: "8,456", 
      label: "Assets Managed", 
      suffix: " Cr", 
      description: "Total assets under management", 
      change: "↑ ₹1,234 Cr growth", 
      icon: IndianRupee,
      color: "from-emerald-500 to-green-500",
      bg: "bg-gradient-to-br from-emerald-50 to-green-50",
      duration: 3000
    },
    { 
      value: "94", 
      label: "Satisfaction Rate", 
      suffix: "%", 
      description: "Employee satisfaction score", 
      change: "Industry leading", 
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50",
      duration: 2000
    },
    { 
      value: "28", 
      label: "Departments", 
      suffix: "+", 
      description: "Active government departments", 
      change: "All ministries", 
      icon: Building2,
      color: "from-purple-500 to-pink-500",
      bg: "bg-gradient-to-br from-purple-50 to-pink-50",
      duration: 1500
    }
  ]

  // Features data
  const features = [
    {
      title: "Salary Management",
      description: "Comprehensive salary tracking with detailed breakdowns and government-specific allowances",
      icon: CreditCard,
      color: "from-blue-500 to-indigo-500",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      points: ["Real-time salary tracking", "Allowance optimization", "GPF/CPF management", "Pension forecasting"],
      highlight: "Most Used",
      delay: 0
    },
    {
      title: "Tax Planning & Compliance",
      description: "Government-specific tax calculations with automated ITR filing assistance",
      icon: FileCheck,
      color: "from-emerald-500 to-teal-500",
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
      points: ["Section 80C optimization", "HRA calculations", "ITR automation", "Tax saving strategies"],
      highlight: "CERT-In Approved",
      delay: 0.1
    },
    {
      title: "Investment Portfolio",
      description: "Track government-approved investments with intelligent market insights",
      icon: PieChart,
      color: "from-purple-500 to-violet-500",
      bg: "bg-gradient-to-br from-purple-50 to-violet-50",
      points: ["NPS tracking", "PPF monitoring", "Market analysis", "Goal-based investing"],
      highlight: "SEBI Registered",
      delay: 0.2
    },
    {
      title: "Secure Document Vault",
      description: "Military-grade encrypted storage for all financial and personal documents",
      icon: Shield,
      color: "from-amber-500 to-orange-500",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50",
      points: ["Aadhaar/PAN storage", "Bank documents", "Investment proofs", "Tax records"],
      highlight: "256-bit AES",
      delay: 0.3
    }
  ]

  // Security features
  const securityFeatures = [
    {
      title: "Military-Grade Encryption",
      description: "256-bit AES encryption with quantum-resistant algorithms",
      icon: Shield,
      badge: "CERT-In Certified",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100",
      delay: 0
    },
    {
      title: "RBI & SEBI Compliance",
      description: "Full regulatory compliance with automated audit trails",
      icon: Award,
      badge: "RBI Approved",
      color: "bg-gradient-to-br from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-100",
      delay: 0.1
    },
    {
      title: "Indian Data Sovereignty",
      description: "All data stored exclusively on secure Indian government infrastructure",
      icon: Database,
      badge: "Data Localized",
      color: "bg-gradient-to-br from-purple-500 to-violet-500",
      iconBg: "bg-purple-100",
      delay: 0.2
    },
    {
      title: "Regular Security Audits",
      description: "Quarterly audits by CERT-In and government security agencies",
      icon: ShieldCheck,
      badge: "Audit Ready",
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
      iconBg: "bg-amber-100",
      delay: 0.3
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Assistant Professor",
      department: "Education Department",
      quote: "The tax planning features saved me ₹85,000 last year. Extremely helpful for government employees.",
      rating: 5,
      avatarColor: "from-blue-500 to-cyan-500"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Medical Officer",
      department: "Health Department",
      quote: "Investment tracking and retirement planning tools are exceptional. Planning post-retirement finances with confidence.",
      rating: 5,
      avatarColor: "from-emerald-500 to-teal-500"
    },
    {
      name: "Shri Amit Patel",
      role: "Tehsildar",
      department: "Revenue Department",
      quote: "Highly recommended for all government employees. Security and ease of use make it stand out.",
      rating: 4,
      avatarColor: "from-purple-500 to-violet-500"
    }
  ]

  // Departments
  const departments = [
    { name: 'Education', icon: GraduationCap, color: 'from-blue-500 to-cyan-500', count: '45K+', delay: 0 },
    { name: 'Health', icon: Heart, color: 'from-rose-500 to-pink-500', count: '32K+', delay: 0.1 },
    { name: 'Revenue', icon: Scale, color: 'from-emerald-500 to-teal-500', count: '28K+', delay: 0.2 },
    { name: 'Police', icon: ShieldIcon, color: 'from-indigo-500 to-blue-500', count: '18K+', delay: 0.3 },
    { name: 'Defense', icon: Target, color: 'from-gray-700 to-gray-900', count: '15K+', delay: 0.4 },
    { name: 'Finance', icon: Banknote, color: 'from-amber-500 to-orange-500', count: '22K+', delay: 0.5 }
  ]

  // Floating particles component
  const FloatingParticle = ({ index }) => {
    return (
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10 backdrop-blur-sm"
        style={{
          width: Math.random() * 60 + 20,
          height: Math.random() * 60 + 20,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    )
  }

  // Character animation component for hero text
  const AnimatedText = ({ text, gradient = false, delay = 0 }) => {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from(text).map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50, rotateX: 90 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: delay + index * 0.05
            }}
            className={cn(
              "inline-block text-5xl md:text-7xl lg:text-8xl font-bold",
              gradient 
                ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent"
                : "text-gray-900"
            )}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50/30" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {[...Array(15)].map((_, i) => (
            <FloatingParticle key={i} index={i} />
          ))}
        </div>
      </div>

      {/* Enhanced Announcement Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                <Zap className="h-3 w-3" />
                <span className="font-medium">ANNOUNCEMENTS</span>
              </div>
              
              <div className="relative h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAnnouncement}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    {announcements.map((item, index) => {
                      const Icon = item.icon
                      if (index !== activeAnnouncement) return null
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`} />
                          <Icon className="h-3 w-3" />
                          <span className="text-sm">{item.text}</span>
                        </div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="hidden md:block text-sm font-medium">
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Updates
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Animated Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link href="#" className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 blur-sm"
                  />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/90 rounded-full flex items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Arthayantra
                  </h1>
                  <p className="text-xs text-gray-600">Government Financial Intelligence</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['Home', 'Features', 'Departments', 'Security', 'Resources'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="#" 
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/Registration">
                  <Button variant="outline" className="border-blue-500 text-blue-600">
                    Register
                  </Button>
                </Link>
              </motion.div>
             <div className="flex items-center gap-3"> 
  {/* Register Button Code */}
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link href="/login">
      <Button variant="outline" className="w-full border-blue-500 text-blue-600 bg-blue-50">
        Employee Login
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  </motion.div>
</div>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4"
              >
                <div className="flex flex-col gap-4">
                  {['Home', 'Features', 'Departments', 'Security', 'Resources'].map((item) => (
                    <Link 
                      key={item} 
                      href="#" 
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <Link href="/Registration" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-blue-500 text-blue-600">
                        Register
                      </Button>
                    </Link>
                    <Link href="/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-blue-500 text-blue-600">
                        Login</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Enhanced Hero Section with Premium Animations */}
      <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
          
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
          />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}>
              <motion.div
                animate={{
                  backgroundPosition: ['0px 0px', '100px 100px'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px),
                                    linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                }}
              />
            </div>
          </div>
          
          {/* Floating Animated Icons */}
          {[...Array(6)].map((_, i) => {
            const icons = [Shield, IndianRupee, Users, FileCheck, CreditCard, PieChart];
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.5, 1],
                  scale: [0, 1, 0.9, 1],
                  y: [0, -30, 0, -20, 0],
                  x: [0, 20, 0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
                className="absolute"
                style={{
                  left: `${15 + (i * 15)}%`,
                  top: `${20 + (i * 10)}%`,
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                  <Icon className="h-6 w-6 text-blue-400/60" />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={heroControls}
            variants={containerVariants}
            className="max-w-6xl mx-auto text-center relative z-10"
          >
            {/* Animated Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.7)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl"
                />
                <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-medium">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </motion.div>
                  <span className="font-semibold">Official Portal for Government Employees</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Main Heading with Character Animation */}
            <motion.div
              variants={containerVariants}
              className="mb-8"
            >
              <div className="relative inline-block">
                {/* Text Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-3xl rounded-lg"
                />
                
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 relative">
  {/* First Line */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="block text-gray-900"
  >
    Financial
  </motion.div>
  
  {/* Second Line with Gradient */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1 }}
    className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent"
  >
    Intelligence
  </motion.div>
</h1>
                
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  
                </motion.div>
              </div>
            </motion.div>

            {/* Description with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mb-12 max-w-2xl mx-auto"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                A comprehensive financial management platform designed exclusively for government employees. 
                Manage salary, investments, taxes, and retirement planning with enterprise-grade security.
              </p>
            </motion.div>

            {/* CTA Buttons with Enhanced Animations */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              {/* Primary Button */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Button Glow */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(90deg, #3b82f6 0%, #06b6d4 50%, #3b82f6 100%)",
                      "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%, #3b82f6 0%)",
                      "linear-gradient(90deg, #3b82f6 0%, #06b6d4 50%, #3b82f6 100%)",
                    ],
                    backgroundSize: ["200% 100%", "200% 100%", "200% 100%"],
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -inset-1 rounded-2xl blur opacity-75"
                />
                
                <Link href="/Registration">
                  <Button size="lg" className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-6 text-lg shadow-2xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="mr-3"
                    >
                      <Rocket className="h-6 w-6" />
                    </motion.div>
                    Get Started Free
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-300 px-10 py-6 text-lg group relative overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                  <Play className="mr-3 h-6 w-6" />
                  Watch Demo
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-2 w-2 h-2 bg-blue-500 rounded-full"
                  />
                </Button>
              </motion.div>
            </motion.div>

            {/* Live Stats with Enhanced Animation */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8"
            >
              {/* Active Users */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-green-500/30 rounded-full"
                  />
                  <div className="w-3 h-3 bg-green-500 rounded-full relative" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">Live Platform</div>
                  <div className="text-xs text-gray-600">Active now</div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ delay: 3, duration: 0.5 }}
                  className="text-sm font-bold text-gray-900"
                >
                  2,847
                </motion.div>
              </motion.div>

              {/* Today's Logins */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
              >
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-800">Today's Logins</div>
                  <div className="text-xs text-gray-600">Users logged in</div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ delay: 3.2, duration: 0.5 }}
                  className="text-sm font-bold text-gray-900"
                >
                  12,345
                </motion.div>
              </motion.div>

              {/* Department Count */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
              >
                <Building2 className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-800">Departments</div>
                  <div className="text-xs text-gray-600">Active ministries</div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ delay: 3.4, duration: 0.5 }}
                  className="text-sm font-bold text-gray-900"
                >
                  28+
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-xs text-gray-500 font-medium">Scroll to explore</div>
                <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating Data Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20 right-20 hidden lg:block"
          >
            <div className="relative w-64 h-64">
              {/* Animated Chart */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.path
                  d="M10,50 Q25,30 40,40 T70,30 T90,50"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Floating Data Points */}
              {[10, 40, 70, 90].map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1, 0.8, 1],
                    y: [0, -10, 0, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5 + 1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  style={{
                    left: `${x}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <motion.svg
            className="absolute bottom-0 w-full h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="white"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35,6.36,119.13-6.25,33-11,63.5-29.5,89.67-51.66,23.43-19.64,44.5-42.5,65.5-65.5V0Z"
              fill="white"
              fillOpacity="0.7"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2.5, delay: 1.2 }}
            />
          </motion.svg>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsControls}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`relative ${stat.bg} rounded-2xl p-6 border border-white/50 shadow-lg overflow-hidden group`}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} style={{ padding: '1px' }}>
                    <div className="absolute inset-0 bg-white rounded-2xl" />
                  </div>

                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-4`}>
                      <Icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      <Counter value={stat.value} suffix={stat.suffix} duration={stat.duration} />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</h3>
                    <p className="text-sm text-gray-600 mb-3">{stat.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <UpTrend className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Financial Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized features designed specifically for government employees' financial needs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  {/* Highlight Badge */}
                  {feature.highlight && (
                    <div className="absolute -top-3 right-6 z-10">
                      <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        {feature.highlight}
                      </div>
                    </div>
                  )}

                  <Card className={`relative overflow-hidden border-0 shadow-xl ${feature.bg}`}>
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

                    <CardContent className="relative p-8">
                      <div className="flex items-start gap-6">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                          <p className="text-gray-600 mb-6">{feature.description}</p>
                          
                          <div className="grid grid-cols-2 gap-3">
                            {feature.points.map((point, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 + feature.delay }}
                                className="flex items-center gap-2"
                              >
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                                <span className="text-sm text-gray-700">{point}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Explore Button */}
                      <div className="mt-8 pt-6 border-t border-gray-200/50">
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-700 group/btn">
                          <span>Explore Feature</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Serving <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">28+ Departments</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions for employees across all government sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {departments.map((dept, index) => {
              const Icon = dept.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: dept.delay }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Department Icon */}
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>
                    
                    {/* Department Name */}
                    <h4 className="text-center font-semibold text-gray-800 mb-2">{dept.name}</h4>
                    
                    {/* Employee Count */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Employees</div>
                      <div className="text-sm font-bold text-gray-900">{dept.count}</div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-semibold">GOVERNMENT-GRADE SECURITY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built with <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Highest Security</span> Standards
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Certified security protocols ensuring complete protection of government employee data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((security, index) => {
              const Icon = security.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: security.delay }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <Card className="bg-white border-0 shadow-lg overflow-hidden">
                    {/* Animated Border */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${security.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '1px' }}>
                      <div className="absolute inset-0 bg-white rounded-lg" />
                    </div>

                    <CardContent className="relative p-6">
                      {/* Icon */}
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-16 h-16 rounded-2xl ${security.iconBg} flex items-center justify-center mb-6 mx-auto`}
                      >
                        <Icon className={`h-8 w-8 bg-gradient-to-br ${security.color} bg-clip-text text-transparent`} />
                      </motion.div>
                      
                      {/* Badge */}
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-xs font-semibold mb-4">
                        {security.badge}
                      </div>
                      
                      {/* Title & Description */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{security.title}</h3>
                      <p className="text-sm text-gray-600">{security.description}</p>
                      
                      {/* Verification Badge */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-gray-500">Verified & Audited</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Government Employees</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from government employees who have transformed their financial management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                        />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-gray-700 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                    
                    {/* Profile */}
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center`}
                      >
                        <span className="font-bold text-white text-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{testimonial.department}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Transform Your Financial Management?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-blue-100 mb-8"
            >
              Join thousands of government employees who trust Arthayantra for their financial needs
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/Registration">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                    <Rocket className="mr-2 h-5 w-5" />
                    Register Now - It's Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                  Schedule a Demo
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm text-blue-200 mt-6"
            >
              No credit card required • Government employee verification required
            </motion.p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center"
                >
                  <div className="w-7 h-7 border border-white/80 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </motion.div>
                <div>
                  <div className="font-bold text-lg">Arthayantra</div>
                  <div className="text-xs text-gray-400">Government Financial Intelligence</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Ministry of Finance, Government of India<br />
                Official Financial Management Platform
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <AwardIcon className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-medium">ISO 27001:2022</div>
                  <div className="text-xs text-gray-500">Certified Secure</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Registration', 'Employee Login', 'User Manual', 'Training'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <ChevronRight className="h-3 w-3 text-gray-600 group-hover:text-blue-400 transition-colors" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {['Tax Guidelines', 'Investment Schemes', 'Pension Rules', 'FAQs', 'Government Forms'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <FileText className="h-3 w-3 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6">Contact & Support</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Toll Free Support</div>
                    <div className="text-sm text-gray-400">1800-123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-gray-400">support@fms.gov.in</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Office Hours</div>
                    <div className="text-sm text-gray-400">Mon-Fri: 9 AM - 6 PM IST</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
     
        </div>
      </footer>
    </div>
  )
}