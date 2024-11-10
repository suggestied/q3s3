import type {Metadata} from "next";
import "./globals.css";
import {TopBarComponent} from "@/components/top-bar";
import {BreadcrumbNavigation} from "@/components/breadcrumb";

export const metadata: Metadata = {
    title: "Q3 Dashboard",
    description: "Dashboard for machine monitoring",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`font-sans antialiased pb-5`}
        >
        <TopBarComponent/>
        <div className="relative">
            {/* Show what page the user is on */}
            <div className="container mx-auto px-4 py-4">
                <BreadcrumbNavigation/>
            </div>
            {children}
        </div>
        </body>
        </html>
    );
}
