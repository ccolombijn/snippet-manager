import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;


const signika = Signika({
  variable: "--font-signika",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Snippet Manager",
  description: "Manage and generate code snippets with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${signika.variable} ${signika.variable} ${signika.variable} ${signika.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
