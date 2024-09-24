"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export function TopBarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { url: "/dashboard", name: "Dashboard" },
    { url: "/machines", name: "Machines" },
    { url: "/matrix", name: "Matrix" },
  ];

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 shadow-lg transition-all duration-300 ease-in-out">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold font-sans transition-transform duration-300 ease-in-out hover:scale-105">
            Q3
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {pages.map((page) => (
              <a
                key={page.url}
                href={page.url}
                className="text-white hover:text-orange-100 transition-all duration-300 ease-in-out text-lg hover:scale-105 transform inline-block"
              >
                {page.name}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-orange-50"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-orange-500">Q3</span>
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-orange-500" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {pages.map((page) => (
                  <a
                    key={page.url}
                    href={page.url}
                    className="text-orange-700 hover:text-orange-500 transition-all duration-300 ease-in-out text-lg hover:translate-x-2 transform inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

        </div>
      </div>
      {/* Orange background extension with gradient */}
      <div className="absolute top-16 left-0 w-full h-96 bg-gradient-to-b from-orange-500 to-orange-300 -z-10"></div>
    </div>
  );
}
