import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const findAllPublicPosts = cache(async (): Promise<PostModel[]> => {
  const posts = await postRepository.findAllPublic();
  return posts;
});
