import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import 'modern-normalize';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import '@blossom-carousel/react/style.css';
import { Toaster } from 'react-hot-toast';

const geistInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistManrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TravelTrucks',
  icons: '/favicon.ico',
  description:
    'Find and rent the perfect camper for your next adventure. Explore a wide selection of modern motorhomes, compare features, and start your journey with TravelTrucks.',
  openGraph: {
    title: 'TravelTrucks',
    description:
      'Discover comfortable campers for unforgettable road trips. Browse, compare, and find the perfect camper for your next adventure.',
    url: process.env.NEXT_PUBLIC_API_URL,
    siteName: 'TravelTrucks',
    images: [
      {
        url: '/images/hero-image@1x.jpeg',
        width: 1200,
        height: 630,
        alt: 'TravelTrucks - Camper Rental',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistInter.variable} ${geistManrope.variable}`}
    >
      <body>
        <TanStackProvider>
          <Header />
          <div className="container">
            <Toaster position="top-center" />
            {children}
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
