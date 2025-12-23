"use client"

import { useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Building2, TrendingUp, Shield, BarChart3, Users, ArrowRight, 
  CheckCircle, Lock, FileText, Target, Award, Star, Quote, 
  Play, Download, Calendar, Phone, Mail, MapPin, Globe,
  ShieldCheck, IndianRupee, FileCheck, CreditCard, PieChart,
  Smartphone, Cloud, Award as Trophy, FileBarChart, Wallet,
  Calculator, PieChart as PieChartIcon, LineChart, Smartphone as Mobile,
  Server, AlertCircle, HelpCircle, ExternalLink, ChevronRight,
  Banknote, Home, Briefcase, GraduationCap, Heart, Scale,
  Truck, Train, Plane, Bus, Car, Wifi, Zap, Database,
  Headphones, MessageSquare, Clock, Globe as Earth,
  Sparkles, Target as Bullseye, Shield as SecurityShield,
  Zap as Lightning, Eye, EyeOff, Users as UsersIcon,
  ChartBar, ChartLine, ChartPie, TrendingDown,
  Menu, X, Search, Bell, Settings, User, LogOut
} from "lucide-react"
import Link from "next/link"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function GovernmentLandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement[]>([])
  const cardRefs = useRef<HTMLDivElement[]>([])
  const featureRefs = useRef<HTMLDivElement[]>([])
  const numberRefs = useRef<HTMLSpanElement[]>([])
  const departmentRefs = useRef<HTMLDivElement[]>([])
  const testimonialRefs = useRef<HTMLDivElement[]>([])
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Initialize animations
  useEffect(() => {
    // Create animated government background
    createAnimatedBackground()
    
    // Enhanced Hero Animation
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } })
    
    // Animate Ashoka Chakra
    gsap.fromTo(".ashoka-chakra",
      { rotation: 0, scale: 0 },
      {
        rotation: 360,
        scale: 1,
        duration: 2,
        ease: "back.out(1.7)"
      }
    )
    
    heroTimeline
      .fromTo('.hero-badge', 
        { y: -50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        }
      )
      .fromTo('.hero-title .hindi-text',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2,
          stagger: 0.1
        },
        "-=0.8"
      )
      .fromTo('.hero-title .english-text',
        { 
          text: "",
          opacity: 0 
        },
        {
          text: "Financial Management Simplified, Secure, Comprehensive",
          opacity: 1,
          duration: 2,
          ease: "none"
        },
        "-=0.5"
      )
      .fromTo('.hero-description',
        { 
          width: "0%",
          opacity: 0 
        },
        { 
          width: "100%", 
          opacity: 1, 
          duration: 1.5 
        },
        "-=1"
      )
      .fromTo('.hero-buttons',
        { 
          scale: 0.8,
          opacity: 0 
        },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        },
        "-=0.5"
      )

    // Enhanced department floating with parallax
    departmentRefs.current.forEach((dept, index) => {
      if (dept) {
        gsap.to(dept, {
          y: () => Math.sin(Date.now() * 0.001 + index) * 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        })
        
        // Hover effect
        dept.addEventListener('mouseenter', () => {
          gsap.to(dept, {
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            duration: 0.3
          })
        })
        
        dept.addEventListener('mouseleave', () => {
          gsap.to(dept, {
            scale: 1,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            duration: 0.3
          })
        })
      }
    })

    // Enhanced stats counter with visual effects
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        ScrollTrigger.create({
          trigger: stat,
          start: "top 75%",
          onEnter: () => animateEnhancedCounter(stat, index),
          once: true
        })
      }
    })

    // Card animations with 3D effect
    cardRefs.current.forEach((card, index) => {
      if (card) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(card,
              { 
                y: 100, 
                opacity: 0,
                rotationY: 15,
                scale: 0.9
              },
              {
                y: 0,
                opacity: 1,
                rotationY: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "back.out(1.7)"
              }
            )
            
            // Add floating icon animation
            const icon = card.querySelector('.feature-icon')
            if (icon) {
              gsap.fromTo(icon,
                { 
                  y: -20,
                  opacity: 0,
                  scale: 0
                },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.6,
                  delay: index * 0.1 + 0.3,
                  ease: "elastic.out(1, 0.5)"
                }
              )
            }
          },
          once: true
        })
        
        // Card hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            rotationY: 5,
            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)",
            duration: 0.3
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotationY: 0,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            duration: 0.3
          })
        })
      }
    })

    // Feature animations with staggered effects
    featureRefs.current.forEach((feature, index) => {
      if (feature) {
        ScrollTrigger.create({
          trigger: feature,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(feature,
              { 
                x: index % 2 === 0 ? -100 : 100, 
                opacity: 0,
                scale: 0.8
              },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: "power3.out"
              }
            )
            
            // Animate step number
            const stepNumber = feature.querySelector('.step-number')
            if (stepNumber) {
              gsap.fromTo(stepNumber,
                {
                  scale: 0,
                  rotation: -180
                },
                {
                  scale: 1,
                  rotation: 0,
                  duration: 0.6,
                  delay: index * 0.15 + 0.2,
                  ease: "back.out(1.7)"
                }
              )
            }
          },
          once: true
        })
      }
    })

    // Testimonial carousel animation
    testimonialRefs.current.forEach((testimonial, index) => {
      if (testimonial) {
        gsap.fromTo(testimonial,
          { 
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: testimonial,
              start: "top 85%",
              once: true
            }
          }
        )
      }
    })

    // Animated marquee for important announcements
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.querySelector('.marquee-content')
      if (marqueeContent) {
        const contentWidth = marqueeContent.scrollWidth
        gsap.to(marqueeContent, {
          x: -contentWidth,
          duration: 30,
          repeat: -1,
          ease: "none"
        })
      }
    }

    // Create particles in hero section
    createParticles()

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const createAnimatedBackground = () => {
    const bgContainer = document.querySelector('.government-bg-animation')
    if (!bgContainer) return
    
    // Create animated Ashoka Chakra pattern
    const chakra = document.createElement('div')
    chakra.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5'
    chakra.innerHTML = `
      <div class="absolute inset-0 rounded-full border-8 border-saffron-500/20"></div>
      <div class="absolute inset-24 rounded-full border-4 border-saffron-500/20"></div>
    `
    bgContainer.appendChild(chakra)
    
    // Animate chakra
    gsap.to(chakra, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none"
    })
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full bg-blue-500/10'
      particle.style.width = `${Math.random() * 4 + 2}px`
      particle.style.height = particle.style.width
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      bgContainer.appendChild(particle)
      
      // Animate particle
      gsap.to(particle, {
        y: (Math.random() - 0.5) * 100,
        x: (Math.random() - 0.5) * 100,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5
      })
    }
  }

  const createParticles = () => {
    const particlesContainer = document.querySelector('.hero-particles')
    if (!particlesContainer) return
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full'
      particle.style.width = `${Math.random() * 6 + 2}px`
      particle.style.height = particle.style.width
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3})`
      
      particlesContainer.appendChild(particle)
      
      // Animate particle
      gsap.to(particle, {
        y: -100,
        opacity: 0,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        ease: "power1.out",
        delay: Math.random() * 5
      })
    }
  }

  const animateEnhancedCounter = (element: HTMLDivElement, index: number) => {
    const values = [125678, 8456, 94, 28]
    const finalValue = values[index]
    const numberElement = element.querySelector('.stat-number')
    const iconElement = element.querySelector('.stat-icon')
    
    if (!numberElement) return
    
    // Create ripple effect
    const ripple = document.createElement('div')
    ripple.className = 'absolute inset-0 rounded-xl overflow-hidden'
    element.appendChild(ripple)
    
    // Add multiple ripple circles
    for (let i = 0; i < 3; i++) {
      const circle = document.createElement('div')
      circle.className = `absolute rounded-full ${
        index === 0 ? 'bg-blue-500/20' :
        index === 1 ? 'bg-green-500/20' :
        index === 2 ? 'bg-amber-500/20' :
        'bg-purple-500/20'
      }`
      circle.style.left = '50%'
      circle.style.top = '50%'
      circle.style.transform = 'translate(-50%, -50%) scale(0)'
      circle.style.width = '10px'
      circle.style.height = '10px'
      
      ripple.appendChild(circle)
      
      gsap.to(circle, {
        scale: 20,
        opacity: 0,
        duration: 1.5,
        delay: i * 0.3,
        ease: "power2.out",
        onComplete: () => circle.remove()
      })
    }
    
    // Animate icon
    if (iconElement) {
      gsap.to(iconElement, {
        scale: 1.2,
        duration: 0.3,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut"
      })
    }
    
    // Enhanced number animation
    const timeline = gsap.timeline()
    
    timeline
      .to(numberElement, {
        scale: 1.3,
        duration: 0.2,
        ease: "power2.out"
      })
      .to(numberElement, {
        innerText: finalValue,
        duration: 2.5,
        ease: "power3.out",
        snap: { innerText: 1 },
        onUpdate: function() {
          const current = Math.floor(parseFloat(this.targets()[0].innerText))
          if (index === 0) {
            numberElement.innerText = current.toLocaleString('en-IN')
          } else if (index === 1) {
            numberElement.innerText = `₹${(current/100).toLocaleString('en-IN')} Cr`
          } else if (index === 2) {
            numberElement.innerText = `${current}%`
          } else {
            numberElement.innerText = `${current}+`
          }
          
          // Add dynamic glow
          const progress = current / finalValue
          numberElement.style.textShadow = `0 0 ${10 + progress * 40}px ${
            index === 0 ? 'rgba(59, 130, 246, 0.5)' :
            index === 1 ? 'rgba(34, 197, 94, 0.5)' :
            index === 2 ? 'rgba(245, 158, 11, 0.5)' :
            'rgba(168, 85, 247, 0.5)'
          }`
        }
      })
      .to(numberElement, {
        scale: 1.1,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut"
      })
      .to(numberElement, {
        textShadow: "0 0 0px transparent",
        duration: 0.5
      })
    
    // Remove ripple container
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove()
      }
    }, 3000)
  }

  // Announcement marquee data
  const announcements = [
    "New Feature: Automated Tax Filing Assistance Now Available",
    "Security Update: Enhanced AES-256 Encryption Implemented",
    "Training: Join our webinar on Retirement Planning - 15th Dec, 3 PM",
    "Alert: Last date for ITR filing extension is 31st December",
    "Update: New GPF interest rates announced for Q4"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white government-bg-animation relative overflow-hidden">
      {/* Animated Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-saffron-500/5 to-transparent rounded-full" />
        
        {/* Moving lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron-300/20 to-transparent" />
      </div>

      {/* Announcement Marquee */}
      <div className="bg-blue-800 text-white py-2 overflow-hidden relative">
        <div className="flex items-center gap-4">
          <div className="bg-saffron-500 px-3 py-1 text-sm font-semibold whitespace-nowrap">
            <span className="flex items-center gap-2">
              <Bell className="h-4 w-4 animate-pulse" />
              ANNOUNCEMENTS
            </span>
          </div>
          <div ref={marqueeRef} className="flex-1 overflow-hidden">
            <div className="marquee-content flex gap-8 whitespace-nowrap">
              {announcements.map((announcement, index) => (
                <span key={index} className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {announcement}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Enhanced */}
      <header className="sticky top-0 z-50 border-b-2 border-blue-800 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <div className="flex items-center gap-4">
                {/* Animated Ashoka Chakra */}
                <div className="ashoka-chakra relative">
                  <div className="w-14 h-14 bg-gradient-to-b from-blue-900 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-10 h-10 border-4 border-white rounded-full flex items-center justify-center relative">
                      {/* Spokes */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-90"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-135"></div>
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                
                <div>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-xl md:text-2xl font-bold text-blue-900 tracking-tight">
                      आर्थयंत्र
                    </h1>
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      v2.1
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm">
                    <span className="text-gray-700 font-medium">Financial Management System</span>
                    <span className="hidden md:inline text-gray-400">•</span>
                    <span className="text-blue-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Ministry of Finance
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
                Home
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
                Features
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
                Resources
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
                Support
              </Link>
            </nav>
            
            <div className="hidden md:flex gap-3">
              <Link href="/Registration">
                <Button 
                  variant="outline" 
                  className="border-blue-700 text-blue-800 hover:bg-blue-50 font-medium text-sm transition-all hover:scale-105"
                >
                  Employee Registration
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 group">
                  Employee Login
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden px-4 py-3 border-t border-gray-200 bg-white animate-in slide-in-from-top">
              <div className="flex flex-col gap-3">
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 py-2">
                  Home
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 py-2">
                  Features
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 py-2">
                  Resources
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700 py-2">
                  Support
                </Link>
                <div className="flex gap-3 pt-2">
                  <Link href="/Registration" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </Link>
                  <Link href="/login" className="flex-1">
                    <Button className="w-full">Login</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Enhanced */}
      <section ref={heroRef} className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 overflow-hidden">
        {/* Hero Particles */}
        <div className="hero-particles absolute inset-0" />
        
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-3/4 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-8 h-8 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-10 right-10 w-6 h-6 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-semibold border border-white/20 shadow-lg">
              <ShieldCheck className="h-4 w-4" />
              Official Portal for Government Employees
              <Sparkles className="h-3 w-3 text-yellow-300 ml-1" />
            </div>
            
            <h1 className="hero-title">
              <div className="hindi-text text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                वित्तीय प्रबंधन{' '}
                <span className="text-saffron-300 b fsaffron-400 to-y">
                  सरल, सुरक्षित, संपूर्ण
                </span>
              </div>
              <div className="english-text text-xl sm:text-2xl md:text-3xl text-blue-100 font-light">
                {/* Text will be animated by GSAP */}
              </div>
            </h1>
            
            <p className="hero-description text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A comprehensive financial management platform exclusively for government employees. 
              Manage your salary, investments, taxes, and financial planning with government-grade security.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/Registration">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">Register Now</span>
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-lg px-8 py-6 border border-white/20 hover:border-white/40 transition-all duration-300 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Tutorial
              </Button>
            </div>
            
            {/* Live Stats */}
            <div className="pt-8 border-t border-white/10">
              <div className="inline-flex items-center gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Live Platform</span>
                </div>
                <span>•</span>
                <span>Last Login: 12,345 users</span>
                <span>•</span>
                <span>Active Now: 2,847 users</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Government Departments Section - Enhanced */}
      <section className="py-16 bg-gradient-to-b from-white via-blue-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-full mb-4">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">SERVING EMPLOYEES ACROSS</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Government <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Departments</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions for employees across all government sectors
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Education', icon: GraduationCap, color: 'from-blue-500 to-blue-600' },
              { name: 'Health', icon: Heart, color: 'from-red-500 to-red-600' },
              { name: 'Revenue', icon: Scale, color: 'from-green-500 to-green-600' },
              { name: 'Police', icon: Shield, color: 'from-blue-500 to-blue-600' },
              { name: 'Transport', icon: Truck, color: 'from-amber-500 to-amber-600' },
              { name: 'Defense', icon: Target, color: 'from-gray-500 to-gray-600' },
              { name: 'Finance', icon: Banknote, color: 'from-emerald-500 to-emerald-600' },
              { name: 'Rural Dev', icon: Home, color: 'from-orange-500 to-orange-600' },
              { name: 'Urban Dev', icon: Building2, color: 'from-purple-500 to-purple-600' },
              { name: 'Railways', icon: Train, color: 'from-red-500 to-red-600' },
              { name: 'Aviation', icon: Plane, color: 'from-sky-500 to-sky-600' },
              { name: 'Telecom', icon: Wifi, color: 'from-indigo-500 to-indigo-600' },
            ].map((dept, index) => (
              <div 
                key={dept.name}
                ref={el => { if (el) departmentRefs.current[index] = el }}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon with gradient */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-3 relative z-10 transform group-hover:scale-110 transition-transform duration-500`}>
                    <dept.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 relative z-10">
                    {dept.name}
                  </span>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-3/4 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">PLATFORM STATISTICS</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Serving <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Government Employees
              </span> Nationwide
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial management platform trusted by employees across 
              <span className="font-semibold text-blue-700"> 28+ government departments</span> with
              <span className="font-semibold text-green-700"> 94% satisfaction rate</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                label: "Registered Employees", 
                value: 125678, 
                icon: Users,
                description: "Active government employees",
                color: "from-blue-500 to-blue-600",
                trend: "+12% this year",
                suffix: ""
              },
              { 
                label: "Assets Managed", 
                value: 8456, 
                icon: IndianRupee,
                description: "Crores under guidance",
                color: "from-green-500 to-emerald-600",
                trend: "↑ ₹1,234 Cr growth",
                suffix: " Cr"
              },
              { 
                label: "Satisfaction Rate", 
                value: 94, 
                icon: Star,
                description: "Employee satisfaction score",
                color: "from-amber-500 to-yellow-600",
                trend: "Industry leading",
                suffix: "%"
              },
              { 
                label: "Departments", 
                value: 28, 
                icon: Building2,
                description: "Government departments",
                color: "from-purple-500 to-violet-600",
                trend: "Across all ministries",
                suffix: "+"
              },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                ref={el => { if (el) statsRef.current[index] = el }}
                className="group relative"
              >
                {/* Hover glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
                
                <Card className="relative bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                  {/* Animated border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                      backgroundSize: '20px 20px',
                      backgroundPosition: 'center'
                    }} />
                  </div>
                  
                  <CardContent className="p-8 relative z-10 flex flex-col flex-1 justify-between">
                    {/* Icon */}
                    <div className="stat-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:shadow-md transition-shadow">
                      <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-3`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Middle Section - Number and Progress */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-center mb-4">
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                          <span className="stat-number inline-block">0{stat.suffix}</span>
                        </div>
                        
                        {/* Progress bar for satisfaction */}
                        {index === 2 && (
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                            <div 
                              className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                              style={{ width: '0%' }}
                              ref={el => {
                                if (el) {
                                  ScrollTrigger.create({
                                    trigger: statsRef.current[index],
                                    start: "top 85%",
                                    onEnter: () => {
                                      gsap.to(el, {
                                        width: '94%',
                                        duration: 2,
                                        ease: "power2.out"
                                      })
                                    },
                                    once: true
                                  })
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Label and Description */}
                    <div className="text-center space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors">
                          {stat.label}
                        </h3>
                        <p className="text-sm text-gray-600">{stat.description}</p>
                      </div>
                      
                      {/* Trend indicator */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 group-hover:border-gray-300 transition-colors">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-gray-700">{stat.trend}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">COMPREHENSIVE SERVICES</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tailored <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Financial Solutions
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized features designed specifically for government employees' financial needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Salary Management",
                description: "Track monthly salary, allowances, deductions, and generate government salary slips",
                icon: CreditCard,
                color: "from-blue-500 to-blue-600",
                features: ["Salary breakdown", "Allowance tracking", "GPF/CPF tracking", "Pension planning"]
              },
              {
                title: "Tax Planning & Compliance",
                description: "Government-specific tax calculations, deductions, and ITR filing assistance",
                icon: FileCheck,
                color: "from-green-500 to-emerald-600",
                features: ["Section 80C optimization", "HRA calculations", "ITR form filling", "Tax saving tips"]
              },
              {
                title: "Investment Portfolio",
                description: "Track government-approved investments and market-linked schemes",
                icon: PieChart,
                color: "from-purple-500 to-violet-600",
                features: ["NPS tracking", "PPF monitoring", "Mutual funds", "Government bonds"]
              },
              {
                title: "Expense Management",
                description: "Categorize and analyze expenses with government-specific categories",
                icon: BarChart3,
                color: "from-amber-500 to-yellow-600",
                features: ["DA/TA tracking", "Official expense logs", "Personal budgeting", "Reports generation"]
              },
              {
                title: "Secure Document Vault",
                description: "Government-grade encrypted storage for all financial documents",
                icon: Shield,
                color: "from-red-500 to-red-600",
                features: ["Aadhaar/PAN storage", "Bank documents", "Investment proofs", "Tax documents"]
              },
              {
                title: "Retirement Planning",
                description: "Plan your post-retirement finances with government pension tools",
                icon: Target,
                color: "from-indigo-500 to-indigo-600",
                features: ["Pension calculator", "Gratuity estimation", "Commutation planning", "Annuity options"]
              },
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                ref={el => { if (el) cardRefs.current[index] = el }}
                className="bg-white border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                {/* Feature Header */}
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="feature-icon relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      {/* Icon glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    </div>
                    <CardTitle className="text-xl text-gray-900 group-hover:text-gray-950 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                {/* Feature List */}
                <CardContent>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li 
                        key={idx}
                        className="flex items-center gap-3 text-sm text-gray-700 group-hover:text-gray-800 transition-colors"
                      >
                        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className="h-3 w-3" style={{ color: `var(--color-${feature.color.split('-')[1]}-500)` }} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                {/* Hover effect background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-900/5 via-blue-800/5 to-blue-900/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-full mb-4">
              <SecurityShield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">GOVERNMENT-GRADE SECURITY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built with <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Highest Security Standards
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Certified security protocols ensuring complete protection of government employee data
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Military-Grade Encryption",
                description: "256-bit AES encryption compliant with government security standards",
                icon: Lock,
                certification: "CERT-In Certified"
              },
              {
                title: "RBI & SEBI Compliance",
                description: "Fully compliant with financial regulatory guidelines and audits",
                icon: ShieldCheck,
                certification: "RBI Approved"
              },
              {
                title: "Indian Data Sovereignty",
                description: "All data stored exclusively on secure Indian government servers",
                icon: Server,
                certification: "Data Localized"
              },
              {
                title: "Regular Security Audits",
                description: "Quarterly audits by CERT-In and government security agencies",
                icon: FileCheck,
                certification: "Audit Ready"
              },
            ].map((security, index) => (
              <div key={security.title} className="group">
                <Card className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 h-full">
                  <CardContent className="p-8 text-center">
                    {/* Icon with animation */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <security.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Certification badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 mb-4">
                      <span className="text-xs font-semibold text-blue-700">{security.certification}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-950 transition-colors">
                      {security.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {security.description}
                    </p>
                    
                    {/* Security level indicator */}
                    <div className="mt-6 flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-2 h-6 bg-gradient-to-t from-blue-500 to-blue-600 rounded-full group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            animation: 'pulse 2s infinite'
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-full mb-4">
              <Quote className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">EMPLOYEE TESTIMONIALS</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Government Employees
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from government employees who have transformed their financial management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Rajesh Kumar",
                department: "Education Department",
                role: "Assistant Professor",
                avatar: "RK",
                rating: 5,
                quote: "As a government employee with busy schedules, this platform has made financial management effortless. The tax planning features saved me ₹85,000 last year.",
                color: "from-blue-500 to-blue-600"
              },
              {
                name: "Dr. Priya Sharma",
                department: "Health Department",
                role: "Medical Officer",
                avatar: "PS",
                rating: 5,
                quote: "The investment tracking and retirement planning tools are exceptional. I can now plan my post-retirement finances with confidence.",
                color: "from-green-500 to-emerald-600"
              },
              {
                name: "Shri Amit Patel",
                department: "Revenue Department",
                role: "Tehsildar",
                avatar: "AP",
                rating: 4,
                quote: "Highly recommended for all government employees. The platform's security and ease of use make it stand out from other financial tools.",
                color: "from-purple-500 to-violet-600"
              },
            ].map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                ref={el => { if (el) testimonialRefs.current[index] = el }}
                className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-500 group"
              >
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
                  
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="h-12 w-12" style={{ color: `var(--color-${testimonial.color.split('-')[1]}-500)` }} />
                  </div>
                  
                  {/* Quote */}
                  <p className="text-gray-700 italic mb-8 relative z-10 group-hover:text-gray-800 transition-colors">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar with gradient */}
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-md`}>
                      <span className="text-white font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-gray-950 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm font-medium text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.department}</p>
                    </div>
                  </div>
                  
                  {/* Department badge */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-200">
                    <Building2 className="h-3 w-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700">{testimonial.department}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-semibold border border-white/20 mb-6">
              <Lightning className="h-4 w-4" />
              READY TO TRANSFORM YOUR FINANCIAL MANAGEMENT?
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join <span className="text-saffron-300">1,25,678+</span> Government Employees
            </h2>
            
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Start your journey towards better financial management today. 
              Secure, simple, and designed exclusively for government employees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/Registration">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                >
                  <span className="font-bold">Register Now</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 rounded-xl backdrop-blur-sm"
                >
                  <span className="font-bold">Employee Login</span>
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <div className="text-blue-200">Data Security</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-blue-200">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">₹0</div>
                  <div className="text-blue-200">Registration Fee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">Instant</div>
                  <div className="text-blue-200">Account Activation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border border-white rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white text-lg">आर्थयंत्र</div>
                  <div className="text-xs text-gray-400">Financial Management System</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Ministry of Finance, Government of India
              </p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">System Status: Operational</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Registration', 'Login', 'User Manual', 'Training Videos'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 group">
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Resources</h4>
              <ul className="space-y-3">
                {['Tax Guidelines', 'Investment Schemes', 'Pension Rules', 'FAQs', 'Download Forms'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 group">
                      <FileText className="h-3 w-3" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>Toll Free: 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>support@fms.gov.in</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} ArthYantra Financial Management System. 
                <br className="md:hidden" />
                Ministry of Finance, Government of India. All Rights Reserved.
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Accessibility', 'Sitemap'].map((item) => (
                  <Link key={item} href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="text-center text-xs text-gray-500">
                <p className="mb-3">
                  This is the official website of ArthYantra Financial Management System, 
                  Ministry of Finance, Government of India. 
                  Content on this website is published and managed by the Ministry of Finance.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    Visitors: 1,25,678
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Last Updated: {new Date().toLocaleDateString('en-IN')}
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" />
                    SSL Secured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Government Portal Footer */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blue-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
              <span>National Portal of India</span>
              <span className="hidden md:inline">|</span>
              <span>Government of India</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Content Owned by Ministry of Finance</span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-2">
                <Server className="h-3 w-3" />
                Designed & Developed by NIC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          size="icon"
          className="rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-xl"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowRight className="h-5 w-5 rotate-90" />
        </Button>
        
        <Link href="/Registration">
          <Button
            size="icon"
            className="rounded-full bg-saffron-500 hover:bg-saffron-600 text-white shadow-xl animate-pulse"
            style={{ animationDuration: '2s' }}
          >
            <User className="h-5 w-5" />
          </Button>
        </Link>
        
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-xl"
        >
          <Headphones className="h-5 w-5" />
        </Button>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        :root {
          --color-saffron-500: #F97316;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.5; transform: scaleY(0.8); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #1D4ED8);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563EB, #1E40AF);
        }
        
        /* Text gradient animation */
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

// Import useState
import { useState } from 'react'