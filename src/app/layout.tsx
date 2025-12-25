import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import Preloader from '@/components/Preloader'
import ToastProvider from '@/components/ToastProvider'

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-vazirmatn'
})

export const metadata: Metadata = {
  title: {
    default: "بنیاد خیریه آرام دلها",
    template: '%s | بنیاد خیریه آرام دلها'
  },
  description: 'مشارکت در ساختن جامعه‌ای انسان‌تر — شفافیت مالی و مسئولیت‌پذیری در خدمت نیازمندان',
  keywords: [
    'آرام دلها', 'خیریه', 'نیکوکاری', 'پویش', 'گزارشات مالی', 'شفافیت', 'کمک به نیازمندان'
  ],
  authors: [{ name: 'بنیاد خیریه آرام دلها' }],
  creator: 'بنیاد خیریه آرام دلها',
  publisher: 'بنیاد خیریه آرام دلها',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aramdelha.ir'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://aramdelha.ir',
    title: 'بنیاد خیریه آرام دلها',
    description: 'مشارکت در ساختن جامعه‌ای انسان‌تر — شفافیت و مسئولیت‌پذیری',
    siteName: 'بنیاد خیریه آرام دلها',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'بنیاد خیریه آرام دلها - شفافیت مالی',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بنیاد خیریه آرام دلها',
    description: 'مشارکت در ساختن جامعه‌ای انسان‌تر',
    images: ['/twitter-image.png'],
    creator: '@aramdelha',
  },
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
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light" />
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://aramdelha.ir/#organization",
                  "name": "بنیاد خیریه آرام دلها",
                  "alternateName": "آرام دلها",
                  "url": "https://aramdelha.ir",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://aramdelha.ir/logo.png",
                    "width": 600,
                    "height": 600
                  },
                  "description": "بنیادی خیریه با تمرکز بر شفافیت مالی و توانمندسازی جوامع نیازمند",
                  "foundingDate": "1400",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IR"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "پشتیبانی",
                    "email": "info@aramdelha.ir",
                    "availableLanguage": ["fa"]
                  },
                  "sameAs": [
                    "https://instagram.com/aramdelha",
                    "https://twitter.com/aramdelha",
                    "https://linkedin.com/company/aramdelha"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://aramdelha.ir/#website",
                  "url": "https://aramdelha.ir",
                  "name": "بنیاد خیریه آرام دلها",
                  "description": "خیریه‌ای با شفافیت کامل و گزارشات مالی منظم",
                  "publisher": {
                    "@id": "https://aramdelha.ir/#organization"
                  },
                  "inLanguage": "fa-IR"
                },
                {
                  "@type": "WebPage",
                  "@id": "https://aramdelha.ir/#webpage",
                  "url": "https://aramdelha.ir",
                  "name": "صفحه اصلی بنیاد خیریه آرام دلها",
                  "isPartOf": {
                    "@id": "https://aramdelha.ir/#website"
                  },
                  "about": {
                    "@id": "https://aramdelha.ir/#organization"
                  },
                  "description": "صفحه اصلی بنیاد خیریه آرام دلها - پویش‌ها، گزارشات و معرفی بنیان‌گذاران",
                  "inLanguage": "fa-IR"
                }
              ]
            })
          }}
        />
      </head>

      <body className={`${vazirmatn.className} font-vazir bg-stone-50 text-stone-900 min-h-screen`}>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded shadow">
          پرش به محتوای اصلی
        </a>

        <Preloader />
        <ToastProvider>
          <div id="main-content">
            {children}
          </div>
        </ToastProvider>

        {/* Accessibility quick links (hidden visually, available to assistive tech) */}
        <div role="region" aria-label="دسترسی سریع" className="sr-only">
          <ul>
            <li><a href="#header">پرش به هدر</a></li>
            <li><a href="#main">پرش به محتوای اصلی</a></li>
            <li><a href="#footer">پرش به فوتر</a></li>
          </ul>
        </div>
      </body>
    </html>
  )
}
