import { findAllPostsAdmin } from '@/lib/posts/queries/admin';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function PostPage() {
  const posts = await findAllPostsAdmin();
  return (
    <div>
      <h1>Post Admin</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
