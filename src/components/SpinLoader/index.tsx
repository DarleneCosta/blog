import clsx from 'clsx';

type SpinLoaderProps = {
  containerClasses?: string;
};

export const SpinLoader = ({ containerClasses = '' }: SpinLoaderProps) => {
  return (
    <div
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        containerClasses,
      )}
    >
      <div
        className={clsx(
          'w-10',
          'h-10',
          'rounded-full',
          'border-5',
          'border-t-transparent',
          'border-slate-900',
          'animate-spin',
        )}
      ></div>
    </div>
  );
};
