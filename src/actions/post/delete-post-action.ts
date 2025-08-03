'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  try {
    const isAuthenticated = await verifyLoginSession();
    if (!isAuthenticated) {
      return { error: 'Faça login em outra aba antes de deletar o post' };
    }
    if (!id || typeof id !== 'string') {
      return { error: 'Dados inválidos' };
    }
    const post = await postRepository.findById(id);
    try {
      await postRepository.deleteById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          error: error.message,
        };
      }
      return {
        error: 'Erro ao deletar post',
      };
    }

    revalidateTag('posts');
    revalidateTag(`posts-${post.slug}`);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }

  return { error: null };
}
