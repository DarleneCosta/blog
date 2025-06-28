import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';
  
export default async function Home() {
  return (
    <>
      <header>
        <h1>Blog</h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p>Copyright 2025</p>
      </footer>
    </>
  );
}
