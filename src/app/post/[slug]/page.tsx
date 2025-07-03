import { findPostBySlugCached } from '@/lib/posts/queries';
import { notFound } from 'next/navigation';

type PostSlugPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  let post;
  try {
    post = await findPostBySlugCached(params.slug);
  } catch {
    post = null;
  }

  if (!post) {
    notFound();
  }

  return (
    <div>
      <p>{post.content}</p>
    </div>
  );
}
