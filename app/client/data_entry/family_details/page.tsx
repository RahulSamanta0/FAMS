"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ClientLayout } from "@/components/client-layout"
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

interface FamilyMember {
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
}

export default function FamilyDetailsPage() {
  const [showForm, setShowForm] = useState(false)
  const [familyList, setFamilyList] = useState<FamilyMember[]>([])

  const [member, setMember] = useState<FamilyMember>({
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
  })

  const handleChange = (field: keyof FamilyMember, value: string) => {
    setMember({ ...member, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFamilyList([...familyList, member])
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
    })
    setShowForm(false)
  }

  return (
    <ClientLayout activeTab="/client/data_entry/family_details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Family Details
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage your family member information
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            + Add Member
          </Button>
        </div>

        {/* Add Family Member Form (Conditional) */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Family Member</CardTitle>
              <CardDescription>
                Enter the details of your family member
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={member.fullName}
                      onChange={(e) =>
                        handleChange("fullName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Select
                      onValueChange={(v) =>
                        handleChange("relationship", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Self">Self</SelectItem>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={member.dob}
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      onValueChange={(v) => handleChange("gender", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Marital Status</Label>
                    <Select
                      onValueChange={(v) =>
                        handleChange("maritalStatus", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Occupation</Label>
                    <Input
                      value={member.occupation}
                      onChange={(e) =>
                        handleChange("occupation", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Annual Income</Label>
                    <Input
                      type="number"
                      value={member.annualIncome}
                      onChange={(e) =>
                        handleChange("annualIncome", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={member.phone}
                      onChange={(e) =>
                        handleChange("phone", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={member.email}
                      onChange={(e) =>
                        handleChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>ID Proof Type</Label>
                    <Select
                      onValueChange={(v) =>
                        handleChange("idProofType", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID proof" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PAN">PAN</SelectItem>
                        <SelectItem value="Aadhaar">Aadhaar</SelectItem>
                        <SelectItem value="Passport">Passport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-blue-600">
                    Save Member
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Family Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Family Members</CardTitle>
            <CardDescription>Added family members</CardDescription>
          </CardHeader>

          <CardContent>
            {familyList.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                No family members added yet
              </p>
            ) : (
              <div className="space-y-4">
                {familyList.map((m, index) => (
                  <div
                    key={index}
                    className="flex justify-between border rounded-md p-4"
                  >
                    <div>
                      <p className="font-semibold">{m.fullName}</p>
                      <p className="text-sm text-slate-500">
                        {m.relationship} • {m.gender}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500">{m.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}
