import { postRepository } from '@/repositories/post';
import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';
import { formatDateTime } from '@/utils/format-datetime';

export const PostsList = async () => {
  const posts = await postRepository.findAll();
  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
      {posts.map(post => {
        const postLink = `/posts/${post.slug}`;

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
            <div className='flex flex-col gap-4 sm:justify-center'>
              <time
                dateTime={post.createdAt}
                className='text-slate-600 block text-sm/tight'
              >
                {formatDateTime(post.createdAt)}
              </time>
              <PostHeading url={postLink}>{post.title}</PostHeading>
              <p>{post.excerpt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
