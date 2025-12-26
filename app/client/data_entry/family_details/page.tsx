"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  User,
  Heart,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  Users,
  Plus,
  X,
  Trash2,
  FileText,
  CreditCard,
  Hash, // Icon for Number
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- INTERFACES ---------------- */

interface FamilyMember {
  id: string
  fullName: string
  relationship: string
  dob: string
  gender: string
  maritalStatus: string
  occupation: string
  annualIncome: string
  phone: string
  email: string
  idProofType: string
  idProofNumber: string // <--- NEW FIELD
}

export default function FamilyDetailsPage() {
  const [showForm, setShowForm] = useState(false)
  const [familyList, setFamilyList] = useState<FamilyMember[]>([])
  const [loading, setLoading] = useState(true)

  // 1. LOAD DATA ON MOUNT
  useEffect(() => {
    const savedData = localStorage.getItem("family_details_data")
    if (savedData) {
      setFamilyList(JSON.parse(savedData))
    }
    setLoading(false)
  }, [])

  // 2. SAVE DATA HELPER
  const updateLocalStorage = (updatedList: FamilyMember[]) => {
    localStorage.setItem("family_details_data", JSON.stringify(updatedList))
    setFamilyList(updatedList)
  }

  const [member, setMember] = useState<Omit<FamilyMember, "id">>({
    fullName: "",
    relationship: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    annualIncome: "",
    phone: "",
    email: "",
    idProofType: "",
    idProofNumber: "", // <--- NEW STATE
  })

  const handleChange = (field: keyof Omit<FamilyMember, "id">, value: string) => {
    setMember({ ...member, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMember = { ...member, id: Date.now().toString() }
    const updatedList = [...familyList, newMember]
    updateLocalStorage(updatedList)
    
    // Reset Form
    setMember({
      fullName: "",
      relationship: "",
      dob: "",
      gender: "",
      maritalStatus: "",
      occupation: "",
      annualIncome: "",
      phone: "",
      email: "",
      idProofType: "",
      idProofNumber: "",
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    const updatedList = familyList.filter(m => m.id !== id)
    updateLocalStorage(updatedList)
  }

  if (loading) return null

  return (
    <ClientLayout activeTab="/client/data_entry/family_details">
      <div className="space-y-8 max-w-6xl mx-auto pb-10 px-4 md:px-0">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Family Details
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your family members and dependents information.
            </p>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className={cn(
              "shadow-lg transition-all duration-300",
              showForm 
                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400" 
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
            )}
          >
            {showForm ? (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel Adding
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add New Member
              </>
            )}
          </Button>
        </motion.div>

        {/* ================= ADD FORM ================= */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Card className="border-blue-100 shadow-md bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-950 dark:to-slate-900 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <User className="h-5 w-5" />
                    New Member Details
                  </CardTitle>
                  <CardDescription>
                    Please provide accurate information for verification purposes.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input 
                          placeholder="John Doe"
                          value={member.fullName}
                          onChange={(e) => handleChange("fullName", e.target.value)}
                          required 
                          className="bg-white dark:bg-slate-900"
                        />
                      </div>

                      {/* Relationship */}
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Select onValueChange={(v) => handleChange("relationship", v)}>
                          <SelectTrigger className="bg-white dark:bg-slate-900">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Child">Child</SelectItem>
                            <SelectItem value="Parent">Parent</SelectItem>
                            <SelectItem value="Sibling">Sibling</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* DOB */}
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input 
                          type="date" 
                          value={member.dob}
                          onChange={(e) => handleChange("dob", e.target.value)}
                          className="bg-white dark:bg-slate-900"
                        />
                      </div>

                      {/* Gender */}
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select onValueChange={(v) => handleChange("gender", v)}>
                          <SelectTrigger className="bg-white dark:bg-slate-900">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Occupation */}
                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <Input 
                          placeholder="e.g. Engineer"
                          value={member.occupation}
                          onChange={(e) => handleChange("occupation", e.target.value)}
                          className="bg-white dark:bg-slate-900"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input 
                          placeholder="+91..."
                          value={member.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className="bg-white dark:bg-slate-900"
                        />
                      </div>

                       {/* Email */}
                       <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                          type="email"
                          placeholder="member@example.com"
                          value={member.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="bg-white dark:bg-slate-900"
                        />
                      </div>

                      {/* ID Proof Type */}
                      <div className="space-y-2">
                        <Label>ID Proof Type</Label>
                        <Select onValueChange={(v) => handleChange("idProofType", v)}>
                          <SelectTrigger className="bg-white dark:bg-slate-900">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aadhaar">Aadhaar Card</SelectItem>
                            <SelectItem value="PAN">PAN Card</SelectItem>
                            <SelectItem value="Passport">Passport</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* ID Proof Number (NEW) */}
                      <div className="space-y-2">
                        <Label>ID Proof Number</Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input 
                            placeholder="e.g. ABCD1234E"
                            value={member.idProofNumber}
                            onChange={(e) => handleChange("idProofNumber", e.target.value)}
                            className="pl-9 bg-white dark:bg-slate-900 uppercase"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Member</Button>
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= DATA TABLE VIEW ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {familyList.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 dark:border-slate-800">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <Users className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                No Family Members Added
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 mb-6">
                Add your spouse, children, or parents to complete your profile verification.
              </p>
              <Button onClick={() => setShowForm(true)} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Add First Member
              </Button>
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#0f172a] overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="w-[250px] font-semibold text-slate-700 dark:text-slate-200">Name & Relation</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Personal Info</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Contact</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">Occupation</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-200">ID Details</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {familyList.map((m) => (
                    <TableRow key={m.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                      
                      {/* Name & Relation */}
                      <TableCell className="align-top py-4">
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2 rounded-full mt-1", 
                            m.gender === "Female" ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-blue-500"
                          )}>
                            {m.gender === "Female" ? <Heart className="h-4 w-4" /> : <User className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{m.fullName}</p>
                            <Badge variant="secondary" className="mt-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-none">
                              {m.relationship}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>

                      {/* Personal Info */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>{m.dob || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">Gender:</span>
                            <span>{m.gender}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact Info */}
                      <TableCell className="align-top py-4">
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-slate-400" />
                            <span>{m.phone || "-"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                            <span className="truncate max-w-[150px]">{m.email || "-"}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Occupation */}
                      <TableCell className="align-top py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <Briefcase className="h-4 w-4 text-slate-400" />
                          <span>{m.occupation || "Unemployed"}</span>
                        </div>
                      </TableCell>

                       {/* ID Details (Type & Number) */}
                       <TableCell className="align-top py-4">
                        <div className="space-y-1.5">
                          {m.idProofType ? (
                            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
                              {m.idProofType}
                            </Badge>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
                          
                          {m.idProofNumber && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                              <CreditCard className="h-3 w-3" />
                              {m.idProofNumber}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="align-top py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(m.id)}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>
    </ClientLayout>
  )
}