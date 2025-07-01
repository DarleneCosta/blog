import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export default function PostCoverImage({
  imageProps,
  linkProps,
}: PostCoverImageProps) {
  return (
    <Link
      className={clsx(
        'w-full h-full overflow-hidden rounded-lg',
        linkProps.className,
      )}
      {...linkProps}
    >
      <Image
        {...imageProps}
        alt={imageProps.alt}
        className={clsx(
          'w-full h-full object-cover object-center',
          'group-hover:scale-105 transition-all duration-300',
          'sm:h-auto sm:w-auto sm:object-contain',
          imageProps.className,
        )}
      />
    </Link>
  );
}
