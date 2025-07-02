import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

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

      <PostSummary
        postHeading='h1'
        postLink={postLink}
        createdAt='2025-06-28T10:00:00'
        title='Read more'
        excerpt='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
      />
    </section>
  );
}
