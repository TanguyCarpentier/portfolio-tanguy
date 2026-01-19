import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Amélioration du SEO : On met ton nom et une vraie description
export const metadata: Metadata = {
  title: "Tanguy Carpentier | Portfolio",
  description: "Portfolio étudiant en Informatique (BUT Amiens) - Développement Web & Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. On passe le site en français pour les navigateurs/Google
    <html lang="fr">
      <body
        // 3. Correction : suppressHydrationWarning est sorti des guillemets du className
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}