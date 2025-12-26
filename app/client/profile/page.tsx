"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ClientLayout } from "@/components/client-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Briefcase,
  Users,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  BadgeCheck,
  Building2,
  Wallet,
  Heart,
  Baby,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- RESPONSIVE DETAIL ITEM ---------------- */
function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      className="
        group flex items-start gap-4 p-4 rounded-2xl border shadow-sm transition-all duration-300
        bg-white border-slate-100 hover:border-blue-200 hover:shadow-md
        dark:bg-[#0f172a] dark:border-blue-900/50 dark:hover:border-blue-700 dark:hover:shadow-blue-900/20
      "
    >
      <div className="
        p-3 rounded-xl transition-colors
        bg-blue-50 text-blue-600
        group-hover:bg-blue-100
        dark:bg-blue-900/20 dark:text-blue-400 dark:group-hover:bg-blue-900/40
      ">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="font-semibold mt-0.5 text-slate-900 dark:text-slate-100">
          {value}
        </p>
      </div>
    </motion.div>
  )
}

/* ---------------- ANIMATION VARIANTS ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ClientProfile() {
  const [activeTab, setActiveTab] = useState("personal")
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
    personal: false,
    employment: false,
    family: false,
  })

  const toggleEdit = (section: string, state: boolean) => {
    setEditMode((prev) => ({ ...prev, [section]: state }))
  }

  return (
    <ClientLayout activeTab="/client/profile">
      <div className="space-y-8 pb-10 max-w-5xl mx-auto px-4 md:px-0">
        
        {/* ================= HEADER BANNER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          {/* Background Glow (Dark Mode Compatible) */}
          <div className="absolute inset-0 rounded-3xl opacity-20 bg-gradient-to-r from-blue-400 to-indigo-500 blur-xl dark:opacity-40 dark:from-blue-900 dark:to-indigo-900" />
          
          <div className="
            relative overflow-hidden rounded-3xl border shadow-lg
            bg-white border-blue-100
            dark:bg-[#0b1120] dark:border-blue-900
          ">
            {/* Top Blue Bar */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900" />
            
            <div className="px-6 pb-8 md:px-8">
              <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-12 gap-6 text-center md:text-left">
                
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full scale-110 shadow-sm bg-white dark:bg-[#0b1120]" />
                  <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 shadow-xl border-white bg-white dark:border-[#0b1120] dark:bg-[#0b1120]">
                    <AvatarImage src="/path-to-image.jpg" />
                    <AvatarFallback className="text-3xl md:text-4xl font-bold text-white bg-blue-600 dark:bg-blue-700">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  {/* Status Indicator */}
                  <div className="absolute bottom-2 right-2 h-5 w-5 md:h-6 md:w-6 rounded-full border-4 bg-green-500 border-white dark:border-[#0b1120]" />
                </div>

                {/* Name & ID */}
                <div className="flex-1 mb-2 space-y-2 md:space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    John Doe
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm">
                    <Badge variant="secondary" className="
                      px-3 py-1 rounded-full border
                      bg-blue-50 text-blue-700 border-blue-100
                      dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900
                    ">
                      <Building2 className="mr-1.5 h-3.5 w-3.5" />
                      Finance Dept
                    </Badge>
                    <span className="flex items-center text-slate-600 dark:text-slate-400">
                      <BadgeCheck className="mr-1.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Verified Officer
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-2 w-full md:w-auto justify-center md:justify-end">
                  <Button variant="outline" className="
                    rounded-full border-blue-200 text-blue-700 
                    hover:bg-blue-50 hover:text-blue-800
                    dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-200
                  ">
                    View ID
                  </Button>
                  <Button className="
                    rounded-full shadow-lg shadow-blue-200 dark:shadow-blue-900/20
                    bg-blue-600 hover:bg-blue-700 border-0
                    dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white
                  ">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= TABS ================= */}
        <Tabs
          defaultValue="personal"
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Scrollable Tabs Container for Mobile */}
          <div className="flex justify-center w-full overflow-x-auto pb-2 md:pb-0">
            <TabsList className="
              h-auto p-1.5 rounded-full border shadow-sm gap-2 inline-flex
              bg-white border-blue-100
              dark:bg-[#0f172a] dark:border-blue-900
            ">
              {[
                { value: "personal", label: "Personal", icon: User },
                { value: "employment", label: "Employment", icon: Briefcase },
                { value: "family", label: "Family", icon: Users },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="
                    px-4 md:px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300
                    text-slate-600 dark:text-slate-400
                    data-[state=active]:bg-blue-600 
                    data-[state=active]:text-white 
                    data-[state=active]:shadow-md
                  "
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            {/* ---------------- PERSONAL TAB ---------------- */}
            <TabsContent value="personal" className="mt-0 focus-visible:ring-0">
              <ProfileSection
                title="Personal Information"
                description="Manage your personal details and contact information."
                isEditing={editMode.personal}
                onEdit={() => toggleEdit("personal", true)}
                onSave={() => toggleEdit("personal", false)}
              >
                {!editMode.personal ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <DetailItem icon={User} label="Full Name" value="John Doe" />
                    <DetailItem icon={Calendar} label="Date of Birth" value="15 June 1985" />
                    <DetailItem icon={Mail} label="Email Address" value="john.doe@gov.in" />
                    <DetailItem icon={Phone} label="Phone Number" value="+91 98765 43210" />
                    <DetailItem icon={CreditCard} label="PAN Number" value="ABCDE1234F" />
                    <DetailItem icon={MapPin} label="Address" value="123, Govt Colony, New Delhi" />
                  </motion.div>
                ) : (
                  <EditForm fields={["First Name", "Last Name", "Email", "Phone", "DOB", "Address"]} />
                )}
              </ProfileSection>
            </TabsContent>

            {/* ---------------- EMPLOYMENT TAB ---------------- */}
            <TabsContent value="employment" className="mt-0 focus-visible:ring-0">
              <ProfileSection
                title="Employment Record"
                description="Official employment status and salary details."
                isEditing={editMode.employment}
                onEdit={() => toggleEdit("employment", true)}
                onSave={() => toggleEdit("employment", false)}
              >
                {!editMode.employment ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <DetailItem icon={BadgeCheck} label="Employee ID" value="EMP-2024-1234" />
                    <DetailItem icon={Briefcase} label="Designation" value="Senior Officer" />
                    <DetailItem icon={Building2} label="Department" value="Finance Department" />
                    <DetailItem icon={Calendar} label="Date of Joining" value="01 April 2015" />
                    <DetailItem icon={Wallet} label="Basic Salary" value="₹45,000" />
                    <DetailItem icon={CreditCard} label="Pay Scale" value="Grade A - Level 10" />
                  </motion.div>
                ) : (
                   <EditForm fields={["Designation", "Department", "Office Location"]} />
                )}
              </ProfileSection>
            </TabsContent>

            {/* ---------------- FAMILY TAB ---------------- */}
            <TabsContent value="family" className="mt-0 focus-visible:ring-0">
              <ProfileSection
                title="Family Details"
                description="Declared family members and dependents."
                isEditing={editMode.family}
                onEdit={() => toggleEdit("family", true)}
                onSave={() => toggleEdit("family", false)}
              >
                {!editMode.family ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <DetailItem icon={Heart} label="Spouse Name" value="Jane Doe" />
                    <DetailItem icon={Calendar} label="Spouse DOB" value="20 Aug 1987" />
                    <DetailItem icon={Baby} label="Child Name" value="Emily Doe" />
                    <DetailItem icon={Calendar} label="Child DOB" value="10 Mar 2015" />
                  </motion.div>
                ) : (
                   <EditForm fields={["Spouse Name", "Spouse DOB", "Child Name", "Child DOB"]} />
                )}
              </ProfileSection>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </ClientLayout>
  )
}

/* ---------------- HELPER COMPONENTS ---------------- */

function ProfileSection({
  title,
  description,
  children,
  isEditing,
  onEdit,
  onSave,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Card Container 
         Light: White bg, blue-100 border
         Dark: Slate-950 bg, blue-900 border
      */}
      <Card className="
        overflow-hidden border shadow-sm transition-all hover:shadow-md
        bg-white border-blue-100 hover:border-blue-200
        dark:bg-[#0b1120] dark:border-blue-900 dark:hover:border-blue-800
      ">
        <CardHeader className="
          flex flex-row items-center justify-between pb-6 border-b
          bg-blue-50/30 border-blue-50
          dark:bg-blue-950/20 dark:border-blue-900/50
        ">
          <div className="space-y-1">
            <CardTitle className="text-xl text-slate-800 dark:text-slate-100">
              {title}
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              {description}
            </CardDescription>
          </div>
          {!isEditing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onEdit} 
              className="
                text-blue-600 hover:text-blue-700 hover:bg-blue-50
                dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/40
              "
            >
              Edit Details
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-6 bg-white/50 backdrop-blur-sm dark:bg-transparent">
          {children}
          
          {isEditing && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }} 
               animate={{ opacity: 1, y: 0 }}
               className="flex gap-3 mt-6 pt-6 border-t border-dashed border-blue-100 dark:border-blue-900/50"
             >
                <Button onClick={onSave} className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onSave} 
                  className="
                    border-blue-200 text-blue-700 hover:bg-blue-50
                    dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/50
                  "
                >
                  Cancel
                </Button>
             </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EditForm({ fields }: { fields: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field} className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {field}
          </label>
          <Input 
            placeholder={`Enter ${field}`} 
            className="
              bg-white border-blue-100 focus-visible:ring-blue-500
              dark:bg-slate-900 dark:border-blue-900 dark:text-slate-100 dark:focus-visible:ring-blue-400
            " 
          />
        </div>
      ))}
    </div>
  )
}