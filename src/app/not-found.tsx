import clsx from 'clsx';

export default function NotFound() {
  return (
    <div
      className={clsx(
        'min-h-[320px]',
        'bg-slate-900',
        'text-slave-100',
        'mb-16 p-8 rounded-lg',
        'flex flex-col items-center justify-center',
        'text-center',
        'dark:bg-slate-100',
        'dark:text-slate-900',
      )}
    >
      <h1 className='text-7xl/tight mb-4 font-extrabold'>404</h1>
      <p className='text-slate-400 dark:text-slate-700'>
        Erro 404 - A página que você está procurando não existe.
      </p>
    </div>
  );
}
