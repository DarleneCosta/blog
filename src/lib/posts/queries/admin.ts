import { PostModelFromApi } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { authenticatedApiRequest } from '@/utils/authenticate-api-request';

export const findPostByIdAdmin = cache(async (id: string) => {
  const post = await postRepository.findById(id);
  if (!post) {
    notFound();
  }
  return post;
});

export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postsResponse;
});

export const findAllPostsAdmin = cache(async () => {
  const posts = await postRepository.findAll();
  return posts;
});

export const findAllPostFromApiAdmin = cache(async () => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi[]>(
    `/post/me/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postsResponse;
});
