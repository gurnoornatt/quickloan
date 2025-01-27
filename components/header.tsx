import { Share } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">LoanFlash</h1>
        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">AI Mortgage Agent</span>
      </div>
      <Button variant="ghost" size="icon">
        <Share className="w-4 h-4" />
        <span className="sr-only">Share</span>
      </Button>
    </header>
  )
}

