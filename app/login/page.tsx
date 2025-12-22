"use client"
import { LoginPage } from "@/components/login-page"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  return (
    <LoginPage
      onBack={() => router.push("/")}
      onLogin={() => {
        // Login handled in the component
      }}
    />
  )
}
