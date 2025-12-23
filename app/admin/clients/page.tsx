"use client"

import { AdminLayout } from "@/components/admin-layout"
import { AdminClientManagement } from "@/components/admin-client-management"

export default function AdminClientsPage() {
  return (
    <AdminLayout activeTab="Clients">
      <AdminClientManagement />
    </AdminLayout>
  )
}
