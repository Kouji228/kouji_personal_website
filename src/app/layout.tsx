import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Headermain from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

// Google Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kouji Song',
  description: 'Home Page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header (always shown) */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center', // 垂直置中
            justifyContent: 'flex-end',
            height: '50px', // 與按鈕高度保持一致（假設按鈕高度是50px）
            padding: '0 1rem', // 只保留水平內邊距
          }}
        >
          <Headermain />
        </header>

        {/* Rest of the page(s) */}
        {children}
      </body>
    </html>
  );
}
