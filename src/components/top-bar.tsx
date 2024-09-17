"'use client'"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopBarComponent() {
  return (
    <div className="relative">
      <div className="bg-orange-400 text-white p-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Q3</div>
        <div className="text-xl">Matrijzen Machines</div>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
      {/* absolute orange h-96 */}
      <div className="absolute top-16 left-0 w-full bg-orange-400 h-96"></div>
      
    </div>
  )
}