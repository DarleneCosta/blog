import { cache } from 'react';
import { PublicPostForApiDto } from '../schemas';
import { PostModelFromApi } from '@/models/post/post-model';
import { apiRequest } from '@/utils/api-request';

export const findAllPuclicPostsFromApiCached = cache(async () => {
  const result = await apiRequest<PublicPostForApiDto[]>(`/posts`, {
    next: {
      revalidate: 86400,
      tags: ['posts'],
    },
  });
  return result;
});

export const findPublicPostBySlugFromApiCached = cache(async (slug: string) => {
  const postsResponse = await apiRequest<PostModelFromApi>(`/posts/${slug}`, {
    next: {
      tags: [`post-${slug}`],
      revalidate: 86400,
    },
  });

  return postsResponse;
});
