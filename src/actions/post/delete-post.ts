'use server';

import { deletePost } from '@/lib/posts/queries/admin';
import { logColor } from '@/utils/log-color';

export async function deletePostAction(id: string) {
  if (!id) {
    return { error: 'Post ID is required' };
  }
  logColor(`deletePostAction ${id}`, Date.now());
  await deletePost(id as string);
  return { success: true };
}
