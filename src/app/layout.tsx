import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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

// 網站基本資訊
const siteName = 'Kouji Song - Front-End Developer';
const siteDescription =
  '我是宋平浩（Kouji Song），前端工程師，專精 React.js/Next.js 開發。擁有廣告數據分析背景，具備購物車、會員系統與 API 串接經驗，重視使用者體驗與效能優化。';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kouji-song.dev';
const ogImage = `${siteUrl}/picture/achievement_img_1759460471921.webp`; // 使用代表作圖片作為封面

export const metadata: Metadata = {
  // 基本 SEO
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    '前端工程師',
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    '前端開發',
    '網頁設計',
    '響應式設計',
    '宋平浩',
    'Kouji Song',
    'Portfolio',
    'Web Developer',
    'Frontend Developer',
  ],
  authors: [{ name: 'Kouji Song', url: siteUrl }],
  creator: 'Kouji Song',
  publisher: 'Kouji Song',

  // 語言和地區
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'zh-TW': '/zh-TW',
      'en-US': '/en-US',
    },
  },

  // Open Graph (Facebook, LinkedIn 等)
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName: 'Kouji Song Portfolio',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Kouji Song - Front-End Developer Portfolio',
        type: 'image/webp',
      },
    ],
  },

  // Twitter 卡片
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [ogImage],
    creator: '@kouji_song',
    site: '@kouji_song',
  },

  // 其他 meta 標籤
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 驗證標籤
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },

  // 應用程式資訊
  applicationName: 'Kouji Song Portfolio',
  category: 'Portfolio',

  // 其他設定
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // 圖示
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // 應用程式清單
  manifest: '/manifest.json',
};

// Viewport 配置 (Next.js 15+)
export const viewport: Viewport = {
  // 主題色彩
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
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
        {children}
      </body>
    </html>
  );
}
