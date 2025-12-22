"use client"

interface UserData {
  role: string
  name: string
  id: string
  UserTypeID: number
  UserName: string
}

export function setUserData(userData: UserData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(userData))
  }
}

export function getUserData(): UserData | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("userData")
    return data ? JSON.parse(data) : null
  }
  return null
}

export function removeUserData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userData")
  }
}
