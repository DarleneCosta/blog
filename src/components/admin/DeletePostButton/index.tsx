'use client';

import { Trash2Icon } from 'lucide-react';
import clsx from 'clsx';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const handleDelete = async () => {
    alert(`Apagar post: ${id} ${title}`);
  };

  return (
    <button
      className={clsx(
        'text-red-500 ',
        '[&>svg]:w-4 [&>svg]:h-4',
        'cursor-pointer transition',
        'hover:scale-120 hover:text-red-700',
      )}
      aria-label={`Apagar post: ${title}`}
      title={`Apagar post: ${title}`}
      onClick={handleDelete}
    >
      <Trash2Icon />
    </button>
  );
}
