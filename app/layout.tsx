import type { Metadata } from 'next';
import { Funnel_Sans, Funnel_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ModalProvider } from '@/lib/ModalContext';

const leagueSpartan = Funnel_Sans({
  variable: '--font-funnel-sans',
  subsets: ['latin'],
});

const geistMono = Funnel_Display({
  variable: '--font-funnel-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adpatp.vercel.app/'),
  title: {
    template: '%s | ADP ATP',
    default: 'ADP ATP',
  },
  description: 'Ranking ADP ATP',
  applicationName: 'ADP ATP',
  authors: [{ name: 'Izky', url: 'https://izky.dev/' }],
  keywords: 'ADP, ATP',
  openGraph: {
    title: 'ADP ATP',
    description: 'Manage your expenses and incomes with Calculizky',
    url: 'www.calculizky.com',
    siteName: 'ADP ATP',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'opengraph-image.png',
        width: 800,
        height: 600,
        alt: 'opengraph-image.alt.txt',
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
    <html lang='en'>
      <ModalProvider>
        <body className={`${leagueSpartan.variable} ${geistMono.variable} antialiased font-sans`}>
          <Header />
          {children}
        </body>
      </ModalProvider>
    </html>
  );
}
