import { postRepository } from '@/repositories/post';

export const PostsList = async () => {
  const posts = await postRepository.findAll();
  return posts.map(post => <div key={post.id}>{post.title}</div>);
};
