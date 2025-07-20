import Link from 'next/link';

export function Menu() {
  return (
    <nav className='flex flex-col gap-4'>
      <a href='/' target='_blank'>
        Home
      </a>
      <Link href='/admin/posts'>Posts</Link>
    </nav>
  );
}
