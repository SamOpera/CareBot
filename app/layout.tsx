import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CareBot by HELBRED Initiative: health guidance in plain language",
  description:
    "CareBot, from HELBRED Initiative, explains common symptoms in plain language and tells you when to see a doctor. Part of HELBRED's work for SDG 3, good health and well-being. Developed by Samson Olakeye.",
}

export const viewport: Viewport = {
  themeColor: "#8a4f0a",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
