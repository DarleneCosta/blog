import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export default function InputText({ labelText, ...props }: InputTextProps) {
  const inputId = useId();
  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={inputId}>
          {labelText}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={clsx(
          'bg-white outline-0 text-base/tight',
          'ring-2 ring-slate-400 rounded',
          'text-slate-900',
          'p-2 transition focus:ring-blue-600',
          'placeholder:text-slate-400',
          'disabled:bg-slate-100 disabled:text-slate-400 disabled:ring-slate-300',
          'disabled:cursor-not-allowed',
          'disabled:placeholder:text-slate-300',
          'read-only:bg-slate-100 read-only:text-slate-400 read-only:ring-slate-300',
          'read-only:cursor-not-allowed',
          props.className,
        )}
      />
    </div>
  );
}
