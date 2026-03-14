import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jesús Villalta | Desarrollador Fullstack",
  description:
    "Desarrollador Fullstack con más de 4 años de experiencia. Especializado en PHP, Python y React.js. Automatización, optimización de sistemas y experiencia de usuario.",
  keywords: ["Fullstack", "Laravel", "React", "Python", "Desarrollador", "Venezuela"],
  openGraph: {
    title: "Jesús Villalta | Desarrollador Fullstack",
    description: "Portafolio profesional — Sistemas web escalables para Europa y América Latina.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
