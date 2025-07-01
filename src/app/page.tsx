import { Suspense } from 'react';
import { Metadata } from 'next';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostHeading } from '@/components/PostHeading';
import { PostCoverImage } from '@/components/PostCoverImage';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <PostCoverImage
          imageProps={{
            src: '/images/bryen_0.png',
            width: 1200,
            height: 720,
            priority: true,
            alt: 'Post 1',
          }}
          linkProps={{
            href: '#',
          }}
        />

        <div className='flex flex-col gap-4 sm:justify-center'>
          <time
            className='text-slate-600 block text-sm/tight'
            dateTime='2025-06-28'
          >
            28 Jun 2025 at 10:00
          </time>
          <PostHeading url='#' as='h1'>
            Read more
          </PostHeading>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p>Copyright 2025</p>
      </footer>
    </Container>
  );
}
