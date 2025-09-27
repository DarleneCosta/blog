'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { PublicPostForApiDto } from '@/lib/posts/schemas';
import { authenticatedApiRequest } from '@/utils/authenticate-api-request';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await getLoginSessionForApi();
  if (!isAuthenticated) {
    return { error: 'Faça login em outra aba antes de deletar o post' };
  }
  if (!id || typeof id !== 'string') {
    return { error: 'Dados inválidos' };
  }
  const postResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/posts/me/${id}`,
    {
      method: 'GET',
    },
  );
  if (!postResponse.success) {
    return { error: 'Post não encontrado' };
  }

  const deletePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/posts/me/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!deletePostResponse.success) {
    return { error: 'Erro ao deletar post' };
  }
  const post = deletePostResponse.data;

  revalidateTag('posts');
  revalidateTag(`posts-${post.slug}`);

  return { error: '' };
}
