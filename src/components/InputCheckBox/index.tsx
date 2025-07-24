import clsx from 'clsx';
import { useId } from 'react';

type InputCheckBoxProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

const InputCheckBox = ({ labelText, ...props }: InputCheckBoxProps) => {
  const inputId = useId();
  return (
    <div className='flex items-center gap-3'>
      <input
        {...props}
        className={clsx(
          'w-4 h-4 outline-none rounded-sm',
          'focus:ring-2 focus:ring-blue-600',
          'checked:bg-blue-600',
          props.className,
        )}
        id={inputId}
        type='checkbox'
      />

      {labelText && (
        <label className='text-sm' htmlFor={inputId}>
          {labelText}
        </label>
      )}
    </div>
  );
};

export default InputCheckBox;
