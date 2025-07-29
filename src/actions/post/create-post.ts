'use server';

import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';

export async function createPostAction(post: PostModel) {
  const newPost = await postRepository.create(post);
  return newPost;
}
