import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CareBot: AI health assistant",
  description:
    "CareBot explains common symptoms in plain language and tells you when to see a doctor. Built by Samson Olakeye.",
}

export const viewport: Viewport = {
  themeColor: "#0f766e",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
