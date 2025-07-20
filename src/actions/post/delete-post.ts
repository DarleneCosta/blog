'use server';

import { postRepository } from '@/repositories/post';
import { logColor } from '@/utils/log-color';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  try {
    if (!id || typeof id !== 'string') {
      return { error: 'Post ID is required' };
    }
    const post = await postRepository.findById(id);

    logColor(`deletePostAction ${id}`, Date.now());
    await postRepository.deleteById(id);

    revalidateTag('posts');
    revalidateTag(`posts-${post.slug}`);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }

  return { error: null };
}
