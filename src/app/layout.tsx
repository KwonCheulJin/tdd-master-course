import DevNav from '@/components/__dev__/dev-nav';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ToastContainer } from 'react-toastify';
import './globals.css';
import './mock-service';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '프론트엔드 TDD 완전정복',
  description: '프론트엔드 TDD 완전정복 시리즈',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer />
        <DevNav />
      </body>
    </html>
  );
}
