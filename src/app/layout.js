"use client";
/* eslint-disable new-cap */
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider
          session={session}
          refetchInterval={5 * 60}
          className="h-full"
        >
          <div className="flex w-full">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
