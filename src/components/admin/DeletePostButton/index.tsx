'use client';

import { Trash2Icon } from 'lucide-react';
import clsx from 'clsx';
import { deletePostAction } from '@/actions/post/delete-post';
import { useState, useTransition } from 'react';
import Dialog from '@/components/Dialog';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDelete = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deletePostAction(id);
      setIsDialogOpen(false);
      if (result.error) {
        alert(`Erro ao apagar post ${id}: ${result.error}`);
      }
    });
  };

  return (
    <>
      <Dialog
        isVisible={isDialogOpen}
        title='Atenção'
        disabled={isPending}
        content={
          <p>
            Tem certeza que deseja apagar o post <strong>{title}</strong>?
          </p>
        }
        onConfirm={handleConfirm}
        onCancel={() => setIsDialogOpen(false)}
      />
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
    </>
  );
}
