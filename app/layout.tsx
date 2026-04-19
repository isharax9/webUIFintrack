import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata: Metadata = {
  title: "FinTrack",
  description: "FinTrack budget planning app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${plusJakarta.variable} dark`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
