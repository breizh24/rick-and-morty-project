import './globals.css';
import './reset.css';
import './nprogress.css';
import { Comic_Neue, Noto_Sans_Mono } from 'next/font/google';
import Providers from './providers';
import { NprogressProvider } from '@/utils/NProgressContext';
import { Analytics } from '@vercel/analytics/react';

export const comicNue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-comic-neue',
  display: 'swap',
});

export const notoSansMono = Noto_Sans_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-noto-sans-mono',
  display: 'swap',
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${comicNue.variable} ${notoSansMono.variable}`}>
      <body>
        <NprogressProvider>
          <Providers>{children}</Providers>
        </NprogressProvider>
        <Analytics />
      </body>
    </html>
  );
}
