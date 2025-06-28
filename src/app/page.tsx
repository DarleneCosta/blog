import Link from 'next/link';
import Image from 'next/image';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import clsx from 'clsx';

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <Link className='w-full h-full overflow-hidden rounded-lg' href='#'>
          <Image
            src='/images/bryen_0.png'
            alt='Post 1'
            width={1200}
            height={720}
            priority
            className={clsx(
              'w-full h-full object-cover object-center',
              'group-hover:scale-105 transition-all duration-300',
              'sm:h-auto sm:w-auto sm:object-contain',
            )}
          />
        </Link>

        <div className='flex flex-col gap-4 sm:justify-center'>
          <time
            className='text-slate-600 block text-sm/tight'
            dateTime='2025-06-28'
          >
            28 Jun 2025 at 10:00
          </time>
          <h1 className='text-2xl/tight mb-4 font-extrabold sm:text-4xl/tight'>
            <Link href='#'>Read more</Link>
          </h1>
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
