import { findAllPostsAdmin } from '@/lib/posts/queries/admin';
import DeletePostButton from '@/components/admin/DeletePostButton';
import clsx from 'clsx';
import Link from 'next/link';
import { ErrorMessage } from '@/components/ErrorMessage';

export default async function PostListAdmin() {
  const posts = await findAllPostsAdmin();
  if (posts.length === 0)
    return (
      <ErrorMessage contentTitle='Ei 🫣' content='Bora criar o primeiro post?' />
    );
  return (
    <div className='mb-16'>
      {posts.map(post => (
        <div
          key={post.id}
          className={clsx(
            'py-2 px-2 flex gap-2 items-center justify-between',
            !post.published && 'bg-slate-300 dark:bg-slate-700',
          )}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
          {!post.published && (
            <span className='text-xs text-slate-600 dark:text-slate-400 italic'>
              Não publicado
            </span>
          )}
          <DeletePostButton id={post.id} title={post.title} />
        </div>
      ))}
    </div>
  );
}
