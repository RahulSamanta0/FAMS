"use client"

import { ClientLayout } from "@/components/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Bell } from "lucide-react"

/* ---------------- MOCK DATA ---------------- */

const taxDeadlines = [
  {
    title: "Advance Tax – Q2",
    dueDate: "15 September 2025",
    description: "Pay 45% of advance tax liability",
    status: "Upcoming",
  },
  {
    title: "Income Tax Return Filing",
    dueDate: "31 July 2025",
    description: "ITR filing for FY 2024–25",
    status: "Upcoming",
  },
]

const insuranceAndSipReminders = [
  {
    type: "Insurance",
    name: "HDFC ERGO Health Insurance",
    dueDate: "05 August 2025",
    amount: 12000,
  },
  {
    type: "SIP",
    name: "HDFC Balanced Advantage Fund",
    dueDate: "10 July 2025",
    amount: 5000,
  },
  {
    type: "SIP",
    name: "SBI Blue Chip Fund",
    dueDate: "15 July 2025",
    amount: 7000,
  },
]

/* ---------------- COMPONENT ---------------- */

export default function ClientReminders() {
  return (
    <ClientLayout activeTab="/client/reminders">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reminders</h1>
          <p className="text-muted-foreground">
            Stay on track with tax deadlines, insurance, and SIP payments
          </p>
        </div>

        {/* Tax Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tax Deadlines
            </CardTitle>
            <CardDescription>
              Important upcoming income tax due dates
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {taxDeadlines.map((tax, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {tax.title}
                    </TableCell>
                    <TableCell>{tax.description}</TableCell>
                    <TableCell>{tax.dueDate}</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-50 text-yellow-700">
                        {tax.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Insurance & SIP Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Insurance & SIP Reminders
            </CardTitle>
            <CardDescription>
              Upcoming insurance premiums and SIP deductions
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {insuranceAndSipReminders.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell className="text-right">
                      ₹{item.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Mark as Paid
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </ClientLayout>
  )
}
