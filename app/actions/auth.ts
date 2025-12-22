"use server"

import CryptoJS from "crypto-js"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/['"]/g, "") || "https://financial-api.vercel.app"
const SECRET_KEY = process.env.ENCRYPTION_KEY || "default-secret-key-change-in-production"

function encryptAES(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
}

export async function loginUser(username: string, password: string) {
  try {
    const encryptedPassword = encryptAES(password)
    const loginData = { username, password: encryptedPassword }

    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })

    // Map backend role names to frontend role IDs
    const backendUser = response.data.user
    const backendRoleName = backendUser?.role

    const roleNameMapping: { [key: string]: string } = {
      Client: "client",
      Admin: "admin",
      "Government Employee": "client",
      "Financial Advisor": "admin",
    }

    const roles = [
      { id: "client", userTypeID: 1 },
      { id: "admin", userTypeID: 2 },
    ]

    const userRole = roleNameMapping[backendRoleName] || "client"
    const roleData = roles.find((r) => r.id === userRole)
    const userTypeID = roleData?.userTypeID || 1

    const userData = {
      role: userRole,
      name: backendUser?.username || "User",
      id: backendUser?.id || "USER001",
      UserTypeID: userTypeID,
      UserName: backendUser?.username || "User",
    }

    return {
      success: true,
      userData,
    }
  } catch (error) {
    let errorMessage: string
    
    if (axios.isAxiosError(error)) {
      // Try to extract message from various possible locations
      const data = error.response?.data
      if (typeof data === "string") {
        errorMessage = data
      } else if (data && typeof data === "object") {
        errorMessage = data.message || data.error || error.message
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === "string") {
      errorMessage = error
    } else {
      errorMessage = "Invalid credentials. Please try again."
    }

    return {
      success: false,
      error: String(errorMessage),
    }
  }
}
