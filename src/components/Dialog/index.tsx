'use client';
import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export default function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  const handleCancel = () => {
    if (disabled) return;
    onCancel();
  };
  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black/50 z-50 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 dark:bg-slate-900 p-6 max-w-2xl mx-6 rounded-lg',
          'flex flex-col gap-6',
          'shadow-lg shadow-black/30 dark:shadow-slate-600/30 text-center',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='text-xl font-extrabold'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className='flex items-center justify-around'>
          <Button
            variant='ghost'
            onClick={onCancel}
            autoFocus
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={disabled}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
