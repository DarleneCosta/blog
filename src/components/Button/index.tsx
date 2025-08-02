import clsx from 'clsx';

type ButtonVariant = 'default' | 'ghost' | 'danger';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & React.ComponentProps<'button'>;

export function Button({
  children,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    default: clsx('bg-blue-600 text-white hover:bg-blue-700'),
    ghost: clsx(
      'bg-slate-200 text-slate-900 border border-slate-300',
      'dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700',
      'hover:bg-slate-300 dark:hover:bg-slate-700',
    ),
    danger: clsx('bg-red-600 text-red-100', 'hover:bg-red-700'),
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: clsx(
      'px-2 py-1',
      'text-xs/tight rounded-sm',
      '[&_svg]:w-3 [&_svg]:h-3 gap-1',
    ),
    md: clsx(
      'px-4 py-2',
      'text-base/tight rounded-md',
      '[&_svg]:w-4 [&_svg]:h-4 gap-2',
    ),
    lg: clsx(
      'px-6 py-3',
      'text-lg/tight rounded-lg',
      '[&_svg]:w-5 [&_svg]:h-5 gap-3',
    ),
  };

  const buttonClasses = clsx(
    variantClasses[variant],
    sizeClasses[size],
    'flex items-center justify-center',
    'transition',
    'cursor-pointer',
    'disabled:bg-slate-300 disabled:text-slate-500',
    'disabled:border-slate-400',
    'disabled:cursor-not-allowed',
    props.className,
  );

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
}
