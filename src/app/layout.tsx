import type { Metadata } from "next";

import { Lexend } from "next/font/google";

import "./globals.css";

const LexendFont = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clocker",
  description: "Aplicacion de reloj con multiples funciones basadas en la version de Android.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${LexendFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
