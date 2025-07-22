'use client';

import clsx from 'clsx';
import { CircleXIcon, FileTextIcon, HouseIcon, MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-md dark:bg-slate-100 dark:text-slate-900',
    'flex flex-col mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    'sm:h-auto',
  );
  const linkClasses = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4',
    'flex items-center justify-start gap-2 rounded-md',
    'transition hover:text-slate-800 dark:hover:text-slate-300',
    'h-10',
    'shrink-0',
  );
  const buttonClasses = clsx(
    linkClasses,
    'text-blue-200 dark:text-blue-900 italic',
    'sm:hidden',
  );

  return (
    <nav className={navClasses}>
      <button onClick={() => setIsOpen(!isOpen)} className={buttonClasses}>
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a href='/' target='_blank' className={linkClasses}>
        <HouseIcon />
        Home
      </a>
      <Link href='/admin/posts' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
    </nav>
  );
}
