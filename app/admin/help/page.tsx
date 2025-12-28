"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Video, 
  BookOpen,
  ChevronRight,
  ExternalLink,
  Download,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Shield,
  BarChart,
  Users,
  Settings,
  Globe,
  Bookmark,
  Star,
  ThumbsUp,
  Eye 
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- MOCK DATA ---------------- */

const faqCategories = [
  { id: "general", name: "General", icon: HelpCircle, count: 8 },
  { id: "clients", name: "Client Management", icon: Users, count: 12 },
  { id: "investments", name: "Investments", icon: BarChart, count: 10 },
  { id: "insurance", name: "Insurance", icon: Shield, count: 6 },
  { id: "tax", name: "Tax & Compliance", icon: FileText, count: 9 },
  { id: "settings", name: "System Settings", icon: Settings, count: 7 },
]

const faqs = [
  {
    id: 1,
    category: "general",
    question: "How do I reset my admin password?",
    answer: "You can reset your password by clicking on 'Forgot Password' on the login page. An email with reset instructions will be sent to your registered email address. For security reasons, password resets are only valid for 24 hours.",
    helpful: 42,
    tags: ["security", "login", "account"]
  },
  {
    id: 2,
    category: "clients",
    question: "How to approve a new client application?",
    answer: "Navigate to 'Pending Clients' from the sidebar. Review the client's submitted documents, verify KYC details, and click 'Approve Client'. You can also add review notes and request additional documents if needed.",
    helpful: 56,
    tags: ["onboarding", "approval", "clients"]
  },
  {
    id: 3,
    category: "investments",
    question: "How to view client investment portfolios?",
    answer: "Go to 'Client Fact Sheets' and select a client. Switch to the 'Investments' tab to see their complete portfolio, including mutual funds, stocks, FDs, and other investments with current values and returns.",
    helpful: 38,
    tags: ["portfolio", "investments", "reports"]
  },
  {
    id: 4,
    category: "tax",
    question: "How does the tax calculation work?",
    answer: "The system automatically calculates tax liability based on client's income, deductions, and selected tax regime. You can view tax calculations under the 'Tax' tab in client fact sheets. All calculations follow current IT department guidelines.",
    helpful: 29,
    tags: ["tax", "calculation", "compliance"]
  },
  {
    id: 5,
    category: "settings",
    question: "How to configure system notifications?",
    answer: "Go to 'Settings' > 'Notification Settings'. Here you can customize email alerts, push notifications, and reminders for various events like premium due dates, SIP payments, and tax deadlines.",
    helpful: 34,
    tags: ["notifications", "settings", "alerts"]
  },
  {
    id: 6,
    category: "insurance",
    question: "How to add new insurance policies for clients?",
    answer: "In the client fact sheet, go to the 'Insurance' tab and click 'Add New Policy'. Enter policy details including provider, sum assured, premium amount, and maturity date. The system will automatically track renewal dates.",
    helpful: 27,
    tags: ["insurance", "policies", "add"]
  },
  {
    id: 7,
    category: "general",
    question: "What are the system requirements?",
    answer: "The system works on modern browsers (Chrome 90+, Firefox 88+, Safari 14+). Minimum screen resolution: 1280x720. For optimal performance, ensure you have a stable internet connection with minimum 5 Mbps speed.",
    helpful: 18,
    tags: ["requirements", "browser", "performance"]
  },
  {
    id: 8,
    category: "clients",
    question: "How to export client reports?",
    answer: "You can export individual client reports from their fact sheet page using the 'Export Fact Sheet' button. For bulk exports, use the 'Export All' option in the client directory. Reports are available in CSV and PDF formats.",
    helpful: 45,
    tags: ["export", "reports", "data"]
  }
]

const videoTutorials = [
  {
    id: 1,
    title: "Client Onboarding Process",
    duration: "8:42",
    category: "Clients",
    views: "1.2K",
    thumbnail: "📋"
  },
  {
    id: 2,
    title: "Investment Portfolio Management",
    duration: "12:15",
    category: "Investments",
    views: "2.4K",
    thumbnail: "📊"
  },
  {
    id: 3,
    title: "Tax Filing & Compliance",
    duration: "15:30",
    category: "Tax",
    views: "3.1K",
    thumbnail: "📝"
  },
  {
    id: 4,
    title: "System Settings Guide",
    duration: "6:25",
    category: "Settings",
    views: "0.9K",
    thumbnail: "⚙️"
  },
  {
    id: 5,
    title: "White Money Conversion",
    duration: "10:10",
    category: "Compliance",
    views: "1.8K",
    thumbnail: "💰"
  },
  {
    id: 6,
    title: "Report Generation & Export",
    duration: "7:55",
    category: "Reports",
    views: "1.5K",
    thumbnail: "📈"
  }
]

