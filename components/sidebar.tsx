import { Clock, Home, Settings } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  const recentQueries = [
    "FHA loan requirements in Texas",
    "Conventional loan credit score minimum",
    "How to verify crypto income",
  ]

  return (
    <div className="w-64 border-r border-zinc-800 bg-zinc-950 p-4 hidden md:block">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Recent Queries</h2>
          {recentQueries.map((query) => (
            <Link
              key={query}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {query}
            </Link>
          ))}
        </div>
        <div className="space-y-1">
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Clock className="w-4 h-4" />
            History
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            Guidelines
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}

