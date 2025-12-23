"use client"

import { useEffect, useState } from "react"

import { ClientLayout } from "@/components/client-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  HelpCircle,
  Send,
  MessageCircle,
  User,
  Headphones,
  Paperclip,
  Bot,
  CircleDot,
  PhoneCall,
  Timer,
} from "lucide-react"

/* ---------------- MOCK DATA ---------------- */

const SLA_MINUTES = 15

const tickets = [
  {
    id: "TCK-2001",
    subject: "Tax filing issue",
    createdAt: Date.now() - 5 * 60 * 1000,
    status: "Open",
  },
]

const GPT_FALLBACK_RESPONSES = [
  "I can help with this. Could you please share more details?",
  "This looks related to your account. Let me guide you.",
  "I’m checking this for you. Please hold on.",
]

/* ---------------- COMPONENT ---------------- */

export default function ClientHelpSupport() {
  /* Ticket Form */
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  /* Agent + Chat */
  const [agentOnline] = useState(true)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [chatInput, setChatInput] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)

  /* SLA */
  const [slaRemaining, setSlaRemaining] = useState(SLA_MINUTES * 60)

  /* Call Booking */
  const [callBooked, setCallBooked] = useState(false)

  /* ---------------- CHAT PERSISTENCE ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("support_chat")
    if (saved) {
      setChatMessages(JSON.parse(saved))
    } else {
      setChatMessages([
        {
          sender: "support",
          message: "Hello 👋 How can we help you today?",
        },
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("support_chat", JSON.stringify(chatMessages))
  }, [chatMessages])

  /* ---------------- SLA TIMER ---------------- */

  useEffect(() => {
    const timer = setInterval(() => {
      setSlaRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const slaMinutes = Math.floor(slaRemaining / 60)
  const slaSeconds = slaRemaining % 60

  /* ---------------- CHAT SEND ---------------- */

  const sendChatMessage = () => {
    if (!chatInput && !attachment) return

    const userMsg = {
      sender: "user",
      message: chatInput,
      file: attachment?.name,
    }

    const updated = [...chatMessages, userMsg]
    setChatMessages(updated)

    /* 🔌 WebSocket placeholder (agent reply) */
    if (agentOnline) {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "support",
            message: "Thanks! An agent is responding in real time.",
          },
        ])
      }, 1500)
    } else {
      /* 🤖 GPT fallback */
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message:
              GPT_FALLBACK_RESPONSES[
                Math.floor(Math.random() * GPT_FALLBACK_RESPONSES.length)
              ],
          },
        ])
      }, 1000)
    }

    setChatInput("")
    setAttachment(null)
  }

  /* ---------------- CALL BOOKING ---------------- */

  const bookCall = () => {
    setCallBooked(true)
  }

  return (
    <ClientLayout activeTab="/client/help">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">
            Real-time chat, AI assistance, SLA tracking & voice support
          </p>
        </div>

        {/* SLA STATUS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              SLA Status
            </CardTitle>
            <CardDescription>
              Guaranteed first response time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge
              className={
                slaRemaining > 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }
            >
              {slaRemaining > 0
                ? `Responding within ${slaMinutes}m ${slaSeconds}s`
                : "Escalated to Priority Support"}
            </Badge>
          </CardContent>
        </Card>

        {/* LIVE CHAT */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Live Chat
              </div>
              <Badge
                className={
                  agentOnline
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }
              >
                <CircleDot className="mr-1 h-3 w-3" />
                {agentOnline ? "Agent Online" : "Agent Offline"}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
              {chatMessages.map((chat, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    chat.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {chat.sender === "support" && <Headphones className="h-4 w-4" />}
                  {chat.sender === "ai" && <Bot className="h-4 w-4 text-primary" />}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm max-w-xs ${
                      chat.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {chat.message}
                    {chat.file && (
                      <div className="mt-1 text-xs underline">
                        {chat.file}
                      </div>
                    )}
                  </div>
                  {chat.sender === "user" && <User className="h-4 w-4" />}
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <label className="cursor-pointer">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setAttachment(
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                />
              </label>
              <Input
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
              />
              <Button onClick={sendChatMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 📞 VOICE SUPPORT */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              Voice Support / Call Booking
            </CardTitle>
            <CardDescription>
              Schedule a callback from our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            {callBooked ? (
              <Badge className="bg-green-50 text-green-700">
                📞 Call booked successfully. Our agent will contact you.
              </Badge>
            ) : (
              <Button onClick={bookCall}>
                Book a Call
              </Button>
            )}
          </CardContent>
        </Card>

      </div>
    </ClientLayout>
  )
}
