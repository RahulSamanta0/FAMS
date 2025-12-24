"use client";

import React, { useState, useEffect } from 'react';
import { 
  LifeBuoy, 
  Ticket, 
  MessageSquare, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronUp,
  Send,
  CheckCircle,
  Clock,
  X,
  AlertCircle,
  Search,
  Filter,
  Sparkles,
  Zap,
  Shield,
  Star,
  ArrowRight,
  MessageCircle,
  HeadphonesIcon,
  Globe
} from 'lucide-react';

// Mock data with enhanced structure
const supportTickets = [
  { 
    id: 'TKT-INV-081', 
    subject: 'Discrepancy in MSME financial data', 
    date: '2025-01-15', 
    status: 'In Progress',
    priority: 'High',
    category: 'Data Issue',
    lastUpdate: '2 hours ago'
  },
  { 
    id: 'TKT-INV-079', 
    subject: 'Digital signature for term sheet failed', 
    date: '2025-01-13', 
    status: 'Resolved',
    priority: 'Medium',
    category: 'Technical',
    lastUpdate: '1 day ago'
  },
  { 
    id: 'TKT-INV-075', 
    subject: 'Unable to access secure data room', 
    date: '2025-01-11', 
    status: 'Closed',
    priority: 'Low',
    category: 'Access',
    lastUpdate: '3 days ago'
  },
];

const faqs = [
  {
    question: "How is the MSME data verified on the platform?",
    answer: "MSME data is integrated from official sources like the Udyam Portal and state databases. Critical documents and credentials can also be verified via the Bengal Blockchain for enhanced security and immutability, ensuring a high degree of trust and integrity.",
    category: "Data & Security",
    popularity: 95,
    tags: ["verification", "blockchain", "security"]
  },
  {
    question: "What is the process for sharing confidential documents during due diligence?",
    answer: "The platform provides a secure document sharing feature. You can request access to an MSME's confidential documents, and they can grant granular permissions. All shared documents have their hash recorded on the blockchain to ensure they are tamper-proof.",
    category: "Security",
    popularity: 88,
    tags: ["documents", "due diligence", "permissions"]
  },
  {
    question: "How does the AI matchmaking algorithm work?",
    answer: "Our AI analyzes your defined Investment Thesis (sectors, stage, ticket size) and compares it against the profiles, business plans, and financial data of MSMEs on the platform. It then presents a curated list of the most relevant investment opportunities, significantly speeding up your discovery process.",
    category: "AI Features",
    popularity: 92,
    tags: ["AI", "matchmaking", "investment"]
  },
  {
    question: "Can I integrate my internal tools with the platform?",
    answer: "We offer comprehensive API access for seamless integration with your internal portfolio management or communication tools. Our RESTful APIs support real-time data synchronization, webhook notifications, and custom dashboard creation.",
    category: "Integration",
    popularity: 76,
    tags: ["API", "integration", "tools"]
  }
];

