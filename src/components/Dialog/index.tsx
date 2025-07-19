import clsx from 'clsx';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
}: DialogProps) {
  if (!isVisible) return null;

  return (
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
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
      >
        <h3 id='dialog-title' className='text-xl font-extrabold'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className='flex items-center justify-around'>
          <button
            type='button'
            className={clsx(
              'bg-slate-300 hover:bg-slate-400 transition text-slate-950 ',
              'flex items-center justify-center',
              'px-4 py-2 rounded-lg cursor-pointer',
            )}
            onClick={onCancel}
            autoFocus
          >
            Cancelar
          </button>
          <button
            type='button'
            className={clsx(
              'bg-blue-500 hover:bg-blue-600 transition text-blue-50',
              'flex items-center justify-center',
              'px-4 py-2 rounded-lg cursor-pointer',
            )}
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
