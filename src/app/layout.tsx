import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from 'sonner';
import { Chakra_Petch } from 'next/font/google';

import { ReduxProvider } from 'src/redux/provider';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: 'normal',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Mahdi Khavari Tasks',
  description: 'developed by Mahdi Khavari',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={chakraPetch.className}>
      <body>
        <Toaster position="bottom-center" closeButton richColors theme="system" />
        <ReduxProvider> {children}</ReduxProvider>
      </body>
    </html>
  );
}
