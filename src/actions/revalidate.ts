'use server';

import { revalidateTag } from 'next/cache';

export function revalidatePost(slug: string) {
  revalidateTag(`post-${slug}`);
  revalidateTag('posts');
}
