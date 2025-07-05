import Image from 'next/image';
import { findPostBySlugCached } from '@/lib/posts/queries';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkDown } from '../SafeMarkDown';
import { createImgSrc } from '@/utils/create-img-src';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);
  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={createImgSrc(post.coverImageUrl)}
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
