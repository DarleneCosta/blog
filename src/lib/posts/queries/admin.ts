import { postRepository } from '@/repositories/post';
import { cache } from 'react';
import { notFound } from 'next/navigation';

export const findPostByIdAdmin = cache(async (id: string) => {
  const post = await postRepository.findById(id);
  if (!post) {
    notFound();
  }
  return post;
});

export const findAllPostsAdmin = cache(async () => {
  const posts = await postRepository.findAll();
  return posts;
});
