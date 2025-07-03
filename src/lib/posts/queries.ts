import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { cache } from 'react';
import { notFound } from 'next/navigation';

export const findAllPublicPostsCached = cache(
  async (): Promise<PostModel[]> => {
    const posts = await postRepository.findAllPublic();
    return posts;
  },
);

export const findPostBySlugCached = cache(
  async (slug: string): Promise<PostModel> => {
    const post = await postRepository.findBySlug(slug).catch(() => null);
    if (!post) {
      notFound();
    }
    return post;
  },
);
