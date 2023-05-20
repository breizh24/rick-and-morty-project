import './globals.css';
import './reset.css';
import { Comic_Neue } from 'next/font/google';
import Providers from './providers';

const comicNue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty characters',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={comicNue.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
