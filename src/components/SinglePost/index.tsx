import Image from 'next/image';
import { findPublicPostBySlugCached } from '@/lib/posts/queries/public';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkDown } from '../SafeMarkDown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);
  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={700}
        />
        <PostHeading url={`/posts/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate date={post.createdAt} />
        </p>
      </header>
      <p className='text-xl mb-4'>{post.excerpt}</p>
      <SafeMarkDown content={post.content} />
    </article>
  );
}
