import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';

export const findAllPublicPostsCached = unstable_cache(
  cache(async (): Promise<PostModel[]> => {
    const posts = await postRepository.findAllPublic();
    return posts;
  }),
  ['posts'],
  {
    tags: ['posts'],
  },
); //aqui deixei os dois caches mais somente para teste, mas o ideal é usar o cache do next.js

export const findPostBySlugCached = (slug: string) =>
  unstable_cache(
    cache(async (slug: string): Promise<PostModel> => {
      const post = await postRepository
        .findBySlugPublic(slug)
        .catch(() => null);
      if (!post) {
        notFound();
      }
      return post;
    }),
    ['posts'],
    {
      tags: [`post-${slug}`],
    },
  )(slug);
