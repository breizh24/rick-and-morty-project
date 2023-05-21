import './globals.css';
import './reset.css';
import { Comic_Neue, Noto_Sans_Mono } from 'next/font/google';
import Providers from './providers';

export const comicNue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const notoSansMono = Noto_Sans_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty characters',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