const documentation = [
  {
    id: 1,
    title: "Admin Dashboard Guide",
    description: "Complete guide to navigating and using the admin dashboard",
    pages: 24,
    lastUpdated: "2024-12-01",
    icon: BookOpen
  },
  {
    id: 2,
    title: "Client Management Manual",
    description: "Detailed instructions for managing client profiles and approvals",
    pages: 32,
    lastUpdated: "2024-11-28",
    icon: Users
  },
  {
    id: 3,
    title: "Financial Reports Guide",
    description: "How to generate and interpret financial reports",
    pages: 18,
    lastUpdated: "2024-12-10",
    icon: BarChart
  },
  {
    id: 4,
    title: "Compliance & Tax Handbook",
    description: "Tax compliance guidelines and white money conversion",
    pages: 42,
    lastUpdated: "2024-11-15",
    icon: Shield
  },
  {
    id: 5,
    title: "System Integration Guide",
    description: "API documentation and third-party integrations",
    pages: 28,
    lastUpdated: "2024-12-05",
    icon: Settings
  },
  {
    id: 6,
    title: "Troubleshooting Manual",
    description: "Common issues and their solutions",
    pages: 16,
    lastUpdated: "2024-11-20",
    icon: HelpCircle
  }
]

const supportContacts = [
  {
    type: "Technical Support",
    contact: "+91 1800 123 4567",
    hours: "24/7",
    icon: Phone,
    description: "For technical issues and system errors"
  },
  {
    type: "Email Support",
    contact: "support@arthyantra.com",
    hours: "Mon-Sat, 9 AM - 6 PM",
    icon: Mail,
    description: "General queries and assistance"
  },
  {
    type: "Compliance Help",
    contact: "compliance@arthyantra.com",
    hours: "Mon-Fri, 10 AM - 5 PM",
    icon: Shield,
    description: "Tax and compliance related queries"
  },
  {
    type: "Training",
    contact: "training@arthyantra.com",
    hours: "By appointment",
    icon: Video,
    description: "System training and onboarding"
  }
]

