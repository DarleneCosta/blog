import { Suspense } from 'react';
import { Metadata } from 'next';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostFeatured } from '@/components/PostFeatured';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default async function Home() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p>Copyright 2025</p>
      </footer>
    </Container>
  );
}
