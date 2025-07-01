import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';

export async function PostFeatured() {
  const slug = 'bryen-0';
  const postLink = `/posts/${slug}`;
  return (
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
          href: postLink,
        }}
      />

      <div className='flex flex-col gap-4 sm:justify-center'>
        <time
          className='text-slate-600 block text-sm/tight'
          dateTime='2025-06-28'
        >
          28 Jun 2025 at 10:00
        </time>
        <PostHeading url={postLink} as='h1'>
          Read more
        </PostHeading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
    </section>
  );
}