/* ---------------- ANIMATION VARIANTS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    
    return matchesSearch && matchesCategory
  })

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketSubject || !ticketMessage) {
      alert("Please fill in all fields")
      return
    }
    
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      alert("Support ticket submitted successfully! We'll contact you within 24 hours.")
      setTicketSubject("")
      setTicketMessage("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleDownloadGuide = () => {
    alert("Downloading complete user guide...")
  }

  return (
    <AdminLayout activeTab="/admin/help">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-7xl mx-auto pb-10 px-4 md:px-0"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Help & Support</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Get assistance, browse documentation, and contact support
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownloadGuide}
              variant="outline"
              className="border-slate-200 dark:border-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              Live Chat
            </Button>
          </div>
        </motion.div>

        {/* QUICK HELP CARDS */}
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
          
          {/* Quick Support Card */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">🆘</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Quick Support</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <HelpCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white mb-2 drop-shadow-lg">24/7 Available</div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Call: 1800 123 4567
                </span>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/40">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documentation Card */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">📚</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Documentation</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {documentation.length} Guides
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Complete user manuals
                </span>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/40">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Browse Docs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tutorials Card */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-violet-500 via-purple-600 to-violet-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">🎬</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">Video Tutorials</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <Video className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {videoTutorials.length}+ Videos
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Step-by-step guides
                </span>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/40">
                  <Video className="h-4 w-4 mr-2" />
                  Watch Tutorials
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Card */}
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-500 via-orange-600 to-amber-600 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 group-hover:opacity-20 transition-all duration-700 overflow-hidden">
              <div className="absolute -right-6 -top-6 text-[12rem] leading-none">❓</div>
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wider">FAQs</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {faqs.length} Answers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/90">
                  Common questions solved
                </span>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/40">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Browse FAQs
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* MAIN CONTENT TABS */}
        <Tabs defaultValue="faqs" className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-6">
            <TabsTrigger value="faqs" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="documentation" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Video className="h-4 w-4 mr-2" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </TabsTrigger>
          </TabsList>

          {/* FAQS TAB */}
          <TabsContent value="faqs" className="space-y-6">
            {/* Search and Filter */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="relative w-full md:w-96">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="search"
                        placeholder="Search FAQs..."
                        className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={activeCategory === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory("all")}
                      >
                        All Questions
                      </Button>
                      {faqCategories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={activeCategory === cat.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveCategory(cat.id)}
                        >
                          <cat.icon className="h-3 w-3 mr-2" />
                          {cat.name} ({cat.count})
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Categories */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {faqCategories.map((cat) => (
                  <Card 
                    key={cat.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-lg border-2",
                      activeCategory === cat.id 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" 
                        : "border-slate-100 dark:border-slate-800"
                    )}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className={cn(
                        "p-3 rounded-lg mb-3",
                        activeCategory === cat.id 
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      )}>
                        <cat.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{cat.count} questions</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* FAQ List */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-100/50 dark:border-slate-800">
                  <CardTitle className="text-2xl text-blue-900 dark:text-white">
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription className="text-blue-600/80 dark:text-slate-400">
                    {filteredFaqs.length} questions found
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant="outline" className={
                                faq.category === "general" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                faq.category === "clients" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                                faq.category === "investments" ? "bg-amber-50 text-amber-600 border-amber-200" :
                                "bg-violet-50 text-violet-600 border-violet-200"
                              }>
                                {faqCategories.find(cat => cat.id === faq.category)?.name || faq.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-slate-500">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{faq.helpful} found this helpful</span>
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                              {faq.question}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                              {faq.answer}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-4">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* DOCUMENTATION TAB */}
          <TabsContent value="documentation" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-900 dark:to-emerald-900/10 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-100/50 dark:border-slate-800">
                  <CardTitle className="text-2xl text-emerald-900 dark:text-white">
                    User Documentation
                  </CardTitle>
                  <CardDescription className="text-emerald-600/80 dark:text-slate-400">
                    Complete guides and manuals for all features
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documentation.map((doc) => {
                      const Icon = doc.icon
                      return (
                        <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <Badge variant="outline" className="bg-slate-50 text-slate-600 dark:bg-slate-800">
                                {doc.pages} pages
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
                              {doc.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                              {doc.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500">
                                Updated: {doc.lastUpdated}
                              </span>
                              <Button variant="ghost" size="sm" className="group-hover:bg-emerald-50 group-hover:text-emerald-600">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* TUTORIALS TAB */}
          <TabsContent value="tutorials" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-violet-50/30 dark:from-slate-900 dark:to-violet-900/10 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-100/50 dark:border-slate-800">
                  <CardTitle className="text-2xl text-violet-900 dark:text-white">
                    Video Tutorials
                  </CardTitle>
                  <CardDescription className="text-violet-600/80 dark:text-slate-400">
                    Step-by-step video guides for all features
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoTutorials.map((video) => (
                      <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                        <div className="relative aspect-video bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-6xl">
                          {video.thumbnail}
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-900/20">
                              {video.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                              <Eye className="h-3 w-3" />
                              <span>{video.views}</span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                            {video.title}
                          </h3>
                          <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white">
                            <Video className="h-4 w-4 mr-2" />
                            Watch Tutorial
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* CONTACT SUPPORT TAB */}
          <TabsContent value="contact" className="space-y-6">
            <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10 backdrop-blur-sm h-full">
                  <CardHeader className="border-b border-slate-100/50 dark:border-slate-800">
                    <CardTitle className="text-2xl text-blue-900 dark:text-white">
                      Contact Support
                    </CardTitle>
                    <CardDescription className="text-blue-600/80 dark:text-slate-400">
                      Get in touch with our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmitTicket} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                            Subject
                          </label>
                          <Input
                            placeholder="What do you need help with?"
                            value={ticketSubject}
                            onChange={(e) => setTicketSubject(e.target.value)}
                            className="bg-white dark:bg-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                            Describe your issue
                          </label>
                          <Textarea
                            placeholder="Please provide as much detail as possible..."
                            className="min-h-[200px] bg-white dark:bg-slate-800"
                            value={ticketMessage}
                            onChange={(e) => setTicketMessage(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                            Priority
                          </label>
                          <div className="flex gap-3">
                            <Button type="button" variant="outline" className="flex-1">
                              Low
                            </Button>
                            <Button type="button" variant="outline" className="flex-1 border-amber-200 text-amber-600">
                              Medium
                            </Button>
                            <Button type="button" variant="outline" className="flex-1 border-red-200 text-red-600">
                              High
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            Submit Support Ticket
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Support Contacts */}
              <div>
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-900/10 backdrop-blur-sm h-full">
                  <CardHeader className="border-b border-slate-100/50 dark:border-slate-800">
                    <CardTitle className="text-xl text-slate-900 dark:text-white">
                      Support Channels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {supportContacts.map((contact, idx) => {
                        const Icon = contact.icon
                        return (
                          <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                  {contact.type}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                  {contact.description}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                  <span className="font-medium text-blue-600 dark:text-blue-400">
                                    {contact.contact}
                                  </span>
                                  <Badge variant="outline" className="bg-slate-50 text-slate-600 dark:bg-slate-800">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {contact.hours}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  )
}