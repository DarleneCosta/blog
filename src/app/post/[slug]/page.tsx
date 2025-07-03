import { findPostBySlugCached } from '@/lib/posts/queries';

type PostSlugPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const post = await findPostBySlugCached(params.slug);

  return (
    <div>
      <p>{post.content}</p>
    </div>
  );
}
