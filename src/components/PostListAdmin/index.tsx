import { findAllPostsAdmin } from '@/lib/posts/queries/admin';

export default async function PostListAdmin() {
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
