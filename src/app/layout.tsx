import type { Metadata } from "next";
import {  DM_Serif_Display, Lato } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: '400', // DM Serif Display only comes in weight 400
  variable: '--font-dm-serif',
  subsets: ['latin'],
});

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'], // All available weights for Lato
  variable: '--font-lato',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "CRM | Tanja Physical Therapy & Wellness ",
  description: "Your in-Home Therapy Experts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${dmSerif.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
