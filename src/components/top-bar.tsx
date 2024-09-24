// "'use client
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function TopBarComponent() {
  // array of urls and page names
  const pages = [
    {url: "/dashboard", name: "Dashboard"},
    {url: "/machines", name: "Machines"},
    {url: "/matrix", name: "Matrix"},
  ];
  


  
  return (
    <div className="relative">
      <div className="bg-orange-400 text-white p-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Q3</div>
        <div className="text-md flex gap-4">
          {pages.map((page) => (
            <a
              key={page.url}
              href={page.url}
              className={`text-white font-mono hover:text-gray-200`}
            >
              {page.name}
            </a>
          ))}
        </div>
        <Avatar>
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="User avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
      {/* absolute orange h-96 */}
      <div className="absolute top-16 left-0 w-full bg-orange-400 h-64"></div>
    </div>
  );
}