// Enhanced Components
const FloatingParticles = () => {
  // Generate random positions and animation values only on the client
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${10 + Math.random() * 20}s`
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration
          }}
        />
      ))}
    </div>
  );
};

const StatusBadge = ({ status, priority }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'In Progress':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/50',
          text: 'text-amber-700',
          icon: <Clock className="w-3 h-3" />,
          pulse: 'animate-pulse'
        };
      case 'Resolved':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200/50',
          text: 'text-emerald-700',
          icon: <CheckCircle className="w-3 h-3" />,
          pulse: ''
        };
      case 'Closed':
        return {
          bg: 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200/50',
          text: 'text-slate-600',
          icon: <X className="w-3 h-3" />,
          pulse: ''
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50',
          text: 'text-blue-700',
          icon: <AlertCircle className="w-3 h-3" />,
          pulse: ''
        };
    }
  };

  const config = getStatusConfig();
  
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${config.bg} ${config.text} ${config.pulse}`}>
        {config.icon}
        {status}
      </span>
      {priority && (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
          priority === 'High' ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200/50' :
          priority === 'Medium' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200/50' :
          'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200/50'
        }`}>
          {priority}
        </span>
      )}
    </div>
  );
};

const FaqItem = ({ faq, isOpen, onToggle, index }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
      <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        <button
          onClick={onToggle}
          className="w-full text-left p-6 flex justify-between items-start gap-4 hover:bg-white/50 transition-all duration-300"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="font-semibold text-slate-800 leading-tight">{faq.question}</h3>
            </div>
            <div className="flex items-center gap-3 ml-11">
              <span className="text-xs text-slate-500 bg-slate-100/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/50">
                {faq.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span className="text-xs text-slate-500">{faq.popularity}% helpful</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 mt-1">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="px-6 pb-6 text-slate-600 leading-relaxed">
            <div className="pt-4 border-t border-slate-200/50 ml-11">
              <p className="mb-4">{faq.answer}</p>
              <div className="flex flex-wrap gap-2">
                {faq.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs bg-blue-100/80 text-blue-700 px-2 py-1 rounded-md border border-blue-200/50">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, error, children, required = false, icon }) => (
  <div className="space-y-2">
    <label className="flex text-sm font-semibold text-slate-700 items-center gap-2">
      {icon && <div className="w-4 h-4 text-slate-500">{icon}</div>}
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {children}
      {error && (
        <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  </div>
);

const SupportPage = () => {
  const [newTicket, setNewTicket] = useState({ 
    category: 'Platform Issue', 
    subject: '', 
    description: '',
    priority: 'Medium'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['All', 'Data & Security', 'Security', 'AI Features', 'Integration'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!newTicket.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (newTicket.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!newTicket.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (newTicket.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setNewTicket({ category: 'Platform Issue', subject: '', description: '', priority: 'Medium' });
      setErrors({});
      
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      alert('❌ Failed to submit ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="min-h-screen relative overflow-hidden bg-[#F9FAFB]">
        <FloatingParticles />
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl animate-slide-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <div>
                <p className="font-semibold">Ticket Submitted Successfully!</p>
                <p className="text-sm opacity-90">We'll get back to you within 24 hours</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-100 via-purple-100 to-emerald-100/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 drop-shadow-lg">
                  Help & Support Center
                </h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>24/7 Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Avg. Response: 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 flex flex-col gap-8">
            {/* New Ticket Form */}
            <div className="relative group flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-emerald-400/20 rounded-3xl opacity-100 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-blue-200/40 p-8 hover:shadow-2xl transition-all duration-500">
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 drop-shadow-lg">Create Support Ticket</h2>
                  <p className="text-slate-700">Describe your issue and our AI will route it to the right expert</p>
                </div>

                <form onSubmit={handleTicketSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Category" required icon={<Filter className="w-4 h-4" />}>
                      <select 
                        name="category" 
                        value={newTicket.category} 
                        onChange={handleTicketChange}
                        className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm"
                      >
                        <option>Platform Issue</option>
                        <option>Deal Room Problem</option>
                        <option>Data Discrepancy</option>
                        <option>Billing Inquiry</option>
                        <option>Technical Inquiry</option>
                        <option>General Feedback</option>
                      </select>
                    </InputField>

                    <InputField label="Priority" required icon={<AlertCircle className="w-4 h-4" />}>
                      <select 
                        name="priority" 
                        value={newTicket.priority} 
                        onChange={handleTicketChange}
                        className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </InputField>
                  </div>

                  <InputField label="Subject" error={errors.subject} required icon={<MessageSquare className="w-4 h-4" />}>
                    <input 
                      type="text" 
                      name="subject" 
                      value={newTicket.subject} 
                      onChange={handleTicketChange}
                      className={`w-full p-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 shadow-sm ${
                        errors.subject 
                          ? 'border-red-300/50 focus:ring-red-500/50 focus:border-red-500/50' 
                          : 'border-slate-200/50 focus:ring-blue-500/50 focus:border-blue-500/50'
                      }`}
                      placeholder="Brief description of your issue"
                    />
                  </InputField>

                  <InputField label="Detailed Description" error={errors.description} required icon={<MessageCircle className="w-4 h-4" />}>
                    <textarea 
                      name="description" 
                      rows="6" 
                      value={newTicket.description} 
                      onChange={handleTicketChange}
                      className={`w-full p-4 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 resize-none shadow-sm ${
                        errors.description 
                          ? 'border-red-300/50 focus:ring-red-500/50 focus:border-red-500/50' 
                          : 'border-slate-200/50 focus:ring-blue-500/50 focus:border-blue-500/50'
                      }`}
                      placeholder="Please provide comprehensive details about your issue. Include steps to reproduce, error messages, screenshots, and any relevant context that will help us resolve your issue quickly."
                    />
                  </InputField>

                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Submit Ticket
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="relative group flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl opacity-100 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-indigo-200/40 p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 drop-shadow-lg">Knowledge Base</h2>
                  <p className="text-slate-700">Find instant answers to common questions</p>
                </div>

                {/* Enhanced Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search knowledge base..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-12 pr-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <FaqItem 
                        key={index} 
                        faq={faq} 
                        index={index}
                        isOpen={openFaq === index}
                        onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-10 h-10 text-slate-400" />
                      </div>
                      <p className="text-slate-500 text-lg">No articles found matching your search.</p>
                      <p className="text-slate-400 text-sm mt-1">Try adjusting your search terms or category filter.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            {/* My Support Tickets */}
            <div className="relative group flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-indigo-400/20 to-blue-400/20 rounded-3xl opacity-100 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-200/40 p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 drop-shadow-lg">My Tickets</h2>
                    <p className="text-sm text-slate-700">Track your support requests</p>
                  </div>
                  <div className="space-y-4">
                    {supportTickets.map(ticket => (
                      <div key={ticket.id} className="group relative bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-4 hover:bg-white/80 hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div>
                          <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1">
                            {ticket.subject}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="font-mono">{ticket.id}</span>
                            <span>•</span>
                            <span>{new Date(ticket.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{ticket.lastUpdate}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <StatusBadge status={ticket.status} priority={ticket.priority} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-6 p-3 bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200 hover:from-purple-300 hover:via-indigo-300 hover:to-blue-300 text-purple-700 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 shadow-md">
                  <Ticket className="w-4 h-4" />
                  View All Tickets
                </button>
              </div>
            </div>
            {/* Quick Support Channels */}
            <div className="relative group flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-amber-400/20 rounded-3xl opacity-100 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200/40 p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-amber-600 drop-shadow-lg">Quick Support</h2>
                    <p className="text-sm text-slate-700">Get immediate assistance</p>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full group relative p-4 bg-gradient-to-r from-green-600 via-emerald-600 to-amber-500 text-white rounded-2xl flex items-center justify-center gap-3 hover:from-green-700 hover:via-emerald-700 hover:to-amber-600 transition-all duration-300 font-extrabold shadow-xl hover:shadow-2xl hover:scale-105">
                      <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Start Live Chat</span>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </button>
                    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/50 rounded-2xl p-4 space-y-4 backdrop-blur-sm">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Phone className="w-3 h-3 text-white" />
                        </div>
                        Direct Contact
                      </h3>
                      <div className="space-y-3">
                        <a 
                          href="mailto:investor.support@msmeconnect.wb.gov" 
                          className="group flex items-center gap-3 text-sm text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-50"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Email Support</p>
                            <p className="text-xs text-slate-500">investor.support@msmeconnect.wb.gov</p>
                          </div>
                        </a>
                        <a 
                          href="tel:+9103312345678" 
                          className="group flex items-center gap-3 text-sm text-green-600 hover:text-green-700 transition-colors p-2 rounded-lg hover:bg-green-50"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Phone className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Phone Support</p>
                            <p className="text-xs text-slate-500">+91 033 1234 5678</p>
                          </div>
                        </a>
                      </div>
                      <div className="text-xs text-slate-500 pt-3 border-t border-slate-200/50 flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        <span>Available Mon-Fri, 9 AM - 6 PM IST</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <HeadphonesIcon className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold text-amber-800">Premium Support</span>
                      </div>
                      <p className="text-xs text-amber-700 mb-3">Get priority assistance with dedicated account management</p>
                      <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(120deg); }
            66% { transform: translateY(5px) rotate(240deg); }
          }
          
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .animate-float {
            animation: float linear infinite;
          }
          
          .animate-slide-in {
            animation: slide-in 0.5s ease-out;
          }
        `}</style>
    </div>
  );
};

export default SupportPage;