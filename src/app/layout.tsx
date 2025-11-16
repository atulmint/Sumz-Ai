// root file
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import { ORIGIN_URL } from "@/utils/helpers";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SumzAI | ⚡ Generate summaries with AI",
  description:
    "Your AI summary expert. Extract insights from PDFs, summaries, and documents with precision and speed using SumzAI.",
  openGraph: {
    title: "SumzAI | ⚡ Generate summaries with AI",
    description:
      "Your AI summary expert. Extract insights from PDFs, summaries, and documents with precision and speed using SumzAI.",
    url: ORIGIN_URL,
    images: [{ url: "/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SumzAI | ⚡ Generate summaries with AI",
    description:
      "Your AI summary expert. Extract insights from PDFs, summaries, and documents with precision and speed using SumzAI.",
    images: [{ url: "/opengraph-image.png" }],
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#1164FF",
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    canonical: ORIGIN_URL,
  },
  generator: "Next.js",
  applicationName: "SumzAI",
  creator: "https://github.com/Ishank-96",
  keywords: [
    "artificial intelligence",
    "summary",
    "document",
    "file",
    "text",
    "text analysis",
    "information extraction",
    "pdf to summary",
    "pdf",
    "pdf to text",
    "pdf to summary",
    "summarization",
    "content",
  ],
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SumAI",
    startupImage: [
      "/favicon/apple-touch-icon.png",
      "/favicon/apple-touch-icon-120x120.png",
      "/favicon/apple-touch-icon-152x152.png",
      "/favicon/apple-touch-icon-167x167.png",
      "/favicon/apple-touch-icon-180x180.png",
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body
          suppressHydrationWarning
          className={`${fontSans.variable} font-sans antialiased`}
        >
          <div className="relative flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
