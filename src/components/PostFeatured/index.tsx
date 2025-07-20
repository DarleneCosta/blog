import { findAllPublicPostsCached } from '@/lib/posts/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import ErrorMessage from '../ErrorMessage';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  if (posts.length === 0) {
    return (
      <ErrorMessage
        contentTitle='Ops 😢'
        content='Ainda não temos nenhum post!'
      />
    );
  }
  const post = posts[0];
  const postLink = `/post/${post.slug}`;
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        imageProps={{
          src: post.coverImageUrl,
          width: 1200,
          height: 720,
          priority: true,
          alt: post.title,
        }}
        linkProps={{
          href: postLink,
        }}
      />

      <PostSummary
        postHeading='h1'
        postLink={postLink}
        createdAt={post.createdAt}
        title={post.title}
        excerpt={post.excerpt}
      />
    </section>
  );
}
