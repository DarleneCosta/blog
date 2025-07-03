import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Blog - Este é um blog com next.js',
    template: '%s | The Blog',
  },
  description: 'Blog de tecnologia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Container>
          <Header />
          {children}
          <footer>
            <p>Copyright 2025</p>
          </footer>
        </Container>
      </body>
    </html>
  );
}
