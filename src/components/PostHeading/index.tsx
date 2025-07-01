import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  url,
  as: Tag = 'h1',
}: PostHeadingProps) {
  const headingClasses = {
    h1: 'text-2xl/tight sm:text-4xl font-extrabold',
    h2: 'text-2xl/tight font-bold',
  };

  const commonClasses = '';

  return (
    <Tag
      className={clsx(
        headingClasses[Tag as keyof typeof headingClasses],
        commonClasses,
      )}
    >
      <Link
        href={url}
        className='hover:text-slate-600 transition dark:hover:text-slate-400'
      >
        {children}
      </Link>
    </Tag>
  );
}
