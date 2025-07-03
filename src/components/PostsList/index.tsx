import { findAllPublicPostsCached } from '@/lib/posts/queries';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export const PostsList = async () => {
  const posts = await findAllPublicPostsCached();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div key={post.id} className='flex flex-col gap-4 group'>
            <PostCoverImage
              imageProps={{
                src: post.coverImageUrl,
                alt: post.title,
                width: 1200,
                height: 720,
              }}
              linkProps={{
                href: postLink,
              }}
            />
            <PostSummary
              postHeading='h2'
              postLink={postLink}
              createdAt={post.createdAt}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
};
