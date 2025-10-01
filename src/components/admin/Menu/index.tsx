'use client';

import clsx from 'clsx';
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  UserPenIcon,
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/actions/login/logout-action';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

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
    'transition hover:text-slate-300 dark:hover:text-slate-300',
    'h-10',
    'shrink-0',
  );
  const buttonClasses = clsx(
    linkClasses,
    'text-blue-200 dark:text-blue-900 italic',
    'sm:hidden',
  );

  const handleLogout = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    startTransition(async () => {
      await logoutAction();
    });
  };

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
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link className={linkClasses} href='/admin/user'>
        <UserPenIcon />
        Seus dados
      </Link>
      <Link href='/admin/post/new' className={linkClasses}>
        <PlusIcon />
        Criar Post
      </Link>
      <a href='/admin/logout' className={linkClasses} onClick={handleLogout}>
        {isPending ? (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        ) : (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}
