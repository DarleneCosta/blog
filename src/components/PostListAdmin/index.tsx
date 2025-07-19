import { findAllPostsAdmin } from '@/lib/posts/queries/admin';
import DeletePostButton from '@/components/admin/DeletePostButton';
import clsx from 'clsx';
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

      <div
        className={clsx(
          'fixed inset-0 bg-black/50 z-50 backdrop-blur-xs',
          'flex items-center justify-center',
        )}
      >
        <div
          className={clsx(
            'bg-slate-100 dark:bg-slate-900 p-6 max-w-2xl mx-6 rounded-lg',
            'flex flex-col gap-6',
            'shadow-lg shadow-black/30 dark:shadow-slate-600/30 text-center',
          )}
        >
          <h3 className='text-xl font-extrabold'>Apagar post</h3>
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            Tem certeza que deseja apagar o post?
          </p>
          <div className='flex items-center justify-around'>
            <button
              className={clsx(
                'bg-slate-300 hover:bg-slate-400 transition text-slate-950 ',
                'flex items-center justify-center',
                'px-4 py-2 rounded-lg cursor-pointer',
              )}
              autoFocus
            >
              Cancelar
            </button>
            <button
              className={clsx(
                'bg-blue-500 hover:bg-blue-600 transition text-blue-50',
                'flex items-center justify-center',
                'px-4 py-2 rounded-lg cursor-pointer',
              )}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
