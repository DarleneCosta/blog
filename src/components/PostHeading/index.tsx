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
    h1: 'text-2xl/tight sm:text-4xl/tight',
    h2: 'text-xl/tight sm:text-3xl/tight',
  };

  const commonClasses = 'mb-4 font-extrabold';

  return (
    <Tag
      className={clsx(
        headingClasses[Tag as keyof typeof headingClasses],
        commonClasses,
      )}
    >
      <Link href={url}>{children}</Link>
    </Tag>
  );
}
