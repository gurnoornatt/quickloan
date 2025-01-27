"use client"

import { useState } from "react"
import { Bot, Send, ThumbsDown, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  role: "assistant" | "user"
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI mortgage advisor. I can help you understand different types of mortgages, requirements, and guidelines. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    }
    
    setMessages(current => [...current, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors',
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Server error:', errorData)
        throw new Error(errorData.detail || 'Failed to get response')
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      }

      setMessages(current => [...current, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to the server. Please check your connection and try again.",
      }
      setMessages(current => [...current, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-zinc-950">
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, i) => (
            <div key={i} className="flex gap-3">
              <Avatar>
                {message.role === "assistant" ? (
                  <>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>U</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div className="grid gap-1">
                <div className="font-medium text-white">
                  {message.role === "assistant" ? "LoanFlash AI" : "You"}
                </div>
                <Card className="p-3 bg-zinc-900 border-zinc-800">
                  <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
                  {message.role === "assistant" && (
                    <div className="flex gap-2 mt-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-white hover:bg-zinc-800">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-white hover:bg-zinc-800">
                        <ThumbsDown className="h-4 w-4" />
                        <span className="sr-only">Dislike</span>
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="text-white">Processing your question...</div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-zinc-800 bg-zinc-950 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              placeholder="Ask about mortgage types, requirements, or guidelines..."
              className="min-h-[60px] text-white placeholder:text-zinc-400 bg-zinc-900 border-zinc-800"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-[60px] bg-zinc-900 hover:bg-zinc-800 text-white"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <p className="text-xs text-center text-zinc-400 mt-2">
            LoanFlash AI provides information based on official mortgage guidelines. Always verify important details with a licensed professional.
          </p>
        </div>
      </div>
    </div>
  )
}

