import { postRepository } from '@/repositories/post';
import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';

export const PostsList = async () => {
  const posts = await postRepository.findAll();
  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {posts.map(post => (
        <div key={post.id} className='flex flex-col gap-4'>
          <PostCoverImage
            imageProps={{
              src: post.coverImageUrl,
              alt: post.title,
              width: 1200,
              height: 720,
            }}
            linkProps={{
              href: `/posts/${post.slug}`,
            }}
          />
          <div className='flex flex-col gap-4 sm:justify-center'>
            <time
              dateTime={post.createdAt}
              className='text-slate-600 block text-sm/tight'
            >
              {post.createdAt}
            </time>
            <PostHeading url={`/posts/${post.slug}`}>{post.title}</PostHeading>
            <p>{post.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
