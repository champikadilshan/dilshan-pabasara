import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import { coupleNames, wedding } from '@/config/wedding';
import './globals.css';

const script = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
});

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: `${coupleNames} · ${wedding.dateLabel}`,
  description: `You are invited to celebrate the wedding of ${coupleNames} on ${wedding.dateLabel} at ${wedding.venue.name}, ${wedding.venue.city}.`,
};

export const viewport: Viewport = {
  themeColor: '#fbf6ea',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${script.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>
            {
              '[data-opening]{display:none!important}[data-reveal],[data-hero]{opacity:1!important;transform:none!important;clip-path:none!important}'
            }
          </style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
