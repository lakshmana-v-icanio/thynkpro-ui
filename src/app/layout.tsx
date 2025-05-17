import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { SidebarProvider } from "../context/SidebarContext";
import { UserProvider } from "../context/UserContext";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThynkPro UI",
  description: "ThynkPro UI Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <ThemeProvider>
          <UserProvider>
            <SidebarProvider>
              <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            </SidebarProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
