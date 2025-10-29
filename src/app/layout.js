import { neobrutalism } from "@clerk/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderPage from "@/components/Header";
import FooterPage from "@/components/Footer";
import SidebarPage from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "No-Name RPG",
  description: "RPG - Text Adventure Game",
  openGraph: {
    title: "No-Name RPG",
    description: "RPG - Text Adventure Game",
    type: "website",
    url: "https://week-12-project-bxiju2g2a-megabass-projects.vercel.app/",
    // images: ["https://next-comments-postgres.vercel.app/og-image.png"], // add an appropriate image to your public folder - need to be in an array
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        theme: [neobrutalism],
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <HeaderPage />
          {children}
          <SidebarPage />
          <FooterPage />
        </body>
      </html>
    </ClerkProvider>
  );
}
