"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, TrendingUp, Shield, BarChart3, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Financial Management System</span>
          </div>
          <Link href="/login">
            <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            For Government Employees & Financial Advisors
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Professional{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Financial Management
            </span>{" "}
            Platform
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Streamline your finances, track investments, manage expenses, and plan for the future with our integrated
            platform designed for government employees and financial professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Clients", value: "5,000+", icon: Users },
            { label: "Total AUM", value: "₹500Cr+", icon: TrendingUp },
            { label: "Financial Advisors", value: "50+", icon: Building2 },
            { label: "Avg. Returns", value: "12%+", icon: BarChart3 },
          ].map((stat) => (
            <Card key={stat.label} className="text-center bg-white/70 backdrop-blur-sm border-white/40">
              <CardContent className="pt-6">
                <stat.icon className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Every User</h2>
          <p className="text-lg text-gray-600">Tailored dashboards and tools for clients and advisors</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Client Portal",
              description:
                "Government employees can track salary, manage expenses, monitor investments, view tax calculations, manage insurance policies, and access financial reports.",
              icon: Users,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Admin Portal",
              description:
                "Financial advisors can manage client portfolios, perform data entry, generate reports, use AI assistant for insights, ensure compliance, and provide personalized financial guidance.",
              icon: Building2,
              color: "from-purple-500 to-pink-500",
            },
          ].map((stakeholder) => (
            <Card
              key={stakeholder.title}
              className="bg-white/70 backdrop-blur-sm border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-linear-to-r ${stakeholder.color} flex items-center justify-center mb-4`}
                >
                  <stakeholder.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{stakeholder.title}</CardTitle>
                <CardDescription className="text-gray-600">{stakeholder.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600">Everything you need to manage your finances efficiently</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Real-time Tracking",
              description: "Monitor investments, expenses, and portfolio performance in real-time",
              icon: TrendingUp,
            },
            {
              title: "Secure Access",
              description: "Role-based authentication with bank-grade encryption",
              icon: Shield,
            },
            {
              title: "Advanced Analytics",
              description: "Comprehensive financial reports and insights for better decisions",
              icon: BarChart3,
            },
            {
              title: "Multi-User Support",
              description: "Manage client and advisor workflows with customized dashboards",
              icon: Users,
            },
          ].map((feature) => (
            <Card key={feature.title} className="bg-white/70 backdrop-blur-sm border-white/40">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-linear-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands already managing their finances smarter</p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Sign In to Your Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Financial Management System</span>
            </div>
            <p className="text-sm text-gray-600">© 2025 Financial Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
