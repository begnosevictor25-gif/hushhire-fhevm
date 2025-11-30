import type { Metadata } from "next";
import Script from 'next/script';
import { ClientProviders } from '../components/ClientProviders';
import "./globals.css";

export const metadata: Metadata = {
  title: "HushHire - Privacy-First Recruitment Platform",
  description: "Confidential salary matching powered by Fully Homomorphic Encryption (FHE)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Load FHEVM Relayer SDK v0.3.0-5 */}
        <Script
          src="https://cdn.zama.org/relayer-sdk-js/0.3.0-5/relayer-sdk-js.umd.cjs"
          strategy="beforeInteractive"
        />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
