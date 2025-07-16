import { findAllPostsAdmin } from '@/lib/posts/queries/admin';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';

export default async function PostListAdmin() {
  const posts = await findAllPostsAdmin();
  return (
    <div className='mb-16'>
      {posts.map(post => (
        <div
          key={post.id}
          className={clsx(
            'py-2 px-2 flex gap-2 items-center justify-between',
            'bg-amber-200',
            !post.published && 'bg-slate-300 dark:bg-slate-700',
          )}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
          {!post.published && (
            <span className='text-xs text-slate-600 dark:text-slate-400 italic'>
              Não publicado
            </span>
          )}

          <button
            className={clsx(
              'text-red-500 ',
              '[&>svg]:w-4 [&>svg]:h-4',
              'cursor-pointer transition',
              'hover:scale-120 hover:text-red-700',
            )}
            aria-label={`Apagar post: ${post.title}`}
            title={`Apagar post: ${post.title}`}
          >
            <Trash2Icon />
          </button>
        </div>
      ))}
    </div>
  );
}
