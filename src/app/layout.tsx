import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/components/ToastifyContainer';
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
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
