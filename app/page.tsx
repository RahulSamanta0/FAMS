"use client"

import { useState, useEffect } from 'react'
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
  Clock, Sparkles, TrendingUp as UpTrend, Check
} from "lucide-react"
import Link from "next/link"

export default function GovernmentLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDepartment, setActiveDepartment] = useState('All')

  // Announcements data
  const announcements = [
    "New Feature: Automated Tax Filing Assistance Now Available",
    "Security Update: Enhanced AES-256 Encryption Implemented",
    "Training: Join our webinar on Retirement Planning - 15th Dec, 3 PM",
    "Alert: Last date for ITR filing extension is 31st December",
    "Update: New GPF interest rates announced for Q4"
  ]

  // Stats data
  const stats = [
    { value: "1.25 Lakh+", label: "Active Employees", description: "Registered government employees", change: "+12% this year", icon: Users },
    { value: "₹8,456 Cr", label: "Assets Managed", description: "Total assets under management", change: "↑ ₹1,234 Cr growth", icon: IndianRupee },
    { value: "94%", label: "Satisfaction Rate", description: "Employee satisfaction score", change: "Industry leading", icon: Star },
    { value: "28+", label: "Departments", description: "Active government departments", change: "Across all ministries", icon: Building }
  ]

  // Features data
  const features = [
    {
      title: "Salary Management",
      description: "Track monthly salary, allowances, deductions, and generate government salary slips",
      icon: CreditCard,
      points: ["Salary breakdown", "Allowance tracking", "GPF/CPF tracking", "Pension planning"]
    },
    {
      title: "Tax Planning & Compliance",
      description: "Government-specific tax calculations, deductions, and ITR filing assistance",
      icon: FileCheck,
      points: ["Section 80C optimization", "HRA calculations", "ITR form filling", "Tax saving tips"]
    },
    {
      title: "Investment Portfolio",
      description: "Track government-approved investments and market-linked schemes",
      icon: PieChart,
      points: ["NPS tracking", "PPF monitoring", "Mutual funds", "Government bonds"]
    },
    {
      title: "Secure Document Vault",
      description: "Government-grade encrypted storage for all financial documents",
      icon: Shield,
      points: ["Aadhaar/PAN storage", "Bank documents", "Investment proofs", "Tax documents"]
    }
  ]

  // Security features
  const securityFeatures = [
    {
      title: "Military-Grade Encryption",
      description: "256-bit AES encryption compliant with government security standards",
      icon: Lock,
      badge: "CERT-In Certified"
    },
    {
      title: "RBI & SEBI Compliance",
      description: "Fully compliant with financial regulatory guidelines and audits",
      icon: CheckCircle,
      badge: "RBI Approved"
    },
    {
      title: "Indian Data Sovereignty",
      description: "All data stored exclusively on secure Indian government servers",
      icon: ShieldCheck,
      badge: "Data Localized"
    },
    {
      title: "Regular Security Audits",
      description: "Quarterly audits by CERT-In and government security agencies",
      icon: Award,
      badge: "Audit Ready"
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Assistant Professor",
      department: "Education Department",
      quote: "The tax planning features saved me ₹85,000 last year. Extremely helpful for government employees.",
      rating: 5
    },
    {
      name: "Dr. Priya Sharma",
      role: "Medical Officer",
      department: "Health Department",
      quote: "Investment tracking and retirement planning tools are exceptional. Planning post-retirement finances with confidence.",
      rating: 5
    },
    {
      name: "Shri Amit Patel",
      role: "Tehsildar",
      department: "Revenue Department",
      quote: "Highly recommended for all government employees. Security and ease of use make it stand out.",
      rating: 4
    }
  ]

  // Departments
  const departments = [
    { name: 'Education', icon: Building2, color: 'bg-blue-50 text-blue-700' },
    { name: 'Health', icon: Heart, color: 'bg-red-50 text-red-700' },
    { name: 'Revenue', icon: Scale, color: 'bg-green-50 text-green-700' },
    { name: 'Police', icon: Shield, color: 'bg-blue-50 text-blue-700' },
    { name: 'Defense', icon: Target, color: 'bg-gray-50 text-gray-700' },
    { name: 'Finance', icon: IndianRupee, color: 'bg-emerald-50 text-emerald-700' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                <Bell className="h-3 w-3" />
                <span className="font-medium">ANNOUNCEMENTS</span>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm">
                {announcements.slice(0, 2).map((announcement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>{announcement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm font-medium">
              <span className="hidden md:inline">Last Updated: {new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Arthayantra</h1>
                <p className="text-xs text-gray-600">Government Financial Portal</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Resources
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Support
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/Registration">
                <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                  Employee Registration
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Employee Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col gap-4">
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                  Home
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                  Features
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                  Resources
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                  Support
                </Link>
                <div className="flex gap-3 pt-2">
                  <Link href="/Registration" className="flex-1">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-700">
                      Register
                    </Button>
                  </Link>
                  <Link href="/login" className="flex-1">
                    <Button className="w-full bg-blue-600 text-white">Login</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 text-sm font-medium">
              <ShieldCheck className="h-4 w-4" />
              Official Portal for Government Employees
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Financial Management{' '}
              <span className="text-blue-600">Simplified</span> for{' '}
              <span className="text-blue-800">Government Employees</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A comprehensive financial management platform exclusively for government employees.
              Manage your salary, investments, taxes, and financial planning with government-grade security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/Registration">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-gray-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Live Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">Live Platform</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">12,345</span> users logged in today
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">2,847</span> active now
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs">
                  <UpTrend className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Financial Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized features designed specifically for government employees' financial needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {feature.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving Employees Across Departments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions for employees across all government sectors
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {departments.map((dept, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                  <div className={`w-12 h-12 rounded-lg ${dept.color.split(' ')[0]} flex items-center justify-center mx-auto mb-3`}>
                    <dept.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-semibold">GOVERNMENT-GRADE SECURITY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built with Highest Security Standards
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Certified security protocols ensuring complete protection of government employee data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((security, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <security.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-3">
                    {security.badge}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{security.title}</h3>
                  <p className="text-sm text-gray-600">{security.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Government Employees
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from government employees who have transformed their financial management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.department}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Simplify Your Financial Management?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of government employees who trust Arthayantra for their financial needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/Registration">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Register Now - It's Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No credit card required • Government employee verification required
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-6 h-6 border border-white rounded-full" />
                </div>
                <div>
                  <div className="font-bold">Arthayantra</div>
                  <div className="text-xs text-gray-400">Government Financial Portal</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Ministry of Finance, Government of India
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {['Home', 'Registration', 'Login', 'User Manual', 'Training'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {['Tax Guidelines', 'Investment Schemes', 'Pension Rules', 'FAQs', 'Forms'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Toll Free: 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@fms.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri: 9 AM - 6 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} ArthYantra. Ministry of Finance, Government of India.
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                {['Privacy', 'Terms', 'Disclaimer', 'Accessibility'].map((item) => (
                  <Link key={item} href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}