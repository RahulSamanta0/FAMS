"use client"

import { AdminLayout } from "@/components/admin-layout"

export default function AdminClientsPage() {
  return (
    <AdminLayout activeTab="Clients">
      <AdminClientManagement />
    </AdminLayout>
  )
}
