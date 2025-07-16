import { PostModel } from '@/models/post/post-model';
import { Trash2Icon } from 'lucide-react';
import clsx from 'clsx';

export default function DeletePostButton({ post }: { post: PostModel }) {
  return (
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
  );
}
