import clsx from 'clsx';

type SpinLoaderProps = {
  className?: string;
};

export const SpinLoader = ({ className = '' }: SpinLoaderProps) => {
  return (
    <div className={clsx('flex', 'items-center', 'justify-center', className)}>
      <div
        className={clsx(
          'w-10',
          'h-10',
          'rounded-full',
          'border-5',
          'border-t-transparent',
          'border-slate-900',
          'animate-spin',
          'dark:border-slate-100',
          'dark:border-t-transparent',
        )}
      ></div>
    </div>
  );
};
