"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbNavigation() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);
    let url = "";

    return paths.map((path, index) => {
      url += `/${path}`;
      const isLast = index === paths.length - 1;
      const title = path.charAt(0).toUpperCase() + path.slice(1);

      return {
        title,
        url,
        isLast,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb className="text-white">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center text-white hover:text-orange-300">
            <Home className="w-4 h-4 mr-2" />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map(({ url, title, isLast }) => (
          <React.Fragment key={url}>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-white/50" />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="cursor-pointer">
              {isLast ? (
                <BreadcrumbPage className="text-white">{title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink className="text-white" href={url}>
                  {title}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
