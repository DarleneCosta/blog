'use server';

import { deletePost, findPostByIdAdmin } from '@/lib/posts/queries/admin';
import { logColor } from '@/utils/log-color';

export async function deletePostAction(id: string) {
  if (!id || typeof id !== 'string') {
    return { error: 'Post ID is required' };
  }
  const post = await findPostByIdAdmin(id);
  if (!post) {
    return { error: 'Post not found' };
  }
  logColor(`deletePostAction ${id}`, Date.now());
  await deletePost(id as string);
  return { error: null };
}
