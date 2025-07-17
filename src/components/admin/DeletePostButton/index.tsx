'use client';

import { Trash2Icon } from 'lucide-react';
import clsx from 'clsx';
import { deletePostAction } from '@/actions/post/delete-post';
import { useTransition } from 'react';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    if (!confirm(`Apagar post: ${id} ${title}?`)) {
      return;
    }
    startTransition(async () => {
      const result = await deletePostAction(id);
      if (result.success) {
        alert(`Post ${id} apagado com sucesso`);
      } else {
        alert(`Erro ao apagar post ${id}`);
      }
    });
  };

  return (
    <button
      className={clsx(
        'text-red-500 ',
        '[&>svg]:w-4 [&>svg]:h-4',
        'cursor-pointer transition',
        'hover:scale-120 hover:text-red-700',
        'disabled:text-slate-600 disabled:cursor-not-allowed',
      )}
      disabled={isPending}
      aria-label={`Apagar post: ${title}`}
      title={`Apagar post: ${title}`}
      onClick={handleDelete}
    >
      <Trash2Icon />
    </button>
  );
}